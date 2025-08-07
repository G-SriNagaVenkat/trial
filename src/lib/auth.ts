// Simple session management for demo purposes
export interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  loginMethod?: 'email' | 'google';
}

const SESSION_KEY = 'careerlaunch_user';

export const authService = {
  // Get current user from localStorage
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(SESSION_KEY);
      return userStr ? JSON.parse(userStr) : null;
    } catch {
      return null;
    }
  },

  // Set user session
  setUser(user: User): void {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  },

  // Clear user session
  logout(): void {
    localStorage.removeItem(SESSION_KEY);
  },

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }
};