<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :shop="shop" :menuItems="menuItems" />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto transition-all duration-300">
      <!-- Header -->
      <header class="bg-white border-b sticky top-0 z-10 shadow-sm">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center space-x-4">
            <h1 class="text-2xl font-bold text-gray-800">Ranking Settings</h1>
            <button 
              @click="fetchRankings"
              :disabled="loading"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              {{ loading ? 'Refreshing...' : 'Refresh' }}
            </button>
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/manageShop" class="w-9 h-9 rounded-full overflow-hidden cursor-pointer ring-2 ring-blue-200 hover:ring-blue-400 transition-all">
              <img v-if="shop.logo" :src="shop.logo" alt="Shop Logo" class="w-full h-full object-cover" />
              <img v-else src="/avatar-placeholder.png" alt="Default Logo" class="w-full h-full object-cover" />
            </router-link>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="p-6">
        <div class="container mx-auto max-w-6xl">
          
          <!-- Welcome Card -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex items-center justify-between">
              <div class="flex items-center space-x-4">
                <div class="bg-yellow-100 p-3 rounded-lg">
                  <svg class="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"/>
                  </svg>
                </div>
                <div>
                  <h2 class="text-xl font-semibold text-gray-800">Ranking System Management</h2>
                  <p class="text-gray-600">Configure user ranks and tier requirements</p>
                </div>
              </div>
              <div class="flex items-center space-x-4">
                <button 
                  @click="saveAllRankings"
                  :disabled="loading || saving"
                  class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <svg v-if="saving" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                  <span>{{ saving ? 'Saving...' : 'Save All Changes' }}</span>
                </button>
                <button 
                  @click="showAddForm = true"
                  :disabled="loading || saving"
                  class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 flex items-center space-x-2"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                  </svg>
                  <span>Add New Ranking</span>
                </button>
              </div>
            </div>
          </div>

          <!-- Loading State -->
          <div v-if="loading" class="bg-white rounded-xl shadow-lg p-12 text-center">
            <div class="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p class="text-gray-600">Loading ranking settings...</p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
            <div class="flex items-center space-x-3">
              <svg class="w-6 h-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
              </svg>
              <span class="text-red-700 font-medium">{{ error }}</span>
            </div>
          </div>

          <!-- Add New Ranking Form -->
          <div v-if="showAddForm" class="bg-white rounded-xl shadow-lg p-6 mb-6 border-l-4 border-blue-500">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800">Add New Ranking</h3>
              <button @click="cancelAddRanking" class="text-gray-500 hover:text-gray-700">
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Ranking Name</label>
                <input 
                  v-model="newRanking.name"
                  type="text"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Pro Platinum 3"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Threshold (Referrals)</label>
                <input 
                  v-model.number="newRanking.threshold"
                  type="number"
                  min="1"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Coins Required (Tk)</label>
                <input 
                  v-model.number="newRanking.coins"
                  type="number"
                  min="100"
                  step="100"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 50000"
                />
              </div>
            </div>
            <div class="flex justify-end space-x-3">
              <button 
                @click="cancelAddRanking"
                class="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                @click="addNewRanking"
                class="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Add Ranking
              </button>
            </div>
          </div>

          <!-- Rankings List -->
          <div v-else-if="rankings && rankings.length > 0" class="space-y-6">
            <div 
              v-for="(rank, index) in rankings" 
              :key="rank.id"
              class="bg-white rounded-xl shadow-lg p-6 border-l-4"
              :class="getRankBorderColor(rank.name)"
            >
              <div class="flex items-center justify-between mb-4">
                <div class="flex items-center space-x-4">
                  <!-- Cover Image or Fallback Icon - Clickable for upload -->
                  <div class="relative">
                    <div 
                      @click="triggerImageUpload(rank)"
                      class="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer hover:opacity-75 transition-opacity" 
                      :class="getRankIconBg(rank.name)"
                      :title="'Click to upload cover image'"
                    >
                      <img 
                        v-if="rank.cover_image" 
                        :src="rank.cover_image" 
                        :alt="rank.name + ' rank'"
                        class="w-full h-full object-cover"
                        @error="onImageError"
                      />
                      <div v-else class="w-full h-full flex items-center justify-center">
                        <svg class="w-8 h-8" :class="getRankIconColor(rank.name)" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                        </svg>
                      </div>
                    </div>
                    <!-- Upload indicator -->
                    <div v-if="uploadingRank === rank.name" class="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                      <div class="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full"></div>
                    </div>
                  </div>
                  <div>
                    <h3 class="text-xl font-bold text-gray-800">{{ rank.name }}</h3>
                    <p class="text-gray-600 text-sm">Rank Level {{ rankings.length - index }}</p>
                    <div v-if="uploadingRank === rank.name" class="text-xs text-blue-500">Uploading image...</div>
                  </div>
                </div>
                <button 
                  @click="deleteRank(rank.id || null)"
                  :disabled="deleting[rank.id || 'new']"
                  class="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-50"
                  :title="rank.id ? 'Delete ranking' : 'Remove unsaved ranking'"
                >
                  <svg v-if="deleting[rank.id || 'new']" class="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="m12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Threshold (Referrals)
                  </label>
                  <input 
                    v-model.number="rank.threshold"
                    type="number"
                    min="0"
                    step="1"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter threshold"
                  />
                </div>
                
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Coins Required (Tk)
                  </label>
                  <input 
                    v-model.number="rank.coins"
                    type="number"
                    min="0"
                    step="100"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter coins amount"
                  />
                </div>
              </div>
              
              <div class="mt-4 pt-4 border-t border-gray-200">
                <div class="flex justify-between text-sm text-gray-600">
                  <span>Created: {{ rank.created_at || 'N/A' }}</span>
                  <span>Updated: {{ rank.updated_at || 'N/A' }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Empty State -->
          <div v-else class="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"/>
            </svg>
            <h3 class="text-lg font-medium text-gray-900 mb-2">No Rankings Found</h3>
            <p class="text-gray-600">There are no ranking settings configured yet.</p>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Swal from 'sweetalert2';
import { useMenuItems } from '@/composables/useMenuItems';
import Sidebar from './Sidebar.vue';

// Get centralized menu items
const { menuItems } = useMenuItems();

// Shop data
const shop = ref({ logo: null, name: null });

// Rankings state
const rankings = ref([]);
const loading = ref(false);
const saving = ref(false);
const error = ref(null);
const deleting = ref({});

// New ranking form state
const showAddForm = ref(false);
const newRanking = ref({
  name: '',
  threshold: 0,
  coins: 0
});
const uploadingRank = ref('');

const fileUploadBaseUrl = import.meta.env.VITE_API_BASE_URL_FILE_UPLOAD || 'https://cdn.apexdrive365.com/api';

// Hidden file input for image upload
const fileInput = ref(null);
const currentUploadRank = ref(null);

// Trigger image upload for a specific rank
const triggerImageUpload = (rank) => {
  currentUploadRank.value = rank;
  // Create a hidden file input
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = 'image/*';
  input.onchange = handleRankImageUpload;
  input.click();
};

// Handle image file selection and upload for ranks
const handleRankImageUpload = async (event) => {
  const file = event.target.files && event.target.files[0];
  if (!file || !currentUploadRank.value) return;
  
  const rank = currentUploadRank.value;
  uploadingRank.value = rank.name;
  
  try {
    const formData = new FormData();
    formData.append('files[]', file);
    formData.append('file_type', 'rank_cover_image');
    formData.append('entity_id', rank.name);
    
    const response = await fetch(`${fileUploadBaseUrl}/data`, {
      method: 'POST',
      headers: {
        'X-Company-Token': import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN || '',
        'X-Server-Api-Key': import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY || ''
      },
      body: formData
    });
    
    const data = await response.json();
    if (data.success && data.data?.file_url) {
      rank.cover_image = data.data.file_url;
      showNotification('Image uploaded successfully!', 'success');
    } else {
      throw new Error(data.message || 'Image upload failed');
    }
  } catch (err) {
    showNotification(err.message || 'Image upload failed', 'error');
  } finally {
    uploadingRank.value = '';
    currentUploadRank.value = null;
  }
};

// Base URL from environment or config
const baseUrl = ref(import.meta.env.VITE_API_BASE_URL || 'https://api.apex.com');

// Fetch rankings data
const fetchRankings = async () => {
  loading.value = true;
  error.value = null;
  
  try {
    const token = localStorage.getItem('token'); // Using 'token' like in api.ts
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch(`${baseUrl.value}/v2/admin/rank-settings`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Company-Token': import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN || ''
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch rankings: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success && data.data?.result) {
      // Sort by highest threshold first (Pro Platinum, Platinum, etc.)
      rankings.value = data.data.result.sort((a, b) => b.threshold - a.threshold);
      
      // Store meta information for pagination if needed in future
      if (data.data.meta) {
        console.log('Rankings meta:', data.data.meta);
      }
    } else {
      throw new Error(data.message || 'Failed to load rankings');
    }
  } catch (err) {
    console.error('Error fetching rankings:', err);
    error.value = err.message || 'Failed to load rankings';
  } finally {
    loading.value = false;
  }
};

// Save all rankings
const saveAllRankings = async () => {
  if (!rankings.value.length) return;
  
  saving.value = true;
  error.value = null;
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    // Prepare payload - send complete array with id for existing, without id for new
    const payload = rankings.value.map(rank => ({
      ...(rank.id && { id: rank.id }), // Include id only if it exists (for existing ranks)
      name: rank.name,
      threshold: Number(rank.threshold),
      coins: Number(rank.coins)
    }));

    const response = await fetch(`${baseUrl.value}/v2/admin/rank-settings`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Company-Token': import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN || ''
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to update rankings: ${response.status}`);
    }

    const data = await response.json();
    
    // Show success notification
    showNotification('Rankings updated successfully!', 'success');
    
    // Refresh data to get latest updates
    await fetchRankings();
    
  } catch (err) {
    console.error('Error saving rankings:', err);
    error.value = err.message || 'Failed to save rankings';
    showNotification(error.value, 'error');
  } finally {
    saving.value = false;
  }
};

// Delete a ranking
const deleteRank = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: 'This will permanently delete the ranking.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Yes, delete it!',
    cancelButtonText: 'Cancel'
  });
  if (!result.isConfirmed) return;

  // If no id, it's a newly added ranking that hasn't been saved yet
  if (!id) {
    // Find and remove from local array by name
    const rankToDelete = rankings.value.find(rank => !rank.id);
    if (rankToDelete) {
      rankings.value = rankings.value.filter(rank => rank !== rankToDelete);
      showNotification('Unsaved ranking removed!', 'success');
    }
    return;
  }

  deleting.value[id] = true;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication token not found');
    }

    const response = await fetch(`${baseUrl.value}/v2/admin/rank-settings`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'X-Company-Token': import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN || ''
      },
      body: JSON.stringify({ id: Number(id) })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Failed to delete ranking: ${response.status}`);
    }

    // Show success message
    showNotification('Ranking deleted successfully!', 'success');

    // Remove from local array
    rankings.value = rankings.value.filter(rank => rank.id !== id);

  } catch (err) {
    console.error('Error deleting ranking:', err);
    showNotification(err.message || 'Failed to delete ranking', 'error');
  } finally {
    deleting.value[id] = false;
  }
};

// Add new ranking
const addNewRanking = () => {
  if (!newRanking.value.name.trim() || newRanking.value.threshold <= 0 || newRanking.value.coins <= 0) {
    showNotification('Please fill all fields with valid values', 'error');
    return;
  }

  // Check if name already exists
  if (rankings.value.some(rank => rank.name.toLowerCase() === newRanking.value.name.toLowerCase())) {
    showNotification('Ranking name already exists', 'error');
    return;
  }

  // Add new ranking to the array (without id for new ones)
  rankings.value.push({
    name: newRanking.value.name,
    threshold: Number(newRanking.value.threshold),
    coins: Number(newRanking.value.coins),
    cover_image: null,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  });

  // Reset form
  newRanking.value = { name: '', threshold: 0, coins: 0 };
  showAddForm.value = false;
  
  // Sort the array
  rankings.value.sort((a, b) => b.threshold - a.threshold);
  
  showNotification('New ranking added! Click "Save All Changes" to update the server.', 'success');
};

// Cancel adding new ranking
const cancelAddRanking = () => {
  newRanking.value = { name: '', threshold: 0, coins: 0 };
  showAddForm.value = false;
};

// Handle image load error
const onImageError = (event) => {
  // Hide the image and show fallback icon
  event.target.style.display = 'none';
};

// Helper function to get rank-specific styling
const getRankBorderColor = (name) => {
  const rankName = name.toLowerCase();
  if (rankName.includes('pro platinum')) return 'border-purple-500';
  if (rankName.includes('platinum')) return 'border-indigo-500';
  if (rankName.includes('diamond')) return 'border-cyan-400';
  if (rankName.includes('gold')) return 'border-yellow-400';
  if (rankName.includes('silver')) return 'border-gray-400';
  if (rankName.includes('bronze')) return 'border-orange-400';
  return 'border-blue-400';
};

const getRankIconBg = (name) => {
  const rankName = name.toLowerCase();
  if (rankName.includes('pro platinum')) return 'bg-purple-100';
  if (rankName.includes('platinum')) return 'bg-indigo-100';
  if (rankName.includes('diamond')) return 'bg-cyan-100';
  if (rankName.includes('gold')) return 'bg-yellow-100';
  if (rankName.includes('silver')) return 'bg-gray-100';
  if (rankName.includes('bronze')) return 'bg-orange-100';
  return 'bg-blue-100';
};

const getRankIconColor = (name) => {
  const rankName = name.toLowerCase();
  if (rankName.includes('pro platinum')) return 'text-purple-600';
  if (rankName.includes('platinum')) return 'text-indigo-600';
  if (rankName.includes('diamond')) return 'text-cyan-600';
  if (rankName.includes('gold')) return 'text-yellow-600';
  if (rankName.includes('silver')) return 'text-gray-600';
  if (rankName.includes('bronze')) return 'text-orange-600';
  return 'text-blue-600';
};

// No longer needed: formatDate (show as received from API)

// Notification system (simple implementation)
const showNotification = (message, type = 'info') => {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
    type === 'success' ? 'bg-green-500 text-white' : 
    type === 'error' ? 'bg-red-500 text-white' : 
    'bg-blue-500 text-white'
  }`;
  notification.textContent = message;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
};

// Initialize component
onMounted(async () => {
  // Load shop data from localStorage
  try {
    const savedShop = localStorage.getItem("shopData");
    if (savedShop) {
      shop.value = JSON.parse(savedShop);
    }
  } catch (error) {
    console.error("Error parsing shopData from localStorage:", error);
  }

  // Fetch rankings data
  await fetchRankings();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
