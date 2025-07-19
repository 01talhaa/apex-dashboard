import axios from 'axios'
import type { FileListResponse } from '@/types/file'

// File API configuration using environment variables
const fileApiConfig = {
  baseURL: import.meta.env.VITE_API_BASE_URL_FILE_UPLOAD || 'http://cdn.apexdrive365.com/api',
  companyToken: import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN,
  serverApiKey: import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY,
}

// Debug function to check environment variables
export const debugApiConfig = () => {
  console.log('Environment variables check:', {
    VITE_API_BASE_URL_FILE_UPLOAD: import.meta.env.VITE_API_BASE_URL_FILE_UPLOAD,
    VITE_API_BASE_URL_X_COMPANY_TOKEN: import.meta.env.VITE_API_BASE_URL_X_COMPANY_TOKEN ? 'Present' : 'Missing',
    VITE_API_BASE_URL_X_SERVER_API_KEY: import.meta.env.VITE_API_BASE_URL_X_SERVER_API_KEY ? 'Present' : 'Missing',
    fileApiConfig: {
      baseURL: fileApiConfig.baseURL,
      companyToken: fileApiConfig.companyToken ? 'Present' : 'Missing',
      serverApiKey: fileApiConfig.serverApiKey ? 'Present' : 'Missing',
    }
  });
}

// Create file API instance
const fileApi = axios.create({
  baseURL: fileApiConfig.baseURL,
  timeout: 30000, // 30 second timeout for file uploads
  headers: {
    'Accept': 'application/json',
  }
})

// Alternative API instance using HTTPS
const httpsFileApi = axios.create({
  baseURL: fileApiConfig.baseURL.replace('http://', 'https://'),
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  }
})

// Alternative API instance using main API URL (fallback)
const mainApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 30000,
  headers: {
    'Accept': 'application/json',
  }
})

// Upload files
export const uploadFiles = async (files: File[], fileType: string, entityId: string) => {
  // Debug logging
  console.log('Upload config:', {
    baseURL: fileApiConfig.baseURL,
    companyToken: fileApiConfig.companyToken ? 'Present' : 'Missing',
    serverApiKey: fileApiConfig.serverApiKey ? 'Present' : 'Missing',
    filesCount: files.length,
    fileType,
    entityId
  });

  if (!fileApiConfig.baseURL) {
    throw new Error('File API base URL is not configured. Please check VITE_API_BASE_URL_FILE_UPLOAD environment variable.');
  }

  if (!fileApiConfig.companyToken) {
    throw new Error('Company token is not configured. Please check VITE_API_BASE_URL_X_COMPANY_TOKEN environment variable.');
  }

  if (!fileApiConfig.serverApiKey) {
    throw new Error('Server API key is not configured. Please check VITE_API_BASE_URL_X_SERVER_API_KEY environment variable.');
  }

  const formData = new FormData()
  
  // Add each file to the form data with the correct field name
  files.forEach((file, index) => {
    formData.append('files[]', file)
    console.log(`File ${index + 1}: ${file.name} (${file.size} bytes, ${file.type})`);
  })
  
  formData.append('file_type', fileType)
  formData.append('entity_id', entityId)

  // Log form data contents
  console.log('FormData contents:');
  for (let [key, value] of formData.entries()) {
    if (value instanceof File) {
      console.log(`${key}: File(${value.name}, ${value.size} bytes)`);
    } else {
      console.log(`${key}: ${value}`);
    }
  }

  // Headers for the request - removed Content-Type to let browser set it with boundary
  const headers = {
    'x-company-token': fileApiConfig.companyToken,
    'x-server-api-key': fileApiConfig.serverApiKey,
  }

  console.log('Request headers:', headers);

  try {
    // First, try a simple GET request to check if the API is reachable
    console.log('Testing API connectivity first...');
    const testResponse = await axios.get(`${fileApiConfig.baseURL}/health`, {
      headers: {
        'x-company-token': fileApiConfig.companyToken,
        'x-server-api-key': fileApiConfig.serverApiKey,
      },
      timeout: 10000
    }).catch(() => {
      console.log('Health check endpoint not available, continuing with upload...');
    });

    // Try multiple endpoints for upload
    const uploadEndpoints = ['/data', '/upload', '/files', '/file-upload'];
    
    for (const endpoint of uploadEndpoints) {
      try {
        console.log(`Trying upload to: ${fileApiConfig.baseURL}${endpoint}`);
        const response = await fileApi.post(endpoint, formData, { 
          headers,
          timeout: 60000, // 60 second timeout for large files
        });
        console.log('Upload successful:', response.data);
        console.log('Response status:', response.status);
        return response.data;
      } catch (endpointError: any) {
        console.log(`${endpoint} failed with status:`, endpointError.response?.status);
        if (endpointError.response?.status !== 404) {
          // If it's not a 404, this might be the right endpoint but with a different error
          console.log(`${endpoint} error details:`, endpointError.response?.data);
        }
        continue;
      }
    }

    // If file API completely failed, try HTTPS version
    console.log('Trying HTTPS file API...');
    const httpsResponse = await httpsFileApi.post('/data', formData, { 
      headers,
      timeout: 60000,
    });
    console.log('HTTPS upload successful:', httpsResponse.data);
    return httpsResponse.data;
    
  } catch (httpsError: any) {
    console.log('HTTPS file API also failed:', httpsError);
    
    try {
      // Fallback to main API
      console.log('Trying main API upload to:', import.meta.env.VITE_API_BASE_URL + '/data');
      const response = await mainApi.post('/data', formData, { 
        headers,
        timeout: 60000,
      })
      console.log('Upload successful via main API:', response.data);
      console.log('Main API response status:', response.status);
      return response.data
    } catch (mainApiError: any) {
      console.error('All APIs failed:', { httpsError, mainApiError });
      console.log('Main API error response:', mainApiError.response?.data);
      console.log('Main API error status:', mainApiError.response?.status);
      
      const error = mainApiError.response ? mainApiError : httpsError;
      
      if (error.response?.status === 401) {
        throw new Error('Authentication failed. Please check your API credentials.')
      } else if (error.response?.status === 403) {
        throw new Error('Access denied. You do not have permission to upload files.')
      } else if (error.response?.status === 413) {
        throw new Error('File size too large. Please choose smaller files.')
      } else if (error.response?.status === 415) {
        throw new Error('Unsupported file type. Please choose a different file.')
      } else if (error.response?.status >= 500) {
        throw new Error('Server error. Please try again later.')
      } else if (error.request) {
        throw new Error('Network error. Please check your internet connection and API URL.')
      } else {
        throw new Error(error.message || 'An unexpected error occurred during upload.')
      }
    }
  }
}

// Get files list
export const getFiles = async (page: number = 1, limit: number = 10): Promise<FileListResponse> => {
  console.log('Get files config:', {
    baseURL: fileApiConfig.baseURL,
    companyToken: fileApiConfig.companyToken ? 'Present' : 'Missing',
    serverApiKey: fileApiConfig.serverApiKey ? 'Present' : 'Missing',
    page,
    limit
  });

  const headers = {
    'Accept': 'application/json',
    'x-company-token': fileApiConfig.companyToken,
    'x-server-api-key': fileApiConfig.serverApiKey,
  }

  const params = { page, limit }

  try {
    // Try file API first (HTTP)
    console.log('Trying file API get from:', fileApiConfig.baseURL + '/data');
    const response = await fileApi.get('/data', { headers, params })
    console.log('Get files successful:', response.data);
    
    const data = response.data
    return {
      meta: {
        page: data.meta?.page || page,
        limit: data.meta?.limit || limit,
        total: data.meta?.total || 0,
        totalPage: data.meta?.totalPage || 0,
      },
      result: Array.isArray(data.result) ? data.result : [],
    }
  } catch (fileApiError: any) {
    console.log('File API (HTTP) failed:', fileApiError.response?.status, fileApiError.message);
    console.log('File API error response:', fileApiError.response?.data);
    
    try {
      // Try HTTPS file API
      console.log('Trying HTTPS file API get from:', fileApiConfig.baseURL.replace('http://', 'https://') + '/data');
      const response = await httpsFileApi.get('/data', { headers, params })
      console.log('Get files successful via HTTPS file API:', response.data);
      
      const data = response.data
      return {
        meta: {
          page: data.meta?.page || page,
          limit: data.meta?.limit || limit,
          total: data.meta?.total || 0,
          totalPage: data.meta?.totalPage || 0,
        },
        result: Array.isArray(data.result) ? data.result : [],
      }
    } catch (httpsFileApiError: any) {
      console.log('HTTPS File API failed:', httpsFileApiError.response?.status, httpsFileApiError.message);
      
      try {
        // Fallback to main API
        console.log('Trying main API get from:', import.meta.env.VITE_API_BASE_URL + '/data');
        const response = await mainApi.get('/data', { headers, params })
        console.log('Get files successful via main API:', response.data);
        
        const data = response.data
        return {
          meta: {
            page: data.meta?.page || page,
            limit: data.meta?.limit || limit,
            total: data.meta?.total || 0,
            totalPage: data.meta?.totalPage || 0,
          },
          result: Array.isArray(data.result) ? data.result : [],
        }
      } catch (mainApiError: any) {
        console.error('All file get APIs failed:', { fileApiError, httpsFileApiError, mainApiError });
        
        const error = mainApiError.response ? mainApiError : httpsFileApiError.response ? httpsFileApiError : fileApiError;
        
        // Provide more specific error messages
        if (error.response?.status === 401) {
          throw new Error('Authentication failed. Please check your API credentials.')
        } else if (error.response?.status === 403) {
          throw new Error('Access denied. You do not have permission to access files.')
        } else if (error.response?.status === 404) {
          throw new Error('Files endpoint not found. Please check the API URL.')
        } else if (error.response?.status >= 500) {
          throw new Error('Server error. Please try again later.')
        } else if (error.request) {
          throw new Error('Network error. Please check your internet connection and API URL.')
        } else {
          throw new Error(error.message || 'An unexpected error occurred while loading files.')
        }
      }
    }
  }
}

// Get single file (download)
export const downloadFile = async (fileUrlPath: string): Promise<Blob> => {
  try {
    // Extract the path after /data/get/ from the full URL
    const pathMatch = fileUrlPath.match(/\/data\/get\/(.+)/)
    if (!pathMatch) {
      throw new Error('Invalid file URL format')
    }
    
    const response = await fileApi.get(`/data/get/${pathMatch[1]}`, {
      responseType: 'blob',
    })
    return response.data
  } catch (error: any) {
    console.error('Download file error:', error)
    if (error.response) {
      throw new Error(`Download failed: ${error.response.data?.message || error.response.statusText}`)
    } else if (error.request) {
      throw new Error('Download failed: No response from server')
    } else {
      throw new Error(`Download failed: ${error.message}`)
    }
  }
}

// Helper function to create download link
export const createDownloadLink = (blob: Blob, filename: string): void => {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
}
