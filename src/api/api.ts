import { Page, PageParams, Pagination } from "@/interfaces";

import service from "./request";

function castPagination(page: Pagination): PageParams {
  return {
    page: page.page,
    size: page.rowsPerPage,
    sort_by: page.sortBy,
    desc: page.descending,
  };
}

const api = {
  async get<R>(url: string, params?: any): Promise<R> {
    return await service.get(url, { params });
  },
  async getPage<R>(url: string, page: Pagination, extra?: any): Promise<Page<R>> {
    const params = extra ? { ...castPagination(page), ...extra } : castPagination(page);
    return await service.get(url, { params });
  },
  async post<R>(url: string, data?: any): Promise<R> {
    return await service.post(url, data);
  },
  async postForm<R>(url: string, data?: any): Promise<R> {
    return await service.postForm(url, data);
  },
  async put<R>(url: string, data?: any): Promise<R> {
    return await service.put(url, data);
  },
  async putForm<R>(url: string, data?: any): Promise<R> {
    return await service.putForm(url, data);
  },
  async delete<R>(url: string, data?: any): Promise<R> {
    return await service.delete(url, data);
  },
  async deleteForm<R>(url: string, data?: any): Promise<R> {
    return await service.delete(url, data);
  },
};

export default api;
