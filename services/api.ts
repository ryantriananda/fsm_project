const API_BASE = 'http://localhost:8080/api';

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${endpoint}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) throw new Error(`API Error: ${res.status}`);
  return res.json();
}

// Vehicles
export const vehicleApi = {
  getAll: () => request<any[]>('/vehicles'),
  getById: (id: number) => request<any>(`/vehicles/${id}`),
  create: (data: any) => request<any>('/vehicles', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => request<any>(`/vehicles/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/vehicles/${id}`, { method: 'DELETE' }),
};

// Services
export const serviceApi = {
  getAll: () => request<any[]>('/services'),
  getById: (id: number) => request<any>(`/services/${id}`),
  create: (data: any) => request<any>('/services', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => request<any>(`/services/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/services/${id}`, { method: 'DELETE' }),
};

// Mutations
export const mutationApi = {
  getAll: () => request<any[]>('/mutations'),
  getById: (id: number) => request<any>(`/mutations/${id}`),
  create: (data: any) => request<any>('/mutations', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => request<any>(`/mutations/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/mutations/${id}`, { method: 'DELETE' }),
};

// Sales
export const salesApi = {
  getAll: () => request<any[]>('/sales'),
  getById: (id: number) => request<any>(`/sales/${id}`),
  create: (data: any) => request<any>('/sales', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => request<any>(`/sales/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/sales/${id}`, { method: 'DELETE' }),
};

// Contracts
export const contractApi = {
  getAll: () => request<any[]>('/contracts'),
  getById: (id: number) => request<any>(`/contracts/${id}`),
  create: (data: any) => request<any>('/contracts', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => request<any>(`/contracts/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/contracts/${id}`, { method: 'DELETE' }),
};

// Master Vendors
export const masterVendorApi = {
  getAll: () => request<any[]>('/master-vendors'),
  getById: (id: number) => request<any>(`/master-vendors/${id}`),
  create: (data: any) => request<any>('/master-vendors', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => request<any>(`/master-vendors/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/master-vendors/${id}`, { method: 'DELETE' }),
};

// General Masters (dynamic categories)
export const masterApi = {
  getByCategory: (category: string) => request<any[]>(`/masters/${encodeURIComponent(category)}`),
  create: (category: string, data: any) => request<any>(`/masters/${encodeURIComponent(category)}`, { method: 'POST', body: JSON.stringify(data) }),
  update: (category: string, id: number, data: any) => request<any>(`/masters/${encodeURIComponent(category)}/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (category: string, id: number) => request<void>(`/masters/${encodeURIComponent(category)}/${id}`, { method: 'DELETE' }),
};

// Assets (ATK/ARK)
export const assetApi = {
  getAll: (type?: string) => request<any[]>(`/assets${type ? `?type=${type}` : ''}`),
  create: (data: any) => request<any>('/assets', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => request<any>(`/assets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/assets/${id}`, { method: 'DELETE' }),
};

// Master Items
export const masterItemApi = {
  getAll: (type?: string) => request<any[]>(`/master-items${type ? `?type=${type}` : ''}`),
  create: (data: any) => request<any>('/master-items', { method: 'POST', body: JSON.stringify(data) }),
  update: (id: number, data: any) => request<any>(`/master-items/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (id: number) => request<void>(`/master-items/${id}`, { method: 'DELETE' }),
};
