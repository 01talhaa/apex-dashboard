# File Upload System Documentation

## Overview
This file upload system allows users to upload, manage, and organize files with specific categorization for different use cases, particularly for advertising placements and content management.

## Features

### File Upload
- **Multiple File Upload**: Select and upload multiple files at once
- **File Type Classification**: Categorize files based on their intended use
- **Entity Association**: Associate files with specific entities using Entity ID
- **Real-time Progress**: Visual feedback during upload process

### File Types Available

#### Ad Placements
Perfect for advertising and promotional content with specific positioning:
- **Banner - Top Left**: Advertisements for top-left corner placement
- **Banner - Top Right**: Advertisements for top-right corner placement  
- **Banner - Top Center**: Advertisements for top-center placement
- **Banner - Bottom Left**: Advertisements for bottom-left corner placement
- **Banner - Bottom Right**: Advertisements for bottom-right corner placement
- **Banner - Bottom Center**: Advertisements for bottom-center placement
- **Banner - Center**: Advertisements for center placement
- **Banner - Sidebar Left**: Advertisements for left sidebar
- **Banner - Sidebar Right**: Advertisements for right sidebar
- **Banner - Header**: Header advertisements
- **Banner - Footer**: Footer advertisements
- **Popup Advertisement**: Pop-up style advertisements
- **Floating Advertisement**: Floating/overlay advertisements
- **Sticky Advertisement**: Sticky/fixed position advertisements
- **Interstitial Advertisement**: Full-screen interstitial advertisements

#### Content Types
For general content and media:
- **Profile Image**: User profile pictures
- **Product Image**: Product photos and images
- **Category Image**: Category thumbnails and banners
- **Brand Logo**: Company and brand logos
- **Hero Image**: Main hero/banner images
- **Gallery Image**: Gallery and portfolio images
- **Thumbnail**: Thumbnail images

#### Documents
For document and file management:
- **Document**: General documents
- **PDF File**: PDF documents
- **Invoice**: Invoice files
- **Receipt**: Receipt files
- **Contract**: Contract documents

#### Media
For multimedia content:
- **Video**: Video files
- **Audio**: Audio files
- **Animation**: Animation and GIF files

#### Other
- **Icon**: Icons and small graphics
- **Other**: Miscellaneous files

### File Management Features

#### View and Browse
- **Grid Layout**: Files displayed in responsive grid
- **Image Preview**: Automatic preview for image files
- **File Information**: Display of file ID, type, and entity association
- **Color-coded Categories**: Visual categorization with color coding
- **Pagination**: Navigate through multiple pages of files

#### File Actions
- **Download**: Download files directly to local device
- **Copy URL**: Copy file URL to clipboard for sharing
- **Refresh**: Reload file list to see latest uploads

### Notifications
- **Smart Notifications**: Toast notifications for all actions
- **Error Handling**: Detailed error messages for troubleshooting
- **Success Feedback**: Confirmation messages for successful operations

## API Integration

### Upload Endpoint
- **URL**: `${baseUrl}/data`
- **Method**: POST
- **Content-Type**: multipart/form-data
- **Required Headers**:
  - `x-company-token`: Company authentication token
  - `x-server-api-key`: Server API key

### Get Files Endpoint
- **URL**: `${baseUrl}/data`
- **Method**: GET
- **Required Headers**:
  - `Accept`: application/json
  - `x-company-token`: Company authentication token
  - `x-server-api-key`: Server API key

### Download Endpoint
- **URL**: Extracted from file_url in response
- **Method**: GET
- **Response**: File blob for download

## Environment Configuration

Required environment variables in `.env`:
```env
VITE_API_BASE_URL_FILE_UPLOAD=https://cdn.apexdrive365.com/api
VITE_API_BASE_URL_X_COMPANY_TOKEN=your-company-token
VITE_API_BASE_URL_X_SERVER_API_KEY=your-server-api-key
```

## Technical Implementation

### Technologies Used
- **Frontend**: Vue 3 with TypeScript
- **HTTP Client**: Axios
- **UI Framework**: Tailwind CSS
- **State Management**: Pinia
- **File Handling**: Native HTML5 File API

### Key Components
- **FileApi Utility**: Handles all API communications
- **Notification System**: Global toast notifications
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Comprehensive error management

### Security Features
- **Authentication**: Token-based authentication
- **File Validation**: Client-side file type checking
- **Error Sanitization**: Safe error message handling

## Usage Tips

1. **Choose Appropriate File Types**: Select the most specific file type that matches your intended use
2. **Entity ID Management**: Use consistent Entity IDs to group related files
3. **File Organization**: Use the categorization system to keep files organized
4. **Error Troubleshooting**: Check notifications for detailed error messages
5. **Performance**: Upload multiple small files rather than single large files when possible

## Support

For issues or questions regarding the file upload system:
1. Check the browser console for detailed error logs
2. Verify environment variables are correctly configured
3. Ensure API endpoints are accessible
4. Check file size and type restrictions
