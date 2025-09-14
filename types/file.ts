// types/file.ts
export interface FileItem {
  id: number;
  entity_id: string;
  file_url: string;
  file_type: string;
  file_name?: string;
  file_size?: number;
  mime_type?: string;
  created_at?: string;
  updated_at?: string;
}

export interface FileUploadResponse {
  success: boolean;
  message?: string;
  data?: any;
}

export interface FileListResponse {
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  result: FileItem[];
}

export interface FileUploadForm {
  fileType: string;
  entityId: string;
}

export interface FilePagination {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}
