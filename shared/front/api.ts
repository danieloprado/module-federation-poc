import axios, { AxiosError, Method } from 'axios';

import ApiError from './errors/api';
import { getState } from './state';
import { responseFormatter } from './utils/apiFormatter';

export async function get<T = any>(url: string, params?: any): Promise<T> {
  return request<T>('GET', url, params);
}

export async function post<T = any>(url: string, body: any): Promise<T> {
  return request<T>('POST', url, body);
}

export async function put<T = any>(url: string, body: any): Promise<T> {
  return request<T>('PUT', url, body);
}

export async function del<T = any>(url: string, params?: any): Promise<T> {
  return request<T>('DELETE', url, params);
}

export async function upload<T = any>(url: string, data: FormData, onProgress: (progress: number) => void): Promise<T> {
  return request<T>('POST', url, data, onProgress);
}

async function request<T = any>(
  method: Method,
  url: string,
  data?: any,
  onProgress?: (progress: number) => void
): Promise<T> {
  try {
    onProgress && onProgress(0);
    const authToken = getState().authToken;
    const apiEndpoint = getState().apiEndpoint;

    const request = axios.request({
      baseURL: apiEndpoint,
      url,
      method,
      headers: {
        Authorization: authToken ? `Bearer ${authToken}` : null,
        'Content-Type': data instanceof FormData ? 'multipart/form-data' : 'application/json'
      },
      params: method === 'GET' ? data : null,
      data: method === 'POST' || method === 'PUT' ? data : null,
      onUploadProgress: (progress: ProgressEvent) => {
        onProgress && onProgress((progress.loaded / progress.total) * 100);
      }
    });
    const response = await request;
    onProgress && onProgress(100);

    return responseFormatter<T>(response.data || {});
  } catch (err) {
    return handleError<T>(err);
  }
}

async function handleError<T>(err: AxiosError): Promise<T> {
  if (!err.config || !err.response) throw err;
  throw new ApiError(err.config, err.response, err);
}
