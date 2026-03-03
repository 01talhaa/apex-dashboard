<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :shop="shop" :menuItems="menuItems" @logout="handleLogout" />

    <!-- Main Content -->
    <div class="flex-1 overflow-auto transition-all duration-300">
      <!-- Header (Sticky at Top, Outside of Main) -->
      <header class="bg-white border-b sticky top-0 z-10">
        <div class="flex items-center justify-between px-6 py-4">
          <div class="flex items-center space-x-4">
            <!-- Add content if necessary -->
          </div>
          <div class="flex items-center space-x-4">
            <router-link to="/manageShop" class="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
              <img v-if="shop.logo" :src="shop.logo" alt="Shop Logo" class="w-full h-full object-cover" />
              <img v-else src="/avatar-placeholder.png" alt="Default Logo" class="w-full h-full object-cover" />
            </router-link>
          </div>
        </div>
      </header>

      <!-- Dashboard Content -->
      <main class="p-4 mt-0.5">
        <div class="container mx-auto p-6">
          <h1 class="text-3xl font-semibold mb-6">Withdrawal Requests</h1>

          <div class="flex justify-between items-center mb-4">
            <div class="mb-6 flex space-x-4">
              <!-- Empty space for consistency with customer page layout -->
            </div>
            <!-- Refresh Button -->
            <button @click="refreshData"
              class="inline-flex items-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-md shadow transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              :disabled="loading">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" :class="{ 'animate-spin': loading }"
                fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {{ loading ? 'Refreshing...' : 'Refresh Data' }}
            </button>
          </div>

          <!-- Table Section -->
          <div class="overflow-x-auto bg-white rounded-lg shadow-md" v-if="!loading && !error && customers.length > 0">
            <div v-if="loading" class="text-center p-6">
              Loading payment requests...
            </div>

            <!-- Error state -->
            <div v-if="error" class="text-red-500 text-center p-6">
              Error: {{ error }}
            </div>

            <!-- Empty state -->
            <div v-if="!loading && !error && customers.length === 0" class="text-gray-500 text-center p-6">
              No payment requests found.
            </div>

            <template v-else>
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registered Phone</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Withdrawal Number</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="customer in customers" :key="customer.id"
                    class="hover:bg-gray-50 transition-colors duration-150">
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ customer.id }}</td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <div class="flex items-center">
                        <div class="flex-shrink-0 h-10 w-10">
                          <div class="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600">
                            {{ customer.user.name.charAt(0).toUpperCase() }}
                          </div>
                        </div>
                        <div class="ml-4">
                          <div class="text-sm font-medium text-gray-900">{{ customer.user.name }}</div>
                        </div>
                      </div>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.user.phone || 'N/A' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ customer.mobile_number || 'N/A' }}</td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ customer.amount }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ customer.payment_method }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap">
                      <span :class="[
                        customer.status === 'approved'
                          ? 'bg-green-100 text-green-800'
                          : customer.status === 'suspended'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800',
                        'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                      ]">
                        {{ customer.status || 'pending' }}
                      </span>
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formatDate(customer.created_at) }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm">
                      <div class="flex space-x-2">
                        <!-- Approve Button -->
                        <button 
                          v-if="customer.status !== 'approved'"
                          @click="approveWithdrawal(customer)" 
                          :disabled="processingWithdrawals[customer.id]"
                          class="inline-flex items-center px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg v-if="processingWithdrawals[customer.id] === 'approve'" class="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{{ processingWithdrawals[customer.id] === 'approve' ? 'Processing...' : 'Approve' }}</span>
                        </button>
                        
                        <!-- Suspend Button -->
                        <button 
                          v-if="customer.status !== 'suspended'"
                          @click="suspendWithdrawal(customer)" 
                          :disabled="processingWithdrawals[customer.id]"
                          class="inline-flex items-center px-3 py-1.5 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <svg v-if="processingWithdrawals[customer.id] === 'suspend'" class="animate-spin -ml-1 mr-1 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>{{ processingWithdrawals[customer.id] === 'suspend' ? 'Processing...' : 'Suspend' }}</span>
                        </button>
                        

                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </template>

          <!-- Pagination -->
          <div class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4 pb-6 p-10"
            v-if="!loading && !error && customers.length > 0">
            <!-- Pagination Info -->
            <div class="text-sm text-gray-700">
              Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, totalItems) }} of {{ totalItems }} withdrawal requests
            </div>
            
            <!-- Pagination Controls -->
            <nav class="flex items-center space-x-2">
              <button
                @click="previousPage"
                :disabled="currentPage <= 1"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              
              <!-- Page numbers -->
              <template v-for="pageNum in getVisiblePages()" :key="pageNum">
                <button
                  v-if="pageNum !== '...'"
                  @click="changePage(pageNum)"
                  :class="[
                    'px-3 py-2 text-sm font-medium rounded-md',
                    pageNum === currentPage
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                  ]"
                >
                  {{ pageNum }}
                </button>
                <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
              </template>
              
              <button
                @click="nextPage"
                :disabled="currentPage >= lastPage"
                class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
              
              <!-- Items per page selector -->
              <select 
                v-model="itemsPerPage" 
                class="ml-2 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <option :value="10">10 per page</option>
                <option :value="20">20 per page</option>
                <option :value="50">50 per page</option>
              </select>
            </nav>
          </div>
          </div>
        </div>
      </main>
    </div>
  </div>
  
  <!-- Notification Container -->
  <NotificationContainer />
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Sidebar from './Sidebar.vue'; // Import the Sidebar component
import { useNotificationStore } from '@/stores/useNotificationStore';
import { useMenuItems } from '@/composables/useMenuItems';
import NotificationContainer from '@/components/NotificationContainer.vue';

// State
const shop = ref({ logo: null, name: null });
const customers = ref([]);
const loading = ref(false);
const error = ref(null);
const debugInfo = ref(null);

// Notification store
const notificationStore = useNotificationStore();

// Get centralized menu items
const { menuItems } = useMenuItems();

// Notification helper function
const showNotification = (message, type = 'info', options = {}) => {
  notificationStore.addNotification(message, type, options?.duration || 5000, options);
};

// Add these refs in the script setup section after existing refs
const currentPage = ref(1);
const itemsPerPage = ref(10);
const totalItems = ref(0);
const lastPage = ref(0);

// Add processing state for withdrawal actions
const processingWithdrawals = ref({});

// Update the fetchCustomers function to handle refresh
const fetchCustomers = async (page = 1, isRefresh = false) => {
  loading.value = true;
  error.value = null;

  try {
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('Authentication token not found. Please login again.', 'error');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      throw new Error('No authentication token found');
    }

    // Show loading state for refresh
    if (isRefresh) {
      customers.value = [];
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/withdraws?page=${page}&limit=${itemsPerPage.value}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      showNotification('Session expired. Please login again.', 'error');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.success) {
      customers.value = data.data.result;
      currentPage.value = parseInt(data.data.meta.page);
      totalItems.value = parseInt(data.data.meta.total);
      lastPage.value = parseInt(data.data.meta.totalPage);
      
      // Ensure lastPage is calculated correctly if not provided by API
      if (!lastPage.value || lastPage.value === 0) {
        lastPage.value = Math.ceil(totalItems.value / itemsPerPage.value);
      }

      if (isRefresh) {
        showNotification('Data refreshed successfully', 'success');
      }
    }
  } catch (err) {
    error.value = err.message;
    console.error('Error:', err);
    showNotification(err.message || 'Failed to load withdrawal requests', 'error');
    if (isRefresh) {
      showNotification('Failed to refresh data', 'error');
    }
  } finally {
    loading.value = false;
  }
};

// Add a separate refresh function
const refreshData = async () => {
  showNotification('Refreshing data...', 'info');
  return await fetchCustomers(currentPage.value, true);
};

// Get visible page numbers for pagination
const getVisiblePages = () => {
  const totalPages = lastPage.value;
  const currentPageValue = currentPage.value;
  const pages = [];
  
  if (totalPages <= 9) {
    // Show all pages if 9 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    if (currentPageValue > 5) {
      pages.push('...');
    }
    
    // Show more pages around current page
    const start = Math.max(2, currentPageValue - 2);
    const end = Math.min(totalPages - 1, currentPageValue + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (currentPageValue < totalPages - 4) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  }
  
  return pages;
};

// Change page function
const changePage = async (newPage) => {
  if (newPage >= 1 && newPage <= lastPage.value) {
    await fetchCustomers(newPage);
  }
};

// Update the navigation methods
const nextPage = async () => {
  console.log('Current page:', currentPage.value, 'Last page:', lastPage.value);
  if (currentPage.value < lastPage.value) {
    await fetchCustomers(currentPage.value + 1);
  }
};

const previousPage = async () => {
  console.log('Current page:', currentPage.value);
  if (currentPage.value > 1) {
    await fetchCustomers(currentPage.value - 1);
  }
};

// Methods
const formatBalance = (balance) => {
  return parseFloat(balance || 0).toFixed(2);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  
  try {
    // Parse the date string and format it
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    // If parsing fails, return the original string
    return dateString;
  }
};

// Show toast message
const showToastMessage = (message, status) => {
  // Legacy function - replaced by showNotification
  showNotification(message, status);
};

// Approve withdrawal request
const approveWithdrawal = async (customer) => {
  processingWithdrawals.value[customer.id] = 'approve';
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('Authentication token not found. Please login again.', 'error');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v2/admin/withdraws/${customer.id}/approve`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      showNotification('Session expired. Please login again.', 'error');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      // Parse the response to get the error message
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 400 && errorData.message && errorData.message.includes("already")) {
        // Handle cases where withdrawal is already processed
        showNotification(errorData.message, 'warning');
        return; // Exit the function without throwing an error
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Update the customer status in the list
      const customerIndex = customers.value.findIndex(c => c.id === customer.id);
      if (customerIndex !== -1) {
        customers.value[customerIndex].status = 'approved';
      }
      
      showNotification(data.message || 'Withdrawal request approved successfully', 'success');
    } else {
      throw new Error(data.message || 'Failed to approve withdrawal request');
    }
  } catch (err) {
    console.error('Error approving withdrawal:', err);
    showNotification(err.message || 'Failed to approve withdrawal request', 'error');
  } finally {
    delete processingWithdrawals.value[customer.id];
  }
};

// Suspend withdrawal request
const suspendWithdrawal = async (customer) => {
  processingWithdrawals.value[customer.id] = 'suspend';
  
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      showNotification('Authentication token not found. Please login again.', 'error');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      throw new Error('No authentication token found');
    }

    const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/v2/admin/withdraws/${customer.id}/suspend`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    if (response.status === 401) {
      localStorage.removeItem('token');
      showNotification('Session expired. Please login again.', 'error');
      setTimeout(() => {
        window.location.href = '/';
      }, 2000);
      throw new Error('Session expired. Please login again.');
    }

    if (!response.ok) {
      // Parse the response to get the error message
      const errorData = await response.json().catch(() => ({}));
      
      if (response.status === 400 && errorData.message === "Withdraw request is already approved") {
        // Handle the specific case where withdrawal is already approved
        showNotification('Cannot suspend: This withdrawal request has already been approved', 'warning');
        return; // Exit the function without throwing an error
      }
      
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.success) {
      // Update the customer status in the list
      const customerIndex = customers.value.findIndex(c => c.id === customer.id);
      if (customerIndex !== -1) {
        customers.value[customerIndex].status = 'suspended';
      }
      
      showNotification(data.message || 'Withdrawal request suspended successfully', 'success');
    } else {
      throw new Error(data.message || 'Failed to suspend withdrawal request');
    }
  } catch (err) {
    console.error('Error suspending withdrawal:', err);
    showNotification(err.message || 'Failed to suspend withdrawal request', 'error');
  } finally {
    delete processingWithdrawals.value[customer.id];
  }
};

const handleLogout = () => {
  localStorage.removeItem('token');
  window.location.href = '/';
};

// Watch for itemsPerPage changes
watch(itemsPerPage, async (newValue) => {
  // Reset to first page and fetch with new items per page
  await fetchCustomers(1);
});

// Lifecycle
onMounted(async () => {
  // Load shop data
  const savedShop = localStorage.getItem("shopData");
  if (savedShop) {
    shop.value = JSON.parse(savedShop);
  }

  // Fetch customers
  await fetchCustomers();
});
</script>

<style scoped>
.container {
  max-width: 1200px;
}

input[type="text"],
input[type="number"] {
  padding: 0.5rem;
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

button {
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  text-align: left;
  padding: 1rem;
}

th {
  background-color: #f3f4f6;
}

/* Select styling to match customer page */
select {
  appearance: none;
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}

select:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
  border-color: #3b82f6;
}

/* Animation for table rows */
.customer-row {
  animation: fadeIn 0.5s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(8px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Focus styles */
*:focus-visible {
  outline: 2px solid rgb(99, 102, 241);
  outline-offset: 2px;
}
</style>