<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :shop="shop" :menuItems="menuItems" />
    
    <!-- Main Content -->

    <div class="flex-1 overflow-auto">
              <!-- Header -->
      <header class="bg-white border-b sticky top-0 z-10">
        <div class="flex items-center justify-between px-6 py-4">
          <h1 class="text-3xl font-bold text-gray-900">Ads Management</h1>

          <div class="flex items-center space-x-4">
            <router-link to="/manageShop" class="w-9 h-9 rounded-full overflow-hidden cursor-pointer">
              <img v-if="shop.logo" :src="shop.logo" alt="Shop Logo" class="w-full h-full object-cover" />
              <img v-else src="/avatar-placeholder.png" alt="Default Logo" class="w-full h-full object-cover" />
            </router-link>
          </div>
        </div>
      </header>
      <div class="p-6">
        <div class="max-w-6xl mx-auto">
          <!-- Page Header -->
          <div ">
            <div>
              
            </div>
            
            <!-- Notification Settings Button -->
            <!-- <button
              @click="showNotificationSettings = true"
              class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200 transform hover:scale-105 shadow-lg"
              title="Notification Settings"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 12a8 8 0 118 8 8 8 0 01-8-8zm0 0V9a4 4 0 118 0v3"></path>
              </svg>
              <span class="hidden sm:inline">🔔 Settings</span>
            </button> -->
          </div>
          
          <!-- Debug buttons -->
          <!--
          <div class="mb-4 flex gap-2 flex-wrap">
            <button
              @click="testApiConnectivity"
              class="px-3 py-1 text-sm bg-yellow-600 text-white rounded hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            >
              Test API Connectivity
            </button>
            <button
              @click="debugApiConfig"
              class="px-3 py-1 text-sm bg-purple-600 text-white rounded hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              Debug API Config
            </button>
            <button
              @click="testNotifications"
              class="px-3 py-1 text-sm bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              Test Notifications
            </button>
            <button
              @click="showAdvancedNotifications"
              class="px-3 py-1 text-sm bg-pink-600 text-white rounded hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              ✨ Advanced Notifications
            </button>
          </div>
          -->

          <!-- Upload Section -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Upload Files</h2>
            
            <form @submit.prevent="handleFileUpload" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- File Input -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Select Files
                  </label>
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    @change="handleFileSelect"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>

                <!-- File Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    File Type
                    <span class="text-xs text-gray-500 ml-1">(Choose placement or content type)</span>
                  </label>
                  <select
                    v-model="uploadForm.fileType"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select file type</option>
                    <optgroup label="Ad Placements">
                      <option value="banner_top_left">Banner - Top Left</option>
                      <option value="banner_top_right">Banner - Top Right</option>
                      <option value="banner_top_center">Banner - Top Center</option>
                      <option value="banner_bottom_left">Banner - Bottom Left</option>
                      <option value="banner_bottom_right">Banner - Bottom Right</option>
                      <option value="banner_bottom_center">Banner - Bottom Center</option>
                      <option value="banner_center">Banner - Center</option>
                      <option value="banner_sidebar_left">Banner - Sidebar Left</option>
                      <option value="banner_sidebar_right">Banner - Sidebar Right</option>
                      <option value="banner_header">Banner - Header</option>
                      <option value="banner_footer">Banner - Footer</option>
                      <option value="popup_ad">Popup Advertisement</option>
                      <option value="floating_ad">Floating Advertisement</option>
                      <option value="sticky_ad">Sticky Advertisement</option>
                      <option value="interstitial_ad">Interstitial Advertisement</option>
                    </optgroup>
                    <optgroup label="Content Types">
                      <option value="profile">Profile Image</option>
                      <option value="product">Product Image</option>
                      <option value="category">Category Image</option>
                      <option value="brand_logo">Brand Logo</option>
                      <option value="hero_image">Hero Image</option>
                      <option value="gallery">Gallery Image</option>
                      <option value="thumbnail">Thumbnail</option>
                    </optgroup>
                    <optgroup label="Documents">
                      <option value="document">Document</option>
                      <option value="pdf">PDF File</option>
                      <option value="invoice">Invoice</option>
                      <option value="receipt">Receipt</option>
                      <option value="contract">Contract</option>
                    </optgroup>
                    <optgroup label="Media">
                      <option value="video">Video</option>
                      <option value="audio">Audio</option>
                      <option value="animation">Animation</option>
                    </optgroup>
                    <optgroup label="Other">
                      <option value="icon">Icon</option>
                      <option value="other">Other</option>
                    </optgroup>
                  </select>
                  <p class="text-xs text-gray-500 mt-1">
                    Files will be automatically associated with your user account.
                  </p>
                </div>
              </div>

              <!-- Selected Files Preview -->
              <div v-if="selectedFiles.length > 0" class="mt-4">
                <h3 class="text-sm font-medium text-gray-700 mb-2">Selected Files:</h3>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  <div
                    v-for="(file, index) in selectedFiles"
                    :key="index"
                    class="flex items-center justify-between p-2 bg-gray-50 rounded border"
                  >
                    <span class="text-sm text-gray-700 truncate">{{ file.name }}</span>
                    <button
                      type="button"
                      @click="removeFile(index)"
                      class="text-red-500 hover:text-red-700 ml-2"
                    >
                      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Upload Button -->
              <div class="flex justify-end">
                <button
                  type="submit"
                  :disabled="isUploading || selectedFiles.length === 0 || !uploadForm.fileType"
                  class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span v-if="!isUploading">Upload Files</span>
                  <span v-else class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Uploading...
                  </span>
                </button>
              </div>
            </form>
          </div>

          <!-- Files List Section -->
          <div class="bg-white rounded-lg shadow-md">
            <div class="p-6 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900">Uploaded Files</h2>
                <button
                  @click="refreshFiles"
                  :disabled="isLoadingFiles"
                  class="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 disabled:opacity-50 flex items-center space-x-2"
                >
                  <svg v-if="!isLoadingFiles" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                  </svg>
                  <svg v-else class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span v-if="!isLoadingFiles">Refresh</span>
                  <span v-else>Loading...</span>
                </button>
              </div>
            </div>

            <!-- Loading State -->
            <div v-if="isLoadingFiles" class="p-6 text-center">
              <div class="animate-spin inline-block w-6 h-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full"></div>
              <p class="mt-2 text-gray-600">Loading files...</p>
            </div>

            <!-- Files Grid -->
            <div v-else-if="files.length > 0" class="p-6">
              <!-- Debug info for pagination -->
              <!--
              <div class="mb-4 p-3 bg-gray-100 rounded-md text-sm text-gray-600">
                <strong>Debug Info:</strong> 
                Total: {{ pagination.total }}, 
                Pages: {{ pagination.totalPage }}, 
                Current: {{ pagination.page }}, 
                Limit: {{ pagination.limit }}
              </div> 
              -->
              
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="file in files"
                  :key="file.id"
                  class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                      <h3 class="font-medium text-gray-900">Ad ID: {{ file.id }}</h3>
                      <p class="text-sm text-gray-600">Type: {{ getFileTypeName(file.file_type) }}</p>
                      <p class="text-sm text-gray-600">Entity: {{ file.entity_id }}</p>
                    </div>
                    <span :class="['px-2 py-1 text-xs font-medium rounded-full', getCategoryColor(getFileTypeCategory(file.file_type))]">
                      {{ getFileTypeName(file.file_type) }}
                    </span>
                  </div>
                  
                  <!-- File Preview (if image) -->
                  <div v-if="isImageFile(file.file_url)" class="mb-3">
                    <img
                      :src="file.file_url"
                      :alt="`File ${file.id}`"
                      class="w-full h-32 object-cover rounded border"
                      @error="handleImageError"
                    />
                  </div>
                  
                  <!-- Actions -->
                  <div class="flex gap-2">
                    <button
                      @click="downloadFileFromUrl(file.file_url, `file-${file.id}`)"
                      class="flex-1 px-3 py-2 text-sm bg-green-600 text-white rounded hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
                    >
                      Download
                    </button>
                    <button
                      @click="copyUrlToClipboard(file.file_url)"
                      class="flex-1 px-3 py-2 text-sm bg-gray-600 text-white rounded hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
                    >
                      Copy URL
                    </button>
                  </div>
                </div>
              </div>

              <!-- Pagination -->
              <div v-if="pagination.totalPage > 1" class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <!-- Pagination Info -->
                <div class="text-sm text-gray-700">
                  Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of {{ pagination.total }} files
                </div>
                
                <!-- Pagination Controls -->
                <nav class="flex items-center space-x-2">
                  <button
                    @click="changePage(pagination.page - 1)"
                    :disabled="pagination.page <= 1"
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
                        pageNum === pagination.page
                          ? 'bg-blue-600 text-white'
                          : 'text-gray-500 bg-white border border-gray-300 hover:bg-gray-50'
                      ]"
                    >
                      {{ pageNum }}
                    </button>
                    <span v-else class="px-3 py-2 text-sm text-gray-500">...</span>
                  </template>
                  
                  <button
                    @click="changePage(pagination.page + 1)"
                    :disabled="pagination.page >= pagination.totalPage"
                    class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="p-6 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No files</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by uploading your first file.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Sidebar from './Sidebar.vue';
import { useStateStore } from '@/stores/useDataStore';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { uploadFiles, getFiles, downloadFile, createDownloadLink, debugApiConfig } from '@/utils/fileApi';
import type { FileItem, FileUploadForm, FilePagination } from '@/types/file';

/*
definePageMeta({
  middleware: 'auth'
})
*/

const router = useRouter();

// Function to decode JWT token and get user ID
const decodeJWT = (token: string) => {
  try {
    const base64Url = token.split('.')[1]
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
    }).join(''))
    return JSON.parse(jsonPayload)
  } catch (error) {
    console.error('Error decoding JWT:', error)
    return null
  }
}

// Get user ID from localStorage (from decoded JWT token)
const getUserId = () => {
  return localStorage.getItem('user_id') || 'default_user';
};

// Initialize state from the store
const Storestats = useStateStore();
const notificationStore = useNotificationStore();

// File management state
const files = ref<FileItem[]>([]);
const selectedFiles = ref<File[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);
const isUploading = ref<boolean>(false);
const isLoadingFiles = ref<boolean>(false);

// Upload form
const uploadForm = ref<FileUploadForm>({
  fileType: '',
  entityId: '', // This will be automatically set to user ID
});

// Pagination
const pagination = ref<FilePagination>({
  page: 1,
  limit: 10,
  total: 0,
  totalPage: 0,
});

// File selection handler
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const newFiles = Array.from(target.files);
    selectedFiles.value = [...selectedFiles.value, ...newFiles];
  }
};

// Remove file from selection
const removeFile = (index: number) => {
  selectedFiles.value.splice(index, 1);
};

// Handle file upload
const handleFileUpload = async () => {
  if (selectedFiles.value.length === 0 || !uploadForm.value.fileType) {
    showNotification('Please select files and file type', 'warning');
    return;
  }

  // Get user ID from localStorage and use it as entity ID
  const userId = getUserId();
  console.log('Using user ID as entity ID:', userId);

  // Validate file sizes (max 10MB per file)
  const maxSize = 10 * 1024 * 1024; // 10MB
  const oversizedFiles = selectedFiles.value.filter(file => file.size > maxSize);
  if (oversizedFiles.length > 0) {
    showNotification(`Some files are too large. Maximum size is 10MB. Oversized files: ${oversizedFiles.map(f => f.name).join(', ')}`, 'error');
    return;
  }

  isUploading.value = true;
  showNotification(`Starting upload of ${selectedFiles.value.length} file(s)...`, 'info');
  
  try {
    const result = await uploadFiles(
      selectedFiles.value,
      uploadForm.value.fileType,
      userId // Use user ID as entity ID
    );
    
    // Success notification with more details
    showNotification(
      `Successfully uploaded ${selectedFiles.value.length} file(s)! Files are now available in your library.`, 
      'success',
      { duration: 5000 }
    );
    
    // Reset form
    selectedFiles.value = [];
    uploadForm.value.fileType = '';
    if (fileInput.value) {
      fileInput.value.value = '';
    }
    
    // Reload files list
    await loadFiles();
    
  } catch (error: any) {
    console.error('Upload error:', error);
    
    // More specific error handling
    let errorMessage = 'Upload failed. Please try again.';
    
    if (error.message.includes('Network Error') || error.message.includes('network error')) {
      errorMessage = 'Network error. Please check your internet connection and try again.';
    } else if (error.message.includes('Authentication') || error.message.includes('401')) {
      errorMessage = 'Authentication failed. Please check your API credentials.';
    } else if (error.message.includes('413') || error.message.includes('too large')) {
      errorMessage = 'File size too large. Please choose smaller files (max 10MB each).';
    } else if (error.message.includes('415') || error.message.includes('Unsupported')) {
      errorMessage = 'Unsupported file type. Please choose a different file format.';
    } else if (error.message.includes('CORS')) {
      errorMessage = 'Cross-origin request blocked. Please contact support.';
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    showNotification(errorMessage, 'error', { duration: 8000 });
  } finally {
    isUploading.value = false;
  }
};

// Load files from API
const loadFiles = async (page: number = 1) => {
  isLoadingFiles.value = true;
  
  try {
    console.log('Loading files for page:', page);
    const response = await getFiles(page, pagination.value.limit);
    console.log('API Response:', response);
    
    files.value = response.result || [];
    pagination.value = {
      page: response.meta.page || page,
      limit: response.meta.limit || pagination.value.limit,
      total: response.meta.total || 0,
      totalPage: response.meta.totalPage || 0,
    };
    
    console.log('Updated pagination:', pagination.value);
  } catch (error: any) {
    console.error('Load files error:', error);
    showNotification(error.message || 'Failed to load files. Please try again.', 'error');
    // Set empty state on error
    files.value = [];
    pagination.value = {
      page: 1,
      limit: 10,
      total: 0,
      totalPage: 0,
    };
  } finally {
    isLoadingFiles.value = false;
  }
};

// Refresh files (same as loadFiles but resets to page 1)
const refreshFiles = async () => {
  pagination.value.page = 1;
  await loadFiles(1);
};

// Change page
const changePage = async (newPage: number) => {
  if (newPage >= 1 && newPage <= pagination.value.totalPage) {
    console.log('Changing to page:', newPage);
    pagination.value.page = newPage;
    await loadFiles(newPage);
  }
};

// Get visible page numbers for pagination
const getVisiblePages = () => {
  const totalPages = pagination.value.totalPage;
  const currentPage = pagination.value.page;
  const pages: (number | string)[] = [];
  
  if (totalPages <= 7) {
    // Show all pages if 7 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    if (currentPage > 4) {
      pages.push('...');
    }
    
    // Show pages around current page
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 3) {
      pages.push('...');
    }
    
    // Always show last page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
  }
  
  return pages;
};

// Download file
const downloadFileFromUrl = async (fileUrl: string, filename: string) => {
  try {
    const blob = await downloadFile(fileUrl);
    createDownloadLink(blob, filename);
    showNotification('File downloaded successfully!', 'success');
  } catch (error: any) {
    console.error('Download error:', error);
    showNotification(error.message || 'Download failed. Please try again.', 'error');
  }
};

// Copy URL to clipboard
const copyUrlToClipboard = async (url: string) => {
  try {
    await navigator.clipboard.writeText(url);
    showNotification('URL copied to clipboard!', 'success');
  } catch (error: any) {
    console.error('Copy error:', error);
    // Fallback for browsers that don't support clipboard API
    try {
      const textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showNotification('URL copied to clipboard!', 'success');
    } catch (fallbackError) {
      showNotification('Failed to copy URL. Please copy manually.', 'error');
    }
  }
};

// Notification function using the store with improved UX
const showNotification = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'info', options?: any) => {
  // Use the improved notification methods
  switch (type) {
    case 'success':
      notificationStore.success(message, options?.duration, { playSound: true, ...options })
      break
    case 'error':
      notificationStore.error(message, options?.duration, { playSound: true, ...options })
      break
    case 'warning':
      notificationStore.warning(message, options?.duration, { playSound: true, ...options })
      break
    case 'info':
      notificationStore.info(message, options?.duration, options)
      break
    default:
      notificationStore.addNotification(message, type, options?.duration || 4000, options)
  }
};

// Test API connectivity
const testApiConnectivity = async () => {
  showNotification('Testing API connectivity...', 'info');
  try {
    // Try to fetch files to test connectivity
    await loadFiles();
    showNotification('API connectivity test successful!', 'success');
  } catch (error: any) {
    showNotification(`API connectivity test failed: ${error.message}`, 'error');
  }
};

// Test notifications
const testNotifications = () => {
  showNotification('This is a success notification!', 'success');
  setTimeout(() => {
    showNotification('This is an info notification!', 'info');
  }, 500);
  setTimeout(() => {
    showNotification('This is a warning notification!', 'warning');
  }, 1000);
  setTimeout(() => {
    showNotification('This is an error notification!', 'error');
  }, 1500);
};

// Test upload function for debugging
const testUpload = async () => {
  // Create a small test file
  const testContent = 'This is a test file content';
  const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
  
  const userId = getUserId();
  console.log('Testing upload with user ID:', userId, 'file:', testFile);
  
  try {
    const result = await uploadFiles([testFile], 'document', userId);
    console.log('Test upload result:', result);
    showNotification('Test upload successful!', 'success');
  } catch (error: any) {
    console.error('Test upload failed:', error);
    showNotification(`Test upload failed: ${error.message}`, 'error');
  }
};

// Make it available globally for console testing
if (typeof window !== 'undefined') {
  (window as any).testUpload = testUpload;
  (window as any).debugApiConfig = debugApiConfig;
}

// Check if file is an image
const isImageFile = (url: string) => {
  if (!url) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  return imageExtensions.some(ext => url.toLowerCase().includes(ext));
};

// Get human-readable file type name
const getFileTypeName = (fileType: string) => {
  const fileTypeMap: { [key: string]: string } = {
    'banner_top_left': 'Banner - Top Left',
    'banner_top_right': 'Banner - Top Right',
    'banner_top_center': 'Banner - Top Center',
    'banner_bottom_left': 'Banner - Bottom Left',
    'banner_bottom_right': 'Banner - Bottom Right',
    'banner_bottom_center': 'Banner - Bottom Center',
    'banner_center': 'Banner - Center',
    'banner_sidebar_left': 'Banner - Sidebar Left',
    'banner_sidebar_right': 'Banner - Sidebar Right',
    'banner_header': 'Banner - Header',
    'banner_footer': 'Banner - Footer',
    'popup_ad': 'Popup Advertisement',
    'floating_ad': 'Floating Advertisement',
    'sticky_ad': 'Sticky Advertisement',
    'interstitial_ad': 'Interstitial Advertisement',
    'profile': 'Profile Image',
    'product': 'Product Image',
    'category': 'Category Image',
    'brand_logo': 'Brand Logo',
    'hero_image': 'Hero Image',
    'gallery': 'Gallery Image',
    'thumbnail': 'Thumbnail',
    'document': 'Document',
    'pdf': 'PDF File',
    'invoice': 'Invoice',
    'receipt': 'Receipt',
    'contract': 'Contract',
    'video': 'Video',
    'audio': 'Audio',
    'animation': 'Animation',
    'icon': 'Icon',
    'other': 'Other',
    'bannar1_ad': 'Banner Ad (Legacy)', // Keep compatibility with existing data
  };
  return fileTypeMap[fileType] || fileType;
};

// Get file type category for color coding
const getFileTypeCategory = (fileType: string) => {
  if (fileType.startsWith('banner_') || fileType.includes('_ad')) return 'ad';
  if (['profile', 'product', 'category', 'brand_logo', 'hero_image', 'gallery', 'thumbnail'].includes(fileType)) return 'image';
  if (['document', 'pdf', 'invoice', 'receipt', 'contract'].includes(fileType)) return 'document';
  if (['video', 'audio', 'animation'].includes(fileType)) return 'media';
  return 'other';
};

// Get category color
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ad': return 'bg-red-100 text-red-800';
    case 'image': return 'bg-blue-100 text-blue-800';
    case 'document': return 'bg-green-100 text-green-800';
    case 'media': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Handle image error
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
};

// Menu items definition
const menuItems = [
  { name: "Customers", path: "/customers", icon: "Users" },
  { name: "Lucky Spin", path: "/luckyspin", icon: "Award" },
  { name: "Leaderboard", path: "/leaderboard", icon: "Trophy" },
  { name: "Withdraw", path: "/withdraw", icon: "CreditCard" },
  { 
    name: "Transactions", 
    icon: "DollarSign",
    subMenu: [
      { name: "Transaction ID", path: "/transaction-id", icon: "CreditCard" },
      { name: "User Transactions", path: "/user-transactions", icon: "FileText" }
    ]
  },
  { name: "Ads", path: "/ads", icon: "CreditCard" },
];

// Initialize shop as a reactive object
const shop = ref({ logo: null, name: null });
const shopUrl = ref("");

// Load initial data
onMounted(async () => {
  // Debug API configuration
  debugApiConfig();
  
  // Ensure user ID is available from token
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken && decodedToken.sub) {
        localStorage.setItem('user_id', decodedToken.sub);
        console.log('User ID extracted and stored:', decodedToken.sub);
      }
    }
  }
  
  // Load shop data from localStorage
  try {
    const savedShop = localStorage.getItem("shopData");
    if (savedShop) {
      shop.value = JSON.parse(savedShop);
    }
  } catch (error) {
    console.error("Error parsing shopData from localStorage:", error);
  }
  shopUrl.value = window.location.origin + "/shop";
  
  // Load files
  await loadFiles();
});
</script>

<style scoped>
/* Scoped Styles for Dashboard component */
.container {
  max-width: 1200px;
}
</style>