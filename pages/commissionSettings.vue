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
            <h1 class="text-2xl font-bold text-gray-800">Commission Settings</h1>
            <button 
              @click="fetchCommissions" 
              :disabled="loading"
              class="flex items-center space-x-2 px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <svg 
                class="w-4 h-4" 
                :class="{ 'animate-spin': loading }"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span>{{ loading ? 'Refreshing...' : 'Refresh' }}</span>
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

      <!-- Loading State -->
      <div v-if="loading && !commissions.length" class="flex items-center justify-center h-64">
        <div class="flex items-center space-x-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span class="text-gray-600 font-medium">Loading commission data...</span>
        </div>
      </div>

      <!-- Error State -->
      <div v-else-if="error" class="m-6 p-4 bg-red-50 border border-red-200 rounded-lg">
        <div class="flex items-center space-x-2">
          <svg class="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-red-700 font-medium">{{ error }}</span>
        </div>
      </div>

      <!-- Main Content -->
      <main class="p-6" v-else>
        <div class="container mx-auto max-w-6xl">
          
          <!-- Welcome Card -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex items-center space-x-4 mb-4">
              <div class="bg-green-100 p-3 rounded-lg">
                <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
              </div>
              <div>
                <h2 class="text-xl font-semibold text-gray-800">Commission Management</h2>
                <p class="text-gray-600">Configure commission rates and settings for your platform</p>
              </div>
            </div>
          </div>

          <!-- Commission Types -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            <!-- Commission Settings Cards -->
            <div v-for="commission in commissions" :key="commission.id" class="bg-white rounded-xl shadow-lg p-6">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800 capitalize flex items-center">
                  <svg v-if="commission.type === 'signup'" class="w-5 h-5 text-blue-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"/>
                  </svg>
                  <svg v-else class="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"/>
                  </svg>
                  {{ commission.type }} Commission
                </h3>
                <button 
                  @click="editCommission(commission)"
                  class="text-blue-500 hover:text-blue-700 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                  </svg>
                </button>
              </div>
              
              <div class="space-y-3">
                <div v-for="level in commission.levels" :key="level.level" 
                     class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <span class="font-medium text-gray-700">Level {{ level.level }}</span>
                  <span class="text-green-600 font-semibold">BDT {{ level.value }}</span>
                </div>
              </div>
              
              <div class="mt-4 text-xs text-gray-500">
                Last updated: {{ formatDate(commission.updated_at) }}
              </div>
            </div>
          </div>

          <!-- Commission History -->
          <div class="bg-white rounded-xl shadow-lg p-6 mb-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-semibold text-gray-800 flex items-center">
                <svg class="w-5 h-5 text-purple-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.414L11 9.586V6z" clip-rule="evenodd"/>
                </svg>
                Commission History
              </h3>
              <button 
                @click="fetchHistory" 
                :disabled="historyLoading"
                class="text-sm bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded-lg transition-colors"
              >
                {{ historyLoading ? 'Loading...' : 'Refresh History' }}
              </button>
            </div>
            
            <div v-if="historyLoading" class="text-center py-4">
              <div class="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-500 mx-auto"></div>
            </div>
            
            <div v-else-if="!history.length" class="text-center py-8 text-gray-500">
              <svg class="w-12 h-12 mx-auto mb-2 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
              </svg>
              <p>No commission history found</p>
            </div>
            
            <div v-else class="space-y-4">
              <div v-for="item in history" :key="item.id" 
                   class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-start justify-between mb-3">
                  <div>
                    <p class="font-medium text-gray-800">{{ item.changed_by.name }}</p>
                    <p class="text-sm text-gray-500">{{ item.changed_by.phone }}</p>
                  </div>
                  <span class="text-xs text-gray-500">{{ item.commission_setting.type }} commission</span>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-2">Previous Values</h4>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="(value, index) in item.old_levels" :key="index" 
                            class="px-2 py-1 bg-red-100 text-red-700 text-xs rounded">
                        L{{ index + 1 }}: BDT {{ value }}
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <h4 class="text-sm font-medium text-gray-700 mb-2">New Values</h4>
                    <div class="flex flex-wrap gap-1">
                      <span v-for="(value, index) in item.new_levels" :key="index" 
                            class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        L{{ index + 1 }}: BDT {{ value }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>

    <!-- Edit Commission Modal -->
    <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div class="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-6 py-4 rounded-t-lg">
          <h3 class="text-lg font-semibold">Edit {{ editingCommission?.type }} Commission</h3>
        </div>
        
        <div class="p-6">
          <div class="space-y-4">
            <div v-for="(level, index) in editingLevels" :key="index" class="flex items-center space-x-3">
              <label class="w-16 text-sm font-medium text-gray-700">Level {{ index + 1 }}:</label>
              <div class="flex items-center space-x-2 flex-1">
                <span class="text-gray-500">BDT</span>
                <input 
                  v-model.number="editingLevels[index]"
                  type="number" 
                  step="0.01"
                  min="0"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="0.00"
                >
              </div>
            </div>
          </div>
          
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              @click="closeEditModal"
              class="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="updateCommission"
              :disabled="updating"
              class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg disabled:opacity-50 transition-colors"
            >
              {{ updating ? 'Updating...' : 'Update' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useMenuItems } from '@/composables/useMenuItems';
import api from '@/utils/api';
import Sidebar from './Sidebar.vue';

// Get centralized menu items
const { menuItems } = useMenuItems();

// Shop data
const shop = ref({ logo: null, name: null });

// Commission data
const commissions = ref([]);
const history = ref([]);
const loading = ref(true);
const historyLoading = ref(false);
const error = ref(null);

// Edit modal state
const showEditModal = ref(false);
const editingCommission = ref(null);
const editingLevels = ref([]);
const updating = ref(false);

// Fetch commissions from API
const fetchCommissions = async () => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await api.get('/v2/admin/commissions');
    
    if (response.data.success) {
      commissions.value = response.data.data.result || [];
    } else {
      throw new Error(response.data.message || 'Failed to fetch commissions');
    }
  } catch (err) {
    console.error('Error fetching commissions:', err);
    error.value = 'Failed to load commission data. Please try again.';
  } finally {
    loading.value = false;
  }
};

// Fetch commission history
const fetchHistory = async () => {
  try {
    historyLoading.value = true;
    
    const response = await api.get('/v2/admin/commissions-history');
    
    if (response.data.success) {
      history.value = response.data.data.result || [];
    } else {
      throw new Error(response.data.message || 'Failed to fetch history');
    }
  } catch (err) {
    console.error('Error fetching commission history:', err);
    // Don't show error for history, just log it
  } finally {
    historyLoading.value = false;
  }
};

// Open edit modal
const editCommission = (commission) => {
  editingCommission.value = commission;
  // Convert levels array to simple array of values
  editingLevels.value = commission.levels.map(level => level.value);
  showEditModal.value = true;
};

// Close edit modal
const closeEditModal = () => {
  showEditModal.value = false;
  editingCommission.value = null;
  editingLevels.value = [];
};

// Update commission
const updateCommission = async () => {
  try {
    updating.value = true;
    
    // Convert array to levels object format
    const levelsObject = {};
    editingLevels.value.forEach((value, index) => {
      levelsObject[index + 1] = value;
    });
    
    const response = await api.put(`/v2/admin/commissions/${editingCommission.value.type}`, {
      levels: levelsObject
    });
    
    if (response.data.success) {
      // Update local data
      const updatedCommission = response.data.data;
      const index = commissions.value.findIndex(c => c.id === updatedCommission.id);
      if (index !== -1) {
        // Convert levels object back to array format for display
        const levelsArray = Object.entries(updatedCommission.levels).map(([level, value]) => ({
          level: parseInt(level),
          value: value
        }));
        
        commissions.value[index] = {
          ...updatedCommission,
          levels: levelsArray
        };
      }
      
      // Refresh history to show the change
      fetchHistory();
      
      closeEditModal();
      
      // Show success message (you can add a notification system here)
      console.log('Commission updated successfully');
    } else {
      throw new Error(response.data.message || 'Failed to update commission');
    }
  } catch (err) {
    console.error('Error updating commission:', err);
    error.value = 'Failed to update commission. Please try again.';
  } finally {
    updating.value = false;
  }
};

// Format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

onMounted(() => {
  // Load shop data from localStorage
  try {
    const savedShop = localStorage.getItem("shopData");
    if (savedShop) {
      shop.value = JSON.parse(savedShop);
    }
  } catch (error) {
    console.error("Error parsing shopData from localStorage:", error);
  }
  
  // Fetch commission data
  fetchCommissions();
  fetchHistory();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}
</style>
