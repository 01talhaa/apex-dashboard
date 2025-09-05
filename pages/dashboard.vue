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
            <h1 class="text-2xl font-bold text-gray-800">Dashboard</h1>
            <div class="flex items-center space-x-2">
              <button 
                @click="revalidateData" 
                :disabled="loading"
                class="flex items-center space-x-2 px-3 py-1 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
          </div>
          <div class="flex items-center space-x-4">
            <!-- Circle for logo image -->
            <div class="flex items-center space-x-4">
              <router-link to="/manageShop" class="w-9 h-9 rounded-full overflow-hidden cursor-pointer ring-2 ring-blue-200 hover:ring-blue-400 transition-all">
                <img v-if="shop.logo" :src="shop.logo" alt="Shop Logo" class="w-full h-full object-cover" />
                <img v-else src="/avatar-placeholder.png" alt="Default Logo" class="w-full h-full object-cover" />
              </router-link>
            </div>
          </div>
        </div>
      </header>

      <!-- Loading State -->
      <div v-if="loading && !dashboardData" class="flex items-center justify-center h-64">
        <div class="flex items-center space-x-3">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          <span class="text-gray-600 font-medium">Loading dashboard data...</span>
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

      <!-- Dashboard Content -->
      <main class="p-6" v-else>
        <div class="container mx-auto space-y-6">
          
          <!-- Data Update Info -->
          <div v-if="dashboardData" class="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
            <div class="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <div class="flex items-center space-x-4">
                <span class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Last Updated: {{ dashboardData.last_updated_at }}</span>
                </span>
                <span class="flex items-center space-x-1">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Next Update: {{ dashboardData.next_update_at }}</span>
                </span>
              </div>
              <div class="flex items-center space-x-1 text-green-600">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                </svg>
                <span class="font-medium">Data Synced</span>
              </div>
            </div>
          </div>
          
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            <!-- Total Customers -->
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-3xl font-bold mb-1">{{ Storestats.Tcustomer.toLocaleString() }}</h3>
                  <p class="text-blue-100 text-sm font-medium">Total Customers</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Total Spinners -->
            <div class="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-3xl font-bold mb-1">{{ Storestats.Tproduct.toLocaleString() }}</h3>
                  <p class="text-green-100 text-sm font-medium">Total Spinners</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Total Ranks -->
            <div class="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-3xl font-bold mb-1">{{ Storestats.Tbrands.toLocaleString() }}</h3>
                  <p class="text-purple-100 text-sm font-medium">Total Ranks</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" clip-rule="evenodd"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Transaction IDs -->
            <div class="bg-gradient-to-br from-orange-500 to-orange-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-3xl font-bold mb-1">{{ Storestats.Torder.toLocaleString() }}</h3>
                  <p class="text-orange-100 text-sm font-medium">Transaction IDs</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
              </div>
            </div>

            <!-- Total Referrals -->
            <div class="bg-gradient-to-br from-indigo-500 to-indigo-600 p-6 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-3xl font-bold mb-1">{{ dashboardData?.total_referrals_count?.toLocaleString() || 0 }}</h3>
                  <p class="text-indigo-100 text-sm font-medium">Total Referrals</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Financial Overview -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <!-- Commission and Withdrawals Summary -->
            <div class="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Financial Summary</h3>
              <div class="space-y-4">
                <div class="flex justify-between items-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <div>
                    <p class="text-sm text-green-700 font-medium">Total Commissions</p>
                    <p class="text-2xl font-bold text-green-800">{{ dashboardData?.total_commissions || 'Tk 0.00' }}</p>
                  </div>
                  <div class="bg-green-100 p-3 rounded-lg">
                    <svg class="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                
                <div class="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p class="text-sm text-blue-700 font-medium">Paid Withdrawals</p>
                  <p class="text-xl font-semibold text-blue-800">{{ dashboardData?.total_paid_withdrawals || 'Tk 0.00' }}</p>
                </div>
                
                <div class="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <p class="text-sm text-yellow-700 font-medium">Unpaid Withdrawals</p>
                  <p class="text-xl font-semibold text-yellow-800">{{ dashboardData?.total_unpaid_withdrawals || 'Tk 0.00' }}</p>
                </div>
              </div>
            </div>

            <!-- Sales Distribution Chart -->
            <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Financial Distribution</h3>
              <div class="relative h-64">
                <canvas ref="chartCanvas" class="max-h-full"></canvas>
              </div>
              
              <div class="mt-6 grid grid-cols-3 gap-4 text-center">
                <div class="p-3 bg-red-50 rounded-lg">
                  <p class="text-sm text-gray-600">Total Commissions</p>
                  <p class="text-lg font-semibold text-red-600">{{ formatCurrency(thisMonthTotal) }}</p>
                </div>
                <div class="p-3 bg-blue-50 rounded-lg">
                  <p class="text-sm text-gray-600">Paid Withdrawals</p>
                  <p class="text-lg font-semibold text-blue-600">{{ formatCurrency(previousMonthTotal) }}</p>
                </div>
                <div class="p-3 bg-yellow-50 rounded-lg">
                  <p class="text-sm text-gray-600">Unpaid Withdrawals</p>
                  <p class="text-lg font-semibold text-yellow-600">{{ formatCurrency(cashOnDelivery) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Categories and Brands Section -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <router-link to="/categories" class="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-blue-200">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Top Categories</h3>
                <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
              <div class="space-y-3">
                <div v-if="categories.length === 0" class="text-gray-500 text-center py-4">
                  No categories data available
                </div>
                <div v-for="category in categories" :key="category.name" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <span class="font-medium text-gray-700">{{ category.name }}</span>
                  <span class="font-semibold text-gray-900">${{ category.value?.toLocaleString() || 0 }}</span>
                </div>
              </div>
            </router-link>

            <router-link to="/brands" class="group bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border hover:border-blue-200">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">Top Brands</h3>
                <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                </svg>
              </div>
              <div class="space-y-3">
                <div v-if="brands.length === 0" class="text-gray-500 text-center py-4">
                  No brands data available
                </div>
                <div v-for="brand in brands" :key="brand.name" class="flex justify-between items-center p-3 bg-gray-50 rounded-lg group-hover:bg-blue-50 transition-colors">
                  <span class="font-medium text-gray-700">{{ brand.name }}</span>
                  <span class="font-semibold text-gray-900">${{ brand.value?.toLocaleString() || 0 }}</span>
                </div>
              </div>
            </router-link>
          </div>

          <!-- Orders Stats -->
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <router-link to="orders-stats" class="group bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer text-white transform hover:scale-105">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="text-3xl font-bold mb-2">{{ Storestats.Torder }}</h3>
                  <p class="text-purple-100 font-medium">Total Orders</p>
                </div>
                <div class="bg-white bg-opacity-20 p-3 rounded-lg">
                  <svg class="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                  </svg>
                </div>
              </div>
              <button class="w-full bg-white bg-opacity-20 text-white py-3 px-4 rounded-lg hover:bg-opacity-30 transition-all font-medium backdrop-blur-sm">
                View All Orders
              </button>
            </router-link>

            <!-- Quick Actions -->
            <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
              <h3 class="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <router-link to="/customers" class="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
                  <div class="bg-blue-500 p-3 rounded-lg mb-2 group-hover:bg-blue-600 transition-colors">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Customers</span>
                </router-link>

                <router-link to="/luckyspin" class="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
                  <div class="bg-green-500 p-3 rounded-lg mb-2 group-hover:bg-green-600 transition-colors">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 2L3 7v11a2 2 0 002 2h10a2 2 0 002-2V7l-7-5zM10 12a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Spinner</span>
                </router-link>

                <router-link to="/leaderboard" class="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
                  <div class="bg-orange-500 p-3 rounded-lg mb-2 group-hover:bg-orange-600 transition-colors">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Leaderboard</span>
                </router-link>

                <router-link to="/user-transactions" class="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
                  <div class="bg-purple-500 p-3 rounded-lg mb-2 group-hover:bg-purple-600 transition-colors">
                    <svg class="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
                    </svg>
                  </div>
                  <span class="text-sm font-medium text-gray-700">Transactions</span>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, nextTick } from "vue";
import { useRouter } from "vue-router";
import Chart from "chart.js/auto";
import Sidebar from './Sidebar.vue';  // Import the Sidebar component
import { useStateStore } from '@/stores/useDataStore';
import { useMenuItems } from '@/composables/useMenuItems';
import api from '@/utils/api';

/*
definePageMeta({
  middleware: 'auth'
})
*/

const router = useRouter();

// Initialize state from the store
const Storestats = useStateStore();

// Get centralized menu items
const { menuItems } = useMenuItems();

// Dashboard data from API
const dashboardData = ref(null);
const loading = ref(true);
const error = ref(null);

// Local data for backwards compatibility
const stats = ref([]);
const categories = ref([]);
const brands = ref([]);

// Initialize reactive variables for sales data
const thisMonthSales = ref(0);
const previousMonthSales = ref(0);
const cashOnDelivery = ref(0);
const cashOnStore = ref(0);
const mobilePayment = ref(0);

// Fetch dashboard data from API
const fetchDashboardData = async (revalidate = false) => {
  try {
    loading.value = true;
    error.value = null;
    
    const response = await api.get('/v2/admin/dashboard', {
      params: { revalidate: revalidate }
    });
    
    if (response.data.success) {
      dashboardData.value = response.data.data;
      
      // Update Storestats with actual API data
      const data = response.data.data;
      
      // Update stats from API response
      Storestats.Tcustomer = data.total_customers_count || 0;
      Storestats.Tproduct = data.total_spinners || 0; // Using spinners as products
      Storestats.Tbrands = data.total_ranks_count || 0; // Using ranks as brands/coupons
      Storestats.Torder = data.total_transaction_ids_count || 0; // Using transaction IDs as orders
      
      // Parse commission amount (remove 'Tk ' and commas)
      const commissionText = data.total_commissions || 'Tk 0.00';
      const commissionAmount = parseFloat(commissionText.replace(/[^\d.]/g, '')) || 0;
      
      // Parse withdrawal amounts
      const paidWithdrawals = parseFloat((data.total_paid_withdrawals || 'Tk 0.00').replace(/[^\d.]/g, '')) || 0;
      const unpaidWithdrawals = parseFloat((data.total_unpaid_withdrawals || 'Tk 0.00').replace(/[^\d.]/g, '')) || 0;
      
      // Update sales data using commission and withdrawal data
      thisMonthSales.value = commissionAmount;
      previousMonthSales.value = paidWithdrawals;
      cashOnDelivery.value = unpaidWithdrawals;
      cashOnStore.value = paidWithdrawals;
      mobilePayment.value = commissionAmount - paidWithdrawals;
      
      // Set empty arrays for categories and brands (not provided in API)
      categories.value = [];
      brands.value = [];
    } else {
      throw new Error(response.data.message || 'Failed to fetch dashboard data');
    }
    
  } catch (err) {
    console.error('Error fetching dashboard data:', err);
    error.value = 'Failed to load dashboard data';
    
    // Fallback to localStorage data
    loadFallbackData();
  } finally {
    loading.value = false;
  }
};

const loadFallbackData = () => {
  try {
    const storedData = localStorage.getItem("salesData");
    if (storedData) {
      const salesData = JSON.parse(storedData);
      const thisMonth = salesData.thisMonth || {};
      const previousMonth = salesData.previousMonth || {};

      thisMonthSales.value = thisMonth.total || 0;
      previousMonthSales.value = previousMonth.total || 0;
      cashOnDelivery.value = thisMonth.cashOnDelivery || 0;
      cashOnStore.value = thisMonth.cashOnStore || 0;
      mobilePayment.value = thisMonth.mobilePayment || 0;
    }
  } catch (error) {
    console.error("Error parsing salesData from localStorage:", error);
  }
};

const loadSalesData = () => {
  try {
    const storedData = localStorage.getItem("salesData");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Error parsing salesData from localStorage:", error);
    return null;
  }
};

// On component mount, fetch API data
onMounted(() => {
  fetchDashboardData();
  
  // Initialize chart after a short delay to ensure canvas is rendered
  nextTick(() => {
    if (chartCanvas.value) {
      updateChart();
    }
  });
});

// Initialize shop as a reactive object
const shop = ref({ logo: null, name: null });
const shopUrl = ref("");

onMounted(() => {
  // Load shop data from localStorage
  try {
    const savedShop = localStorage.getItem("shopData");
    if (savedShop) {
      shop.value = JSON.parse(savedShop); // Populate shop data from localStorage
    }
  } catch (error) {
    console.error("Error parsing shopData from localStorage:", error);
  }
  shopUrl.value = window.location.origin + "/shop"; // Adjust shop page link
});

// Sales Data
const chartCanvas = ref(null);
const thisMonthTotal = computed(() => thisMonthSales.value);
const previousMonthTotal = computed(() => previousMonthSales.value);

// Watch for changes in sales data to update chart
watch([thisMonthSales, previousMonthSales, cashOnDelivery, cashOnStore, mobilePayment], () => {
  if (chartCanvas.value) {
    updateChart();
  }
}, { flush: 'post' });

const updateChart = () => {
  if (!chartCanvas.value) return;
  
  // Clear existing chart
  const existingChart = Chart.getChart(chartCanvas.value);
  if (existingChart) {
    existingChart.destroy();
  }
  
  const chartData = {
    labels: ["Total Commissions", "Paid Withdrawals", "Unpaid Withdrawals"],
    datasets: [
      {
        data: [thisMonthSales.value, previousMonthSales.value, cashOnDelivery.value],
        backgroundColor: ["#10B981", "#3B82F6", "#F59E0B"],
        hoverBackgroundColor: ["#059669", "#2563EB", "#D97706"],
      },
    ],
  };

  new Chart(chartCanvas.value, {
    type: "pie",
    data: chartData,
    options: {
      responsive: true,
      plugins: {
        tooltip: {
          callbacks: {
            label: (tooltipItem) => `Tk ${tooltipItem.raw.toLocaleString()}`,
          },
        },
        legend: {
          position: 'bottom',
          labels: {
            padding: 20,
            usePointStyle: true,
          }
        }
      },
    },
  });
};

// Refresh dashboard data
const refreshData = () => {
  fetchDashboardData(false);
};

// Revalidate dashboard data
const revalidateData = () => {
  fetchDashboardData(true);
};

const formatNumber = (value) => value.toFixed(2);

const formatCurrency = (value) => `Tk ${value.toLocaleString()}`;

// Computed properties for better data presentation
const salesGrowth = computed(() => {
  if (previousMonthSales.value === 0) return 0;
  return ((thisMonthSales.value - previousMonthSales.value) / previousMonthSales.value * 100).toFixed(1);
});

const salesGrowthIsPositive = computed(() => parseFloat(salesGrowth.value) >= 0);
</script>

<style scoped>
/* Scoped Styles for Dashboard component */
.container {
  max-width: 1200px;
}
</style>