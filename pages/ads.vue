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
          <div class="mb-6">
          </div>
          <!-- Upload Section -->
          <div class="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-4">Upload Ads</h2>
            
            <!-- Upload Type Selection -->
            <div class="mb-6">
              <label class="block text-sm font-medium text-gray-700 mb-3">
                Select Ad Type
              </label>
              <div class="flex space-x-4">
                <button
                  @click="selectedUploadType = 'image'; selectedFiles = []; uploadForm.fileType = ''; customPlacementText = ''"
                  :class="[
                    'px-4 py-2 rounded-lg border-2 transition-all duration-200',
                    selectedUploadType === 'image'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  ]"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    <span>Image Ads</span>
                  </div>
                </button>
                <button
                  @click="selectedUploadType = 'video'; selectedFiles = []; uploadForm.fileType = ''; customPlacementText = ''"
                  :class="[
                    'px-4 py-2 rounded-lg border-2 transition-all duration-200',
                    selectedUploadType === 'video'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  ]"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                    </svg>
                    <span>Video Ads</span>
                  </div>
                </button>
                <button
                  @click="selectedUploadType = 'slideshow'; selectedFiles = []; uploadForm.fileType = ''; customPlacementText = ''"
                  :class="[
                    'px-4 py-2 rounded-lg border-2 transition-all duration-200',
                    selectedUploadType === 'slideshow'
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                  ]"
                >
                  <div class="flex items-center space-x-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                    </svg>
                    <span>Slideshow Ads</span>
                  </div>
                </button>
              </div>
            </div>
            
            <form @submit.prevent="handleFileUpload" class="space-y-4">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <!-- File Input -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Select {{ selectedUploadType === 'image' ? 'Image' : selectedUploadType === 'video' ? 'Video' : 'Slideshow' }} Files
                  </label>
                  <input
                    ref="fileInput"
                    type="file"
                    multiple
                    :accept="selectedUploadType === 'image' ? '.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg' : selectedUploadType === 'video' ? '.mp4,.avi,.mov,.mkv,.webm,.flv,.wmv,.m4v' : '.jpg,.jpeg,.png,.gif,.bmp,.webp,.svg,.mp4,.avi,.mov,.mkv,.webm,.flv,.wmv,.m4v'"
                    @change="handleFileSelect"
                    class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                  <p class="text-xs text-gray-500 mt-1">
                    {{ selectedUploadType === 'image' ? 'Supported formats: JPG, PNG, GIF, BMP, WebP, SVG' : selectedUploadType === 'video' ? 'Supported formats: MP4, AVI, MOV, MKV, WebM, FLV, WMV, M4V' : 'Supported formats: Images (JPG, PNG, GIF, BMP, WebP, SVG) and Videos (MP4, AVI, MOV, MKV, WebM, FLV, WMV, M4V)' }} • Max size: 10MB per file.
                  </p>
                </div>

                <!-- File Type -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    {{ selectedUploadType === 'image' ? 'Image' : selectedUploadType === 'video' ? 'Video' : 'Slideshow' }} Placement
                    <span class="text-xs text-gray-500 ml-1">(Choose or enter ad placement)</span>
                  </label>
                  
                  <!-- Predefined Placement Dropdown -->
                  <select
                    v-model="uploadForm.fileType"
                    @change="customPlacementText = ''"
                    class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-2"
                  >
                    <option value="">Select ad placement</option>
                    <template v-if="selectedUploadType === 'image'">
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
                      <optgroup label="Other">
                        <option value="icon">Icon</option>
                        <option value="other">Other</option>
                      </optgroup>
                    </template>
                    <template v-else-if="selectedUploadType === 'video'">
                      <optgroup label="Video Ad Placements">
                        <option value="video_banner_top">Video Banner - Top</option>
                        <option value="video_banner_center">Video Banner - Center</option>
                        <option value="video_banner_bottom">Video Banner - Bottom</option>
                        <option value="video_popup">Video Popup</option>
                        <option value="video_floating">Video Floating</option>
                        <option value="video_interstitial">Video Interstitial</option>
                        <option value="video_pre_roll">Video Pre-roll</option>
                        <option value="video_mid_roll">Video Mid-roll</option>
                        <option value="video_post_roll">Video Post-roll</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="video">Video</option>
                        <option value="animation">Animation</option>
                      </optgroup>
                    </template>
                    <template v-else-if="selectedUploadType === 'slideshow'">
                      <optgroup label="Slideshow Ad Placements">
                        <option value="slideshow_banner_top">Slideshow Banner - Top</option>
                        <option value="slideshow_banner_center">Slideshow Banner - Center</option>
                        <option value="slideshow_banner_bottom">Slideshow Banner - Bottom</option>
                        <option value="slideshow_popup">Slideshow Popup</option>
                        <option value="slideshow_floating">Slideshow Floating</option>
                        <option value="slideshow_interstitial">Slideshow Interstitial</option>
                        <option value="slideshow_carousel">Slideshow Carousel</option>
                        <option value="slideshow_gallery">Slideshow Gallery</option>
                        <option value="slideshow_hero">Slideshow Hero</option>
                      </optgroup>
                      <optgroup label="Other">
                        <option value="slideshow">Slideshow</option>
                        <option value="presentation">Presentation</option>
                      </optgroup>
                    </template>
                  </select>
                  
                  <!-- Custom Placement Input -->
                  <div class="relative">
                    <input
                      v-model="customPlacementText"
                      @input="uploadForm.fileType = customPlacementText"
                      type="text"
                      placeholder="Or enter custom ad placement"
                      class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                    />
                    <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                      </svg>
                    </div>
                  </div>
                  
                  <p class="text-xs text-gray-500 mt-2">
                    Select from predefined placements or enter a custom placement type. Files will be automatically associated with your user account.
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
                <div class="flex items-center space-x-4">
                  <h2 class="text-xl font-semibold text-gray-900">Uploaded Ads</h2>
                  
                  <!-- View Type Filter -->
                  <div class="flex space-x-2">
                    <button
                      @click="selectedViewType = 'image'"
                      :class="[
                        'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200',
                        selectedViewType === 'image'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      ]"
                    >
                      <div class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span>Images</span>
                      </div>
                    </button>
                    <button
                      @click="selectedViewType = 'video'"
                      :class="[
                        'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200',
                        selectedViewType === 'video'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      ]"
                    >
                      <div class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
                        </svg>
                        <span>Videos</span>
                      </div>
                    </button>
                    <button
                      @click="selectedViewType = 'slideshow'"
                      :class="[
                        'px-3 py-1 rounded-md text-sm font-medium transition-all duration-200',
                        selectedViewType === 'slideshow'
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      ]"
                    >
                      <div class="flex items-center space-x-1">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                        </svg>
                        <span>Slideshows</span>
                      </div>
                    </button>
                  </div>
                </div>
                
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
            <div v-else-if="filteredFiles.length > 0" class="p-6">
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  v-for="file in filteredFiles"
                  :key="file.id"
                  class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div class="flex justify-between items-start mb-3">
                    <div class="flex-1">
                      <h3 class="font-medium text-gray-900">Ad ID: {{ file.id }}</h3>
                      <p class="text-sm text-gray-600">Type: {{ getFileTypeName(file.file_type) }}</p>
                      <p class="text-xs text-gray-500">Created: {{ file.created_at }}</p>
                    </div>
                    <span :class="['px-2 py-1 text-xs font-medium rounded-full', getCategoryColor(getFileTypeCategory(file.file_type))]">
                      {{ getDisplayType(file) }}
                    </span>
                  </div>
                  
                  <!-- File Preview -->
                  <div class="mb-3">
                    <!-- Image Preview -->
                    <div v-if="selectedViewType === 'image' && (isImageAdType(file.file_type) || isImageFile(file.file_url) || isCustomImageType(file.file_type))">
                      <img
                        :src="file.file_url"
                        :alt="`File ${file.id}`"
                        class="w-full h-32 object-cover rounded border"
                        @error="handleImageError"
                      />
                    </div>
                    
                    <!-- Video Preview -->
                    <div v-else-if="selectedViewType === 'video' && (isVideoAdType(file.file_type) || isVideoFile(file.file_url) || isCustomVideoType(file.file_type))">
                      <video
                        :src="file.file_url"
                        class="w-full h-32 object-cover rounded border"
                        controls
                        preload="metadata"
                        @error="handleVideoError"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                    
                    <!-- Slideshow Preview -->
                    <div v-else-if="selectedViewType === 'slideshow' && (isSlideshowAdType(file.file_type) || isCustomSlideshowType(file.file_type))">
                      <!-- Always show image preview for slideshow files (most slideshow content will be images) -->
                      <img
                        :src="file.file_url"
                        :alt="`Slideshow ${file.id}`"
                        class="w-full h-32 object-cover rounded border"
                        @error="handleImageError"
                      />
                    </div>
                    
                    <!-- Fallback for unsupported files -->
                    <div v-else class="w-full h-32 bg-gray-100 rounded border flex items-center justify-center">
                      <div class="text-center text-gray-500">
                        <svg class="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <p class="text-sm">{{ selectedViewType === 'image' ? 'Image' : selectedViewType === 'video' ? 'Video' : 'Slideshow' }} preview</p>
                        <p class="text-xs">Type: {{ getFileTypeName(file.file_type) }}</p>
                      </div>
                    </div>
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
                      @click="deleteFile(file.id)"
                      class="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>

              <!-- Pagination -->
              <div v-if="pagination.totalPage > 1" class="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                <!-- Pagination Info -->
                <div class="text-sm text-gray-700">
                  Showing {{ ((pagination.page - 1) * pagination.limit) + 1 }} to {{ Math.min(pagination.page * pagination.limit, pagination.total) }} of {{ pagination.total }} files
                  <span class="text-gray-500">(filtered by {{ selectedViewType }}: {{ filteredFiles.length }})</span>
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
                  
                  <!-- Items per page selector -->
                  <select 
                    v-model="pagination.limit" 
                    @change="handleItemsPerPageChange"
                    class="ml-2 px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  >
                    <option :value="10">10 per page</option>
                    <option :value="20">20 per page</option>
                    <option :value="50">50 per page</option>
                  </select>
                </nav>
              </div>
            </div>

            <!-- Empty State -->
            <div v-else class="p-6 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No {{ selectedViewType }} ads</h3>
              <p class="mt-1 text-sm text-gray-500">Get started by uploading your first {{ selectedViewType }} ad.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import Sidebar from './Sidebar.vue';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { uploadFiles, getFiles, downloadFile, createDownloadLink } from '@/utils/fileApi';
import type { FileItem, FileUploadForm, FilePagination } from '@/types/file';

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

// Initialize notification store
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

// Media type selection
const selectedUploadType = ref<'image' | 'video' | 'slideshow'>('image');
const selectedViewType = ref<'image' | 'video' | 'slideshow'>('image');

// Custom placement text input
const customPlacementText = ref<string>('');

// Pagination
const pagination = ref<FilePagination>({
  page: 1,
  limit: 10,
  total: 0,
  totalPage: 0,
});

// File selection handler with type validation
const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    const newFiles = Array.from(target.files);
    
    // Filter files based on selected upload type
    const validFiles = newFiles.filter(file => {
      if (selectedUploadType.value === 'image') {
        // Check both MIME type and file extension for images
        const isValidImageMime = file.type.startsWith('image/');
        const isValidImageExt = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'].some(ext => 
          file.name.toLowerCase().endsWith(ext)
        );
        return isValidImageMime || isValidImageExt;
      } else if (selectedUploadType.value === 'video') {
        // Check both MIME type and file extension for videos
        const isValidVideoMime = file.type.startsWith('video/');
        const isValidVideoExt = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv', '.m4v'].some(ext => 
          file.name.toLowerCase().endsWith(ext)
        );
        return isValidVideoMime || isValidVideoExt;
      } else if (selectedUploadType.value === 'slideshow') {
        // Check for both images and videos for slideshow
        const isValidImageMime = file.type.startsWith('image/');
        const isValidImageExt = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'].some(ext => 
          file.name.toLowerCase().endsWith(ext)
        );
        const isValidVideoMime = file.type.startsWith('video/');
        const isValidVideoExt = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv', '.m4v'].some(ext => 
          file.name.toLowerCase().endsWith(ext)
        );
        return isValidImageMime || isValidImageExt || isValidVideoMime || isValidVideoExt;
      }
      return false;
    });
    
    // Show notification if some files were filtered out
    if (validFiles.length !== newFiles.length) {
      const filteredCount = newFiles.length - validFiles.length;
      const supportedFormats = selectedUploadType.value === 'image' 
        ? 'JPG, PNG, GIF, BMP, WebP, SVG'
        : selectedUploadType.value === 'video'
        ? 'MP4, AVI, MOV, MKV, WebM, FLV, WMV, M4V'
        : 'Images (JPG, PNG, GIF, BMP, WebP, SVG) and Videos (MP4, AVI, MOV, MKV, WebM, FLV, WMV, M4V)';
      
      showNotification(
        `${filteredCount} file(s) were filtered out. Only ${selectedUploadType.value} files are supported (${supportedFormats}).`,
        'warning'
      );
    }
    
    selectedFiles.value = [...selectedFiles.value, ...validFiles];
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
    customPlacementText.value = '';
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

// Handle change in items per page
const handleItemsPerPageChange = async () => {
  pagination.value.page = 1; // Reset to first page when changing items per page
  await loadFiles(1);
};

// Load files from API
const loadFiles = async (page: number = 1) => {
  isLoadingFiles.value = true;
  
  try {
    const response = await getFiles(page, pagination.value.limit);
    
    files.value = response.result || [];
    pagination.value = {
      page: response.meta.page || page,
      limit: response.meta.limit || pagination.value.limit,
      total: response.meta.total || 0,
      totalPage: response.meta.totalPage || 0,
    };
    
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
    pagination.value.page = newPage;
    await loadFiles(newPage);
  }
};

// Get visible page numbers for pagination
const getVisiblePages = () => {
  const totalPages = pagination.value.totalPage;
  const currentPage = pagination.value.page;
  const pages: (number | string)[] = [];
  
  if (totalPages <= 9) {
    // Show all pages if 9 or fewer
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    // Always show first page
    pages.push(1);
    
    if (currentPage > 5) {
      pages.push('...');
    }
    
    // Show more pages around current page
    const start = Math.max(2, currentPage - 2);
    const end = Math.min(totalPages - 1, currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    if (currentPage < totalPages - 4) {
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

// Delete file with comprehensive CORS workaround strategies
const deleteFile = async (fileId: string | number) => {
  showNotification('Deleting ad...', 'info');

  const baseUrl = import.meta.env.VITE_API_BASE_URL_FILE_UPLOAD || 'https://cdn.apexdrive365.com/api';
  const companyToken = import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN || '';
  const serverApiKey = import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY || '';

  // Build base headers that will be used in all strategies
  const baseHeaders = {
    'X-Company-Token': companyToken,
    'X-Server-API-Key': serverApiKey
  };

  // Strategy definitions with progressive fallbacks
  const deleteStrategies = [
    // Strategy 1: Standard DELETE with minimal headers to reduce preflight complexity
    {
      name: 'Standard DELETE',
      execute: async () => {
        const deleteUrl = `${baseUrl}/data/${fileId}`;
        
        // Execute standard DELETE

        const response = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: baseHeaders,
          mode: 'cors',
          credentials: 'omit', // Don't send cookies
          cache: 'no-cache'
        });

        return response;
      }
    },

    // Strategy 2: DELETE with no-cors mode (can't read response but may succeed)
    {
      name: 'No-CORS DELETE',
      execute: async () => {
        const deleteUrl = `${baseUrl}/data/${fileId}`;
        
        // Execute DELETE with no-cors mode

        const response = await fetch(deleteUrl, {
          method: 'DELETE',
          headers: baseHeaders,
          mode: 'no-cors',
          credentials: 'omit',
          cache: 'no-cache'
        });

        return response;
      }
    },

    // Strategy 3: POST with method override (widely supported workaround)
    {
      name: 'POST with DELETE override',
      execute: async () => {
        const deleteUrl = `${baseUrl}/data/${fileId}`;
        const headers = {
          ...baseHeaders,
          'Content-Type': 'application/x-www-form-urlencoded'
        };
        
        // Execute POST with method override

        const response = await fetch(deleteUrl, {
          method: 'POST',
          headers: headers,
          body: '_method=DELETE',
          mode: 'cors',
          credentials: 'omit',
          cache: 'no-cache'
        });

        return response;
      }
    },

    // Strategy 4: Try alternative URL patterns that might bypass redirect issues
    {
      name: 'Alternative URL format',
      execute: async () => {
        const deleteUrl = `${baseUrl}/data/${fileId}/delete`;
        
        // Execute with alternative URL format

        const response = await fetch(deleteUrl, {
          method: 'POST',
          headers: {
            ...baseHeaders,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ action: 'delete' }),
          mode: 'cors',
          credentials: 'omit',
          cache: 'no-cache'
        });

        return response;
      }
    },

    // Strategy 5: Simple GET request to a delete endpoint (if supported)
    {
      name: 'GET delete endpoint',
      execute: async () => {
        const deleteUrl = `${baseUrl}/data/${fileId}?action=delete&${new URLSearchParams(baseHeaders).toString()}`;
        
        // Execute using GET method

        const response = await fetch(deleteUrl, {
          method: 'GET',
          mode: 'cors',
          credentials: 'omit',
          cache: 'no-cache'
        });

        return response;
      }
    },

    // Strategy 6: Form submission fallback (most reliable for CORS issues)
    {
      name: 'Form submission',
      execute: async () => {
        return new Promise((resolve, reject) => {
          try {
            // Form submission fallback strategy
            
            // Create a hidden form
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = `${baseUrl}/data/${fileId}`;
            form.style.display = 'none';
            form.target = '_blank'; // Open in new tab to avoid navigation

            // Add method override
            const methodField = document.createElement('input');
            methodField.type = 'hidden';
            methodField.name = '_method';
            methodField.value = 'DELETE';
            form.appendChild(methodField);

            // Add headers as hidden fields
            Object.entries(baseHeaders).forEach(([key, value]) => {
              const field = document.createElement('input');
              field.type = 'hidden';
              field.name = key;
              field.value = value;
              form.appendChild(field);
            });

            // Add CSRF token if available
            const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
            if (csrfToken) {
              const csrfField = document.createElement('input');
              csrfField.type = 'hidden';
              csrfField.name = '_token';
              csrfField.value = csrfToken;
              form.appendChild(csrfField);
            }

            document.body.appendChild(form);
            
            // Submit form
            form.submit();
            
            // Clean up
            setTimeout(() => {
              document.body.removeChild(form);
            }, 1000);
            
            // Since we can't get a real response from form submission,
            // we'll assume success and let the user refresh to verify
            resolve({
              ok: true,
              status: 200,
              statusText: 'Form submitted',
              type: 'basic'
            } as Response);
            
          } catch (error) {
            reject(error);
          }
        });
      }
    }
  ];

  // Execute strategies with proper error handling and fallbacks
  for (let i = 0; i < deleteStrategies.length; i++) {
    const strategy = deleteStrategies[i];
    
    try {
      // Add timeout to prevent hanging requests
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Request timeout')), 15000);
      });
      
      const response = await Promise.race([strategy.execute(), timeoutPromise]);

      // Handle no-cors responses (opaque responses)
      if (response.type === 'opaque') {
        showNotification('Delete request sent successfully! Refreshing...', 'info');
        
        // Wait a moment for the server to process, then refresh
        setTimeout(async () => {
          await loadFiles(pagination.value.page);
        }, 1000);
        return;
      }

      // Handle successful responses
      if (response.ok && response.status >= 200 && response.status < 300) {
        
        // Special handling for form submission
        if (strategy.name === 'Form submission') {
          showNotification('Delete request submitted via form. Please refresh to verify the deletion.', 'info');
          setTimeout(async () => {
            await loadFiles(pagination.value.page);
          }, 2000);
        } else {
          showNotification('Ad deleted successfully!', 'success');
          await loadFiles(pagination.value.page);
        }
        return;
      }

      // Handle HTTP errors
      if (response.status >= 400) {
        let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
        
        try {
          const errorText = await response.text();
          if (errorText) {
            errorMessage += ` - ${errorText}`;
          }
        } catch (e) {
          console.warn('Could not read error response body:', e);
        }
        
        // If it's a 404, the file might already be deleted
        if (response.status === 404) {
          showNotification('Ad may already be deleted. Refreshing list...', 'warning');
          await loadFiles(pagination.value.page);
          return;
        }
        
        // For other HTTP errors, try next strategy unless it's the last one
        if (i < deleteStrategies.length - 1) {
          continue;
        } else {
          throw new Error(errorMessage);
        }
      }

      // Unexpected response, try next strategy
      
    } catch (error: any) {
      // Check if this is a network/CORS error
      const isNetworkError = error.message.includes('Failed to fetch') || 
                           error.message.includes('CORS') ||
                           error.message.includes('network') ||
                           error.message.includes('timeout') ||
                           error.name === 'TypeError';
      
      // If it's a network error and we have more strategies, continue
      if (isNetworkError && i < deleteStrategies.length - 1) {
        continue;
      }
      
      // If this is the last strategy, handle the final error
      if (i === deleteStrategies.length - 1) {
        
        let finalError = 'Failed to delete ad after trying all available methods.';
        let showManualOption = false;
        
        if (isNetworkError) {
          finalError = 'Unable to delete ad due to network restrictions (CORS policy). This may be a server configuration issue.';
          showManualOption = true;
        } else if (error.message.includes('401')) {
          finalError = 'Authentication failed. Please refresh the page and try again.';
        } else if (error.message.includes('403')) {
          finalError = 'Permission denied. You may not have rights to delete this ad.';
        } else if (error.message.includes('500')) {
          finalError = 'Server error occurred. Please try again later.';
        } else if (error.message) {
          finalError = error.message;
        }
        
        showNotification(finalError, 'error', { duration: 12000 });
        
        // Offer manual URL option for CORS issues
        if (showManualOption) {
          const manualUrl = `${baseUrl}/data/${fileId}`;
          setTimeout(() => {
            if (confirm(`Would you like to try deleting manually? This will open a new tab where you can try the delete operation directly.\n\nURL: ${manualUrl}`)) {
              // Open the delete URL in a new tab for manual deletion
              const newTab = window.open(`${manualUrl}?manual_delete=1&${new URLSearchParams(baseHeaders).toString()}`, '_blank');
              if (newTab) {
                showNotification('Manual delete tab opened. After deleting, come back and refresh this page.', 'info', { duration: 8000 });
              }
            }
          }, 2000);
        }
        
        return;
      }
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

// Check if file is an image
const isImageFile = (url: string) => {
  if (!url) return false;
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.tiff', '.tif', '.ico'];
  const imageMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp', 'image/webp', 'image/svg+xml', 'image/tiff', 'image/x-icon'];
  
  // Check by file extension
  const hasImageExtension = imageExtensions.some(ext => url.toLowerCase().includes(ext));
  
  // Check by MIME type if available in URL
  const hasImageMimeType = imageMimeTypes.some(mime => url.toLowerCase().includes(mime));
  
  return hasImageExtension || hasImageMimeType;
};

// Get filtered files based on selected view type
const filteredFiles = computed(() => {
  return files.value.filter(file => {
    if (selectedViewType.value === 'image') {
      // Check if it's an image ad type, if the file URL is an image, OR if it's a custom type that should be treated as image
      return isImageAdType(file.file_type) || isImageFile(file.file_url) || isCustomImageType(file.file_type);
    } else if (selectedViewType.value === 'video') {
      // Check if it's a video ad type, if the file URL is a video, OR if it's a custom type that should be treated as video
      return isVideoAdType(file.file_type) || isVideoFile(file.file_url) || isCustomVideoType(file.file_type);
    } else if (selectedViewType.value === 'slideshow') {
      // Check if it's a slideshow ad type OR if it's a custom type that should be treated as slideshow
      return isSlideshowAdType(file.file_type) || isCustomSlideshowType(file.file_type);
    }
    return false;
  });
});

// Check if the file type is an image ad type
const isImageAdType = (fileType: string) => {
  const imageAdTypes = [
    // Ad placements
    'banner_top_left', 'banner_top_right', 'banner_top_center',
    'banner_bottom_left', 'banner_bottom_right', 'banner_bottom_center',
    'banner_center', 'banner_sidebar_left', 'banner_sidebar_right',
    'banner_header', 'banner_footer', 'popup_ad', 'floating_ad',
    'sticky_ad', 'interstitial_ad',
    // Content types
    'profile', 'product', 'category', 'brand_logo', 'hero_image', 
    'gallery', 'thumbnail', 'icon', 'other',
    // Legacy types
    'bannar1_ad'
  ];
  return imageAdTypes.includes(fileType);
};

// Check if the file type is a video ad type
const isVideoAdType = (fileType: string) => {
  const videoAdTypes = [
    // Video ad placements
    'video_banner_top', 'video_banner_center', 'video_banner_bottom',
    'video_popup', 'video_floating', 'video_interstitial',
    'video_pre_roll', 'video_mid_roll', 'video_post_roll',
    // General video types
    'video', 'animation'
  ];
  return videoAdTypes.includes(fileType);
};

// Check if the file type is a slideshow ad type
const isSlideshowAdType = (fileType: string) => {
  const slideshowAdTypes = [
    // Slideshow ad placements
    'slideshow_banner_top', 'slideshow_banner_center', 'slideshow_banner_bottom',
    'slideshow_popup', 'slideshow_floating', 'slideshow_interstitial',
    'slideshow_carousel', 'slideshow_gallery', 'slideshow_hero',
    // General slideshow types
    'slideshow', 'presentation'
  ];
  return slideshowAdTypes.includes(fileType);
};

// Check if custom type should be treated as image (for unknown/custom types, assume image by default)
const isCustomImageType = (fileType: string) => {
  // If it's not a known video or slideshow type, and not empty, treat as custom image type
  return fileType && 
         !isVideoAdType(fileType) && 
         !isSlideshowAdType(fileType) && 
         !fileType.startsWith('video_') && 
         !fileType.startsWith('slideshow_');
};

// Check if custom type should be treated as video
const isCustomVideoType = (fileType: string) => {
  // Only treat as custom video if it contains 'video' in the name
  return fileType && fileType.toLowerCase().includes('video') && !isVideoAdType(fileType);
};

// Check if custom type should be treated as slideshow
const isCustomSlideshowType = (fileType: string) => {
  // Only treat as custom slideshow if it contains 'slideshow' or 'slide' in the name
  return fileType && (fileType.toLowerCase().includes('slideshow') || fileType.toLowerCase().includes('slide')) && !isSlideshowAdType(fileType);
};

// Check if file is a video
const isVideoFile = (url: string) => {
  if (!url) return false;
  const videoExtensions = ['.mp4', '.avi', '.mov', '.mkv', '.webm', '.flv', '.wmv', '.m4v', '.3gp', '.ogv', '.mpeg', '.mpg'];
  const videoMimeTypes = ['video/mp4', 'video/avi', 'video/quicktime', 'video/x-msvideo', 'video/webm', 'video/x-flv', 'video/x-ms-wmv', 'video/3gpp', 'video/ogg'];
  
  // Check by file extension
  const hasVideoExtension = videoExtensions.some(ext => url.toLowerCase().includes(ext));
  
  // Check by MIME type if available in URL
  const hasVideoMimeType = videoMimeTypes.some(mime => url.toLowerCase().includes(mime));
  
  return hasVideoExtension || hasVideoMimeType;
};

const getFileTypeName = (fileType: string) => {
  const fileTypeMap: { [key: string]: string } = {
    // Image ad placements
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
    
    // Video ad placements
    'video_banner_top': 'Video Banner - Top',
    'video_banner_center': 'Video Banner - Center',
    'video_banner_bottom': 'Video Banner - Bottom',
    'video_popup': 'Video Popup',
    'video_floating': 'Video Floating',
    'video_interstitial': 'Video Interstitial',
    'video_pre_roll': 'Video Pre-roll',
    'video_mid_roll': 'Video Mid-roll',
    'video_post_roll': 'Video Post-roll',
    
    // Slideshow ad placements
    'slideshow_banner_top': 'Slideshow Banner - Top',
    'slideshow_banner_center': 'Slideshow Banner - Center',
    'slideshow_banner_bottom': 'Slideshow Banner - Bottom',
    'slideshow_popup': 'Slideshow Popup',
    'slideshow_floating': 'Slideshow Floating',
    'slideshow_interstitial': 'Slideshow Interstitial',
    'slideshow_carousel': 'Slideshow Carousel',
    'slideshow_gallery': 'Slideshow Gallery',
    'slideshow_hero': 'Slideshow Hero',
    
    // Legacy and other types
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
    'slideshow': 'Slideshow',
    'presentation': 'Presentation',
    'icon': 'Icon',
    'other': 'Other',
    'bannar1_ad': 'Banner Ad (Legacy)', // Keep compatibility with existing data
  };
  return fileTypeMap[fileType] || fileType;
};

// Get file type category for color coding
const getFileTypeCategory = (fileType: string) => {
  // Video ads
  if (fileType.startsWith('video_') || fileType === 'video' || fileType === 'animation') return 'video_ad';
  
  // Slideshow ads
  if (fileType.startsWith('slideshow_') || fileType === 'slideshow' || fileType === 'presentation') return 'slideshow_ad';
  
  // Image ads (banners and advertisement placements)
  if (fileType.startsWith('banner_') || fileType === 'popup_ad' || fileType === 'floating_ad' || fileType === 'sticky_ad' || fileType === 'interstitial_ad' || fileType === 'bannar1_ad') return 'ad';
  
  // Content images
  if (['profile', 'product', 'category', 'brand_logo', 'hero_image', 'gallery', 'thumbnail', 'icon'].includes(fileType)) return 'image';
  
  // Other document types (for potential future use)
  if (['document', 'pdf', 'invoice', 'receipt', 'contract'].includes(fileType)) return 'document';
  
  // Custom types - categorize based on content
  if (isCustomVideoType(fileType)) return 'video_ad';
  if (isCustomSlideshowType(fileType)) return 'slideshow_ad';
  if (isCustomImageType(fileType)) return 'ad'; // Custom image types default to 'ad' category
  
  return 'other';
};

// Get category color
const getCategoryColor = (category: string) => {
  switch (category) {
    case 'ad': return 'bg-red-100 text-red-800';
    case 'video_ad': return 'bg-purple-100 text-purple-800';
    case 'slideshow_ad': return 'bg-indigo-100 text-indigo-800';
    case 'image': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

// Get display type for file badge
const getDisplayType = (file: any) => {
  if (isImageAdType(file.file_type) ) {
    return 'Image Ad';
  } else if (isVideoAdType(file.file_type) || isVideoFile(file.file_url) || isCustomVideoType(file.file_type)) {
    return 'Video Ad';
  } else if (isSlideshowAdType(file.file_type) || isCustomSlideshowType(file.file_type)) {
    return 'Slideshow Ad';
  }
  return 'Custom Ad';
};

// Handle image error
const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.style.display = 'none';
};

// Handle video error
const handleVideoError = (event: Event) => {
  const target = event.target as HTMLVideoElement;
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

// Load initial data
onMounted(async () => {
  // Ensure user ID is available from token
  let userId = localStorage.getItem('user_id');
  if (!userId) {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decodeJWT(token);
      if (decodedToken && decodedToken.sub) {
        localStorage.setItem('user_id', decodedToken.sub);
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