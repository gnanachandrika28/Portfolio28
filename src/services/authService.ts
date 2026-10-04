import { AdminUser } from '../types/cms';

const AUTH_STORAGE_KEY = 'gnana_chandrika_portfolio_admin_auth';
const CREDENTIALS_KEY = 'gnana_chandrika_portfolio_admin_creds';

// Default initial admin credentials
const DEFAULT_ADMIN = {
  email: 'gnanignani989@gmail.com',
  // Default password for portfolio owner
  password: 'admin@gc2026',
  name: 'Gnana Chandrika Boya',
};

class AuthService {
  private currentUser: AdminUser | null = null;
  private listeners: Set<(user: AdminUser | null) => void> = new Set();

  constructor() {
    this.initCredentials();
    this.currentUser = this.loadSession();
  }

  private initCredentials() {
    if (!localStorage.getItem(CREDENTIALS_KEY)) {
      localStorage.setItem(
        CREDENTIALS_KEY,
        JSON.stringify({
          email: DEFAULT_ADMIN.email,
          password: DEFAULT_ADMIN.password,
          name: DEFAULT_ADMIN.name,
        })
      );
    }
  }

  private getStoredCredentials() {
    try {
      const data = localStorage.getItem(CREDENTIALS_KEY);
      if (data) return JSON.parse(data);
    } catch (e) {
      console.error('Error reading stored credentials', e);
    }
    return DEFAULT_ADMIN;
  }

  private loadSession(): AdminUser | null {
    try {
      const sessionStr = localStorage.getItem(AUTH_STORAGE_KEY);
      if (sessionStr) {
        const session = JSON.parse(sessionStr);
        // Validate session structure and expiry (e.g., 7 days)
        if (session && session.user && session.expiresAt > Date.now()) {
          return session.user;
        }
      }
    } catch (e) {
      console.error('Failed to load admin session', e);
    }
    return null;
  }

  public subscribe(listener: (user: AdminUser | null) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.currentUser);
      } catch (err) {
        console.error('Auth listener error:', err);
      }
    });
  }

  public async login(email: string, password: string): Promise<AdminUser> {
    // Artificial latency for security feel & loading states
    await new Promise((resolve) => setTimeout(resolve, 600));

    const creds = this.getStoredCredentials();
    const cleanEmail = email.trim().toLowerCase();
    const expectedEmail = creds.email.trim().toLowerCase();

    if (cleanEmail !== expectedEmail) {
      throw new Error('Invalid email address. Administrator credentials required.');
    }

    if (password !== creds.password) {
      throw new Error('Incorrect administrator password.');
    }

    const adminUser: AdminUser = {
      id: 'admin-gc-1',
      email: creds.email,
      name: creds.name || 'Gnana Chandrika Boya',
      role: 'admin',
      lastLogin: new Date().toISOString(),
    };

    const session = {
      user: adminUser,
      token: `adm_${Date.now()}_${Math.random().toString(36).substring(2)}`,
      expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
    this.currentUser = adminUser;
    this.notify();

    return adminUser;
  }

  public logout(): void {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    this.currentUser = null;
    this.notify();
  }

  public getCurrentUser(): AdminUser | null {
    return this.currentUser;
  }

  public isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  public async changePassword(oldPassword: string, newPassword: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 400));
    const creds = this.getStoredCredentials();

    if (oldPassword !== creds.password) {
      throw new Error('Current password is incorrect.');
    }

    if (!newPassword || newPassword.length < 6) {
      throw new Error('New password must be at least 6 characters.');
    }

    localStorage.setItem(
      CREDENTIALS_KEY,
      JSON.stringify({
        ...creds,
        password: newPassword,
      })
    );
  }
}

export const authService = new AuthService();
