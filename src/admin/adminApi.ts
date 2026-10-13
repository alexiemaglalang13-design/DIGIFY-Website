// Admin API client service

export interface Inquiry {
  id: number;
  customerName: string;
  email: string;
  preferredDate: string;
  serviceOfInterest: string;
  packageSelected: string;
  promoCode: string | null;
  message: string;
  status: 'New' | 'Contacted' | 'Completed';
  submittedAt: string;
  notes?: string;
}

export interface AdminUser {
  username: string;
  email: string;
  role: string;
  displayName: string;
}

const TOKEN_KEY = 'digify_admin_auth_token';
const USER_KEY = 'digify_admin_user_data';

export const adminApi = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  setSession(token: string, user: AdminUser) {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearSession() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  },

  getCurrentUser(): AdminUser | null {
    const raw = localStorage.getItem(USER_KEY);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  async login(username: string, password: string): Promise<{ success: boolean; token: string; user: AdminUser }> {
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Login failed' }));
      throw new Error(err.error || 'Invalid administrator email or password.');
    }

    const data = await res.json();
    this.setSession(data.token, data.user);
    return data;
  },

  async verifyToken(): Promise<boolean> {
    const token = this.getToken();
    if (!token) return false;

    try {
      const res = await fetch('/api/admin/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        if (data.user) {
          localStorage.setItem(USER_KEY, JSON.stringify(data.user));
        }
        return true;
      }
      this.clearSession();
      return false;
    } catch {
      // Offline fallback: keep token if locally present
      return !!token;
    }
  },

  async logout(): Promise<void> {
    const token = this.getToken();
    if (token) {
      await fetch('/api/admin/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {});
    }
    this.clearSession();
  },

  async getInquiries(): Promise<Inquiry[]> {
    const token = this.getToken();
    if (!token) throw new Error('Unauthorized: No admin session found.');

    const res = await fetch('/api/inquiries', {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      if (res.status === 401) {
        this.clearSession();
        throw new Error('Session expired. Please log in again.');
      }
      throw new Error('Failed to retrieve customer inquiries.');
    }

    const data = await res.json();
    return data.inquiries || [];
  },

  async updateInquiryStatus(id: number, status: 'New' | 'Contacted' | 'Completed', notes?: string): Promise<Inquiry> {
    const token = this.getToken();
    if (!token) throw new Error('Unauthorized');

    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status, notes }),
    });

    if (!res.ok) throw new Error('Failed to update inquiry status.');
    const data = await res.json();
    return data.inquiry;
  },

  async deleteInquiry(id: number): Promise<void> {
    const token = this.getToken();
    if (!token) throw new Error('Unauthorized');

    const res = await fetch(`/api/inquiries/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Failed to delete inquiry record.');
  },

  async submitPublicInquiry(inquiryData: {
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    promoCode?: string;
  }): Promise<Inquiry> {
    const res = await fetch('/api/inquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inquiryData),
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ error: 'Submission failed' }));
      throw new Error(err.error || 'Failed to submit inquiry.');
    }

    const data = await res.json();
    return data.inquiry;
  },

  async updateService(id: number, updates: any): Promise<any> {
    const token = this.getToken();
    if (!token) throw new Error('Unauthorized');

    const res = await fetch(`/api/services/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!res.ok) throw new Error('Failed to update service.');
    return res.json();
  },

  async addService(serviceData: any): Promise<any> {
    const token = this.getToken();
    if (!token) throw new Error('Unauthorized');

    const res = await fetch('/api/services', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(serviceData),
    });

    if (!res.ok) throw new Error('Failed to add service package.');
    return res.json();
  },

  async deleteService(id: number): Promise<void> {
    const token = this.getToken();
    if (!token) throw new Error('Unauthorized');

    const res = await fetch(`/api/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!res.ok) throw new Error('Failed to delete service.');
  },
};
