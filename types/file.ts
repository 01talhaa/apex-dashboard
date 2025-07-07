// types/file.ts
export interface FileItem {
  id: number;
  entity_id: string;
  file_url: string;
  file_type: string;
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
