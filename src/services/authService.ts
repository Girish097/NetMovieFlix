import type { User, SignupData, LoginData } from '../types';

const STORAGE_KEY = 'movieflix_users';
const SESSION_KEY = 'movieflix_session';

// Get all users from localStorage
const getUsers = (): User[] => {
  const users = localStorage.getItem(STORAGE_KEY);
  return users ? JSON.parse(users) : [];
};

// Save users to localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
};

// Get current session
export const getSession = (): User | null => {
  const session = localStorage.getItem(SESSION_KEY);
  return session ? JSON.parse(session) : null;
};

// Set session
const setSession = (user: User): void => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

// Clear session
export const clearSession = (): void => {
  localStorage.removeItem(SESSION_KEY);
};

// Signup service
export const signup = async (data: SignupData): Promise<User> => {
  // Validate passwords match
  if (data.password !== data.confirmPassword) {
    throw new Error('Passwords do not match');
  }

  // Validate password length
  if (data.password.length < 6) {
    throw new Error('Password must be at least 6 characters');
  }

  const users = getUsers();

  // Check if user already exists
  const existingUser = users.find((u) => u.email === data.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  // Create new user
  const newUser: User = {
    id: Date.now().toString(),
    name: data.name,
    email: data.email,
  };

  // Save user
  users.push(newUser);
  saveUsers(users);

  // Also store password (in real app, this would be hashed)
  const userPasswords = JSON.parse(localStorage.getItem('movieflix_passwords') || '{}');
  userPasswords[data.email] = data.password;
  localStorage.setItem('movieflix_passwords', JSON.stringify(userPasswords));

  return newUser;
};

// Login service
export const login = async (data: LoginData): Promise<User> => {
  const users = getUsers();
  const userPasswords = JSON.parse(localStorage.getItem('movieflix_passwords') || '{}');

  // Find user
  const user = users.find((u) => u.email === data.email);
  if (!user) {
    throw new Error('Invalid email or password');
  }

  // Check password
  if (userPasswords[data.email] !== data.password) {
    throw new Error('Invalid email or password');
  }

  // Set session
  setSession(user);

  return user;
};

// Logout service
export const logout = (): void => {
  clearSession();
};
