<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar -->
    <Sidebar :shop="shop" :menuItems="menuItems" />

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
        <div class="min-h-screen bg-white p-6">
          <div class="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 border border-gray-200">
            <h2 class="text-3xl font-semibold text-blue-500 text-center mb-6">🛍 Manage Shop</h2>

            <!-- Success Message -->
            <p v-if="message" class="text-green-700 font-medium text-center bg-green-100 p-2 rounded mb-4">
              {{ message }}
            </p>

            <div class="grid grid-cols-1 gap-4">
              <!-- Business ID (Read-only) -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Business ID</label>
                <input v-model="shop.businessId" type="text" class="w-full border-gray-300 p-2 rounded bg-gray-100"
                  readonly />
              </div>

              <!-- Business Name -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Business Name</label>
                <input v-model="shop.name" type="text"
                  class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900" />
              </div>

              <!-- Business Type -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Business Type</label>
                <input v-model="shop.type" type="text"
                  class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900" />
              </div>

              <!-- Shop Email -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Shop Email</label>
                <input v-model="shop.email" type="email"
                  class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900" />
              </div>

              <!-- Phone Number -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Shop Phone Number</label>
                <input v-model="shop.phone" type="text"
                  class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900" />
              </div>

              <!-- Country -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Country</label>
                <input v-model="shop.country" type="text"
                  class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900" />
              </div>

              <!-- Address -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Shop Address</label>
                <input v-model="shop.address" type="text"
                  class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900" />
              </div>

              <!-- Topbar Announcement -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Topbar Announcement</label>
                <textarea v-model="shop.announcement"
                  class="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 bg-gray-100 text-gray-900"></textarea>
              </div>

              <!-- Logo Upload -->
              <div>
                <label class="block text-sm font-medium text-gray-600">Upload Logo</label>
                <p class="text-xs text-gray-500 mb-3">Upload a logo image that will be automatically associated with your user account. The newest profile image for your account will be loaded as the logo.</p>
                
                <!-- Debug buttons -->
                <!--
                                <div class="mb-3 flex gap-2">
                  <button
                    @click="testApiConnection"
                    class="px-3 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700"
                  >
                    Test API Connection
                  </button>
                  <button
                    @click="debugEnvironment"
                    class="px-3 py-1 text-xs bg-gray-600 text-white rounded hover:bg-gray-700"
                  >
                    Debug Environment
                  </button>
                  <button
                    @click="testSimpleUpload"
                    class="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700"
                  >
                    Test Simple Upload
                  </button>
                </div>
                -->
                
                <div class="flex items-center gap-4">
                  <input 
                    ref="logoInput"
                    type="file" 
                    @change="handleLogoUpload" 
                    accept="image/*"
                    class="w-full border p-2 rounded bg-gray-100" 
                  />
                  <button
                    @click="uploadLogo"
                    :disabled="!selectedLogo || isUploadingLogo"
                    class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    <span v-if="!isUploadingLogo">Upload</span>
                    <span v-else class="flex items-center">
                      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Uploading...
                    </span>
                  </button>
                  <button
                    @click="loadNewestProfileImage"
                    class="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 whitespace-nowrap"
                  >
                    Load Newest
                  </button>
                </div>
                
                <!-- Logo Preview -->
                <div v-if="shop.logo" class="mt-4 flex items-center gap-4">
                  <img :src="shop.logo" alt="Shop Logo" class="w-24 h-24 rounded-md object-cover border shadow-md" />
                  <div class="flex flex-col gap-2">
                    <p v-if="shop.logoFileId" class="text-xs text-gray-600">File ID: {{ shop.logoFileId }}</p>
                    <button
                      @click="copyLogoUrl"
                      class="px-3 py-1 text-sm bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                      Copy URL
                    </button>
                    <button
                      @click="removeLogo"
                      class="px-3 py-1 text-sm bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                
                <!-- Selected file preview -->
                <div v-if="selectedLogo" class="mt-2 p-3 bg-gray-50 rounded border">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded border overflow-hidden bg-gray-200">
                      <img 
                        v-if="selectedLogo" 
                        :src="getFilePreviewUrl(selectedLogo)" 
                        alt="Preview" 
                        class="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p class="text-sm text-gray-600">Selected: {{ selectedLogo.name }}</p>
                      <p class="text-xs text-gray-500">Size: {{ formatFileSize(selectedLogo.size) }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- QR Code -->
              <div class="text-center mt-6">
                <p class="text-sm text-gray-600 mb-2">Shop QR Code</p>
                <div class="p-3 bg-gray-100 rounded-lg border shadow-md inline-block">
                  <QrcodeVue :value="shopUrl" size="140" class="mx-auto" />
                </div>
              </div>

              <!-- Update Button -->
              <button @click="updateShopInfo"
                class="w-full bg-gradient-to-r from-red-500 to-red-600 text-white py-2 mt-4 rounded-lg hover:shadow-xl transition transform hover:scale-105">
                Update Shop Info
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import QrcodeVue from "qrcode.vue";
import Sidebar from './Sidebar.vue';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { uploadFiles, getFiles } from '@/utils/fileApi'; 

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

// Initialize stores
const notificationStore = useNotificationStore();

// Shop data
const shop = ref({
  businessId: "72792",
  name: "Akever",
  type: "Clothing & Apparel",
  email: "hasanmaruf0055@gmail.com",
  phone: "01400551001",
  country: "Bangladesh",
  address: "Dhaka",
  announcement: "",
  logo: "",
  logoFileId: null, // Store the file ID for the logo
});

// File upload related state
const selectedLogo = ref(null);
const logoInput = ref(null);
const isUploadingLogo = ref(false);

// Get user ID from localStorage (from decoded JWT token)
const getUserId = () => {
  return localStorage.getItem('user_id') || 'default_user';
};

const shopUrl = ref(""); // Shop page URL
const message = ref(""); // Success message

// Create router instance
const router = useRouter();

/* ---------------------- Load Data from Local Storage on Mount ---------------------- */
onMounted(async () => {
  const savedShop = localStorage.getItem("shopData");
  if (savedShop) {
    shop.value = JSON.parse(savedShop); // Populate shop data from localStorage
  }
  shopUrl.value = window.location.origin + "/shop"; // Adjust shop page link
  
  // Automatically load the newest profile image (silently, without notifications)
  await loadNewestProfileImage(false);
});

/* ---------------------- Load Logo from File System ---------------------- */
const loadLogoFromFileSystem = async () => {
  try {
    const userId = getUserId();
    console.log('Loading logo for user ID:', userId);
    
    // Try to get files for this user to find the logo
    const response = await getFiles(1, 50); // Get first 50 files
    console.log('Files response:', response);
    
    if (!response.result || response.result.length === 0) {
      console.log('No files found in the response');
      return;
    }
    
    // Look for profile images that match the user ID
    const logoFile = response.result.find(file => {
      console.log(`Checking file: ID=${file.id}, entity_id=${file.entity_id}, file_type=${file.file_type}`);
      return file.file_type === 'profile' && 
             file.entity_id === userId;
    });
    
    if (logoFile) {
      console.log('Found logo file:', logoFile);
      shop.value.logo = logoFile.file_url;
      shop.value.logoFileId = logoFile.id;
      localStorage.setItem("shopData", JSON.stringify(shop.value));
      showNotification('Logo loaded from file system', 'success');
    } else {
      console.log('No matching logo file found. Looking for any profile images...');
      
      // If no exact match, show available profile images for debugging
      const profileImages = response.result.filter(file => file.file_type === 'profile');
      console.log('Available profile images:', profileImages);
      
      if (profileImages.length > 0) {
        showNotification(`Found ${profileImages.length} profile image(s) but none match user ID ${userId}`, 'info');
      } else {
        console.log('No profile images found in the system');
      }
    }
  } catch (error) {
    console.error('Error loading logo from file system:', error);
    showNotification('Failed to load logo from file system', 'error');
  }
};

/* ---------------------- Handle Logo File Selection ---------------------- */
const handleLogoUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      showNotification('Please select a valid image file', 'error');
      return;
    }
    
    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showNotification('File size must less than 5MB', 'error');
      return;
    }
    
    selectedLogo.value = file;
    showNotification('Logo file selected. Click "Upload" to save it.', 'info');
  }
};

/* ---------------------- Upload Logo to File System ---------------------- */
const uploadLogo = async () => {
  if (!selectedLogo.value) {
    showNotification('Please select a logo file first', 'warning');
    return;
  }

  // Use the user ID from localStorage as the entity ID
  const uploadEntityId = getUserId();
  console.log('Using user ID as entity ID:', uploadEntityId);

  isUploadingLogo.value = true;
  showNotification('Uploading logo...', 'info');

  try {
    console.log('Uploading logo with entity ID:', uploadEntityId);
    
    // Upload the file using the file API with profile type
    const result = await uploadFiles(
      [selectedLogo.value],
      'profile', // Use profile type for shop logo
      uploadEntityId // Use user ID as entity ID
    );

    console.log('Raw upload result:', result);
    console.log('Type of result:', typeof result);
    console.log('Result keys:', Object.keys(result || {}));

    // The API response should contain the file URL directly
    // Based on the API structure you showed, it should return something like:
    // { success: true, files: [{ id: X, file_url: "..." }] } or similar
    
    let fileUrl = null;
    let fileId = null;

    // Try to extract file URL from different possible response structures
    if (result && typeof result === 'object') {
      console.log('Analyzing result structure...');
      
      // Check if result has files array
      if (result.files && Array.isArray(result.files) && result.files.length > 0) {
        console.log('Found files array:', result.files);
        fileUrl = result.files[0].file_url || result.files[0].url;
        fileId = result.files[0].id;
      }
      // Check if result has a result array (based on your API response format)
      else if (result.result && Array.isArray(result.result) && result.result.length > 0) {
        console.log('Found result array:', result.result);
        fileUrl = result.result[0].file_url || result.result[0].url;
        fileId = result.result[0].id;
      }
      // Check if result has a direct file_url
      else if (result.file_url) {
        console.log('Found direct file_url:', result.file_url);
        fileUrl = result.file_url;
        fileId = result.id;
      }
      // Check if result has url property
      else if (result.url) {
        console.log('Found url property:', result.url);
        fileUrl = result.url;
        fileId = result.id;
      }
      // Check if result is the file data directly
      else if (result.id && (result.file_url || result.url)) {
        console.log('Found direct file data:', result);
        fileUrl = result.file_url || result.url;
        fileId = result.id;
      }
      // Check if result has data property
      else if (result.data) {
        console.log('Found data property:', result.data);
        if (Array.isArray(result.data) && result.data.length > 0) {
          fileUrl = result.data[0].file_url || result.data[0].url;
          fileId = result.data[0].id;
        } else if (result.data.file_url || result.data.url) {
          fileUrl = result.data.file_url || result.data.url;
          fileId = result.data.id;
        }
      }
    }

    console.log('Extracted file URL:', fileUrl);
    console.log('Extracted file ID:', fileId);

    if (fileUrl) {
      // Update shop logo immediately with the uploaded file URL
      shop.value.logo = fileUrl;
      shop.value.logoFileId = fileId;
      
      // Save to localStorage
      localStorage.setItem("shopData", JSON.stringify(shop.value));
      
      showNotification(`Logo uploaded and updated successfully! (User ID: ${uploadEntityId})`, 'success');
      
      // Clear the file input and selected file
      selectedLogo.value = null;
      if (logoInput.value) {
        logoInput.value.value = '';
      }

      // Force reactivity update to ensure the image is displayed immediately
      shop.value = { ...shop.value };

    } else {
      console.error('No file URL found in response:', result);
      showNotification('Upload completed but no file URL received. Please check the response format.', 'warning');
    }

  } catch (error) {
    console.error('Logo upload error:', error);
    showNotification(error.message || 'Failed to upload logo. Please try again.', 'error');
  } finally {
    isUploadingLogo.value = false;
  }
};

/* ---------------------- Copy Logo URL ---------------------- */
const copyLogoUrl = async () => {
  if (!shop.value.logo) return;
  
  try {
    await navigator.clipboard.writeText(shop.value.logo);
    showNotification('Logo URL copied to clipboard!', 'success');
  } catch (error) {
    // Fallback for browsers that don't support clipboard API
    try {
      const textArea = document.createElement('textarea');
      textArea.value = shop.value.logo;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      showNotification('Logo URL copied to clipboard!', 'success');
    } catch (fallbackError) {
      showNotification('Failed to copy URL. Please copy manually.', 'error');
    }
  }
};

/* ---------------------- Remove Logo ---------------------- */
const removeLogo = () => {
  if (confirm('Are you sure you want to remove the logo?')) {
    shop.value.logo = '';
    shop.value.logoFileId = null;
    localStorage.setItem("shopData", JSON.stringify(shop.value));
    showNotification('Logo removed successfully', 'info');
  }
};

/* ---------------------- Format File Size ---------------------- */
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

/* ---------------------- Show Notification ---------------------- */
const showNotification = (message, type = 'info', options = {}) => {
  switch (type) {
    case 'success':
      notificationStore.success(message, options?.duration, { playSound: true, ...options });
      break;
    case 'error':
      notificationStore.error(message, options?.duration, { playSound: true, ...options });
      break;
    case 'warning':
      notificationStore.warning(message, options?.duration, { playSound: true, ...options });
      break;
    case 'info':
      notificationStore.info(message, options?.duration, options);
      break;
    default:
      notificationStore.addNotification(message, type, options?.duration || 4000, options);
  }
};

/* ---------------------- Update Shop Info ---------------------- */
const updateShopInfo = () => {
  // Confirm the action before proceeding
  if (confirm("Are you sure you want to update the shop info?")) {
    // Update localStorage only if confirmed
    localStorage.setItem("shopData", JSON.stringify(shop.value));
    showNotification("✅ Shop information updated successfully!", 'success');

    // Redirect to dashboard after a short delay
    setTimeout(() => {
      message.value = "";
      router.push("/dashboard");
    }, 1500);
  }
};

/* ---------------------- Load Newest Profile Image ---------------------- */
const loadNewestProfileImage = async (showNotifications = true) => {
  try {
    const userId = getUserId();
    console.log('Loading newest profile image for user ID:', userId);
    
    // Get files from the API
    const response = await getFiles(1, 50); // Get first 50 files
    console.log('Files response:', response);
    
    if (!response.result || response.result.length === 0) {
      console.log('No files found in the response');
      if (showNotifications) {
        showNotification('No files found in the system', 'info');
      }
      return;
    }
    
    // Filter profile images for the current user and sort by ID (newest first)
    const userProfileImages = response.result
      .filter(file => file.file_type === 'profile' && file.entity_id === userId)
      .sort((a, b) => b.id - a.id); // Sort by ID descending (newest first)
    
    console.log('Available profile images for user (sorted by newest):', userProfileImages);
    
    if (userProfileImages.length > 0) {
      const newestProfile = userProfileImages[0];
      console.log('Using newest profile image:', newestProfile);
      
      // Update shop logo with the newest profile image
      shop.value.logo = newestProfile.file_url;
      shop.value.logoFileId = newestProfile.id;
      localStorage.setItem("shopData", JSON.stringify(shop.value));
      
      if (showNotifications) {
        showNotification(`Loaded newest profile image (ID: ${newestProfile.id})`, 'success');
      }
    } else {
      console.log('No profile images found for this user');
      if (showNotifications) {
        showNotification(`No profile images found for user ID ${userId}`, 'info');
      }
    }
  } catch (error) {
    console.error('Error loading newest profile image:', error);
    if (showNotifications) {
      showNotification('Failed to load newest profile image', 'error');
    }
  }
};

/* ---------------------- Get File Preview URL ---------------------- */
const getFilePreviewUrl = (file) => {
  if (file && file instanceof File) {
    return URL.createObjectURL(file);
  }
  return '';
};

/* ---------------------- Debug Functions ---------------------- */
const testApiConnection = async () => {
  showNotification('Testing API connection...', 'info');
  
  try {
    // Test different API URLs
    const urls = [
      'http://cdn.apexdrive365.com/api/data',
      'https://cdn.apexdrive365.com/api/data',
      'https://staging.apexdrive365.com/api/data',
      'http://cdn.apexdrive365.com/api',
      'https://cdn.apexdrive365.com/api'
    ];
    
    const headers = {
      'Accept': 'application/json',
      'x-company-token': import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN,
      'x-server-api-key': import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY,
    };
    
    for (const url of urls) {
      try {
        console.log(`Testing URL: ${url}`);
        const response = await fetch(url, {
          method: 'GET',
          headers: headers,
          mode: 'cors'
        });
        
        console.log(`${url} - Status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`${url} - Success:`, data);
          showNotification(`✅ API connection successful at ${url}`, 'success');
          return;
        } else {
          const errorText = await response.text();
          console.log(`${url} - Error response:`, errorText);
          showNotification(`${url} returned status ${response.status}`, 'warning');
        }
      } catch (error) {
        console.log(`${url} - Error:`, error);
        showNotification(`${url} failed: ${error.message}`, 'warning');
      }
    }
    
    showNotification('❌ All API endpoints failed', 'error');
  } catch (error) {
    console.error('API test error:', error);
    showNotification('API test failed', 'error');
  }
};

const debugEnvironment = () => {
  console.log('Environment Debug Info:');
  console.log('VITE_API_BASE_URL:', import.meta.env.VITE_API_BASE_URL);
  console.log('VITE_API_BASE_URL_FILE_UPLOAD:', import.meta.env.VITE_API_BASE_URL_FILE_UPLOAD);
  console.log('VITE_API_BASE_URL_X_COMPANY_TOKEN:', import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN ? 'Present' : 'Missing');
  console.log('VITE_API_BASE_URL_X_SERVER_API_KEY:', import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY ? 'Present' : 'Missing');
  
  showNotification('Environment debug info logged to console', 'info');
};

// Test upload function for debugging
const testUpload = async () => {
  // Create a small test file
  const testContent = 'This is a test file content for shop';
  const testFile = new File([testContent], 'shop-test.txt', { type: 'text/plain' });
  
  const userId = getUserId();
  console.log('Testing shop upload with user ID:', userId, 'file:', testFile);
  
  try {
    const result = await uploadFiles([testFile], 'profile', userId);
    console.log('Test shop upload result:', result);
    showNotification('Test upload successful!', 'success');
  } catch (error) {
    console.error('Test shop upload failed:', error);
    showNotification(`Test upload failed: ${error.message}`, 'error');
  }
};

// Simple upload test function to debug the API connectivity issue
const testSimpleUpload = async () => {
  showNotification('Testing simple upload...', 'info');
  
  try {
    // Create a very small test file
    const testContent = 'test';
    const testFile = new File([testContent], 'test.txt', { type: 'text/plain' });
    
    console.log('Creating test file:', testFile);
    
    // Try direct axios call first
    const formData = new FormData();
    formData.append('files[]', testFile);
    formData.append('file_type', 'profile');
    formData.append('entity_id', 'test_simple');
    
    const headers = {
      'x-company-token': import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN,
      'x-server-api-key': import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY,
    };
    
    // Try different URLs directly
    const testUrls = [
      'http://cdn.apexdrive365.com/api/data',
      'https://cdn.apexdrive365.com/api/data',
      'https://staging.apexdrive365.com/api/data',
      'http://cdn.apexdrive365.com/api/upload',
      'https://cdn.apexdrive365.com/api/upload'
    ];
    
    for (const url of testUrls) {
      try {
        console.log(`Testing direct upload to: ${url}`);
        
        const response = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: formData
        });
        
        console.log(`${url} - Status: ${response.status}`);
        
        if (response.ok) {
          const data = await response.json();
          console.log(`${url} - Success:`, data);
          showNotification(`✅ Simple upload successful at ${url}`, 'success');
          return;
        } else {
          const errorText = await response.text();
          console.log(`${url} - Error response:`, errorText);
        }
      } catch (error) {
        console.log(`${url} - Fetch error:`, error);
      }
    }
    
    showNotification('❌ All simple upload attempts failed', 'error');
  } catch (error) {
    console.error('Simple upload test error:', error);
    showNotification('Simple upload test failed', 'error');
  }
};

// Make functions available globally for console testing
if (typeof window !== 'undefined') {
  window.testShopUpload = testUpload;
  window.debugApiConfig = () => {
    console.log('Environment variables check:', {
      VITE_API_BASE_URL_FILE_UPLOAD: import.meta.env.VITE_API_BASE_URL_FILE_UPLOAD,
      VITE_API_BASE_URL_X_COMPANY_TOKEN: import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN ? 'Present' : 'Missing',
      VITE_API_BASE_URL_X_SERVER_API_KEY: import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY ? 'Present' : 'Missing',
    });
  };
}
</script>

<style scoped>
/* Scoped Styles for ManageShop component */
</style>