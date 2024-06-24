import { renderHook, act } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useUserStore } from '@/hooks/userStore';
import { login as apiLogin, logout as apiLogout, getAuthToken } from '@/utils/api';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/userStore', () => ({
  useUserStore: jest.fn(),
}));

jest.mock('@/utils/api', () => ({
  login: jest.fn(),
  logout: jest.fn(),
  getAuthToken: jest.fn(),
}));

describe('useAuth', () => {
  const mockPush = jest.fn();
  const mockLogin = jest.fn();
  const mockLogout = jest.fn();
  const mockSetLoggedInFromToken = jest.fn();

  const userStoreMock = {
    user: null,
    isLoggedIn: false,
    login: mockLogin,
    logout: mockLogout,
    setLoggedInFromToken: mockSetLoggedInFromToken,
  };

  beforeEach(() => {
    (useRouter as unknown as jest.Mock).mockReturnValue({ push: mockPush });
    (useUserStore as unknown as jest.Mock).mockReturnValue(userStoreMock);

    jest.clearAllMocks();
  });

  test('should rehydrate auth on mount', () => {
    (getAuthToken as jest.Mock).mockReturnValue('token');

    renderHook(() => useAuth());

    expect(getAuthToken).toHaveBeenCalled();
    expect(mockSetLoggedInFromToken).toHaveBeenCalled();
  });

  test('login function should authenticate user and redirect to dashboard', async () => {
    const user = { id: '1', email: 'test@example.com', firstName: 'Test', lastName: 'User', profilePhoto: 'photo.jpg' };
    (apiLogin as jest.Mock).mockResolvedValue({ success: true, data: { user } });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.login('test@example.com', 'password');
    });

    expect(apiLogin).toHaveBeenCalledWith('test@example.com', 'password');
    expect(mockLogin).toHaveBeenCalledWith(user);
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  test('login function should handle errors', async () => {
    (apiLogin as jest.Mock).mockResolvedValue({ success: false, error: 'Invalid credentials' });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await expect(result.current.login('test@example.com', 'password')).rejects.toThrow('Invalid credentials');
    });

    expect(apiLogin).toHaveBeenCalledWith('test@example.com', 'password');
    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  test('logout function should logout user and redirect to login', () => {
    const { result } = renderHook(() => useAuth());

    act(() => {
      result.current.logout();
    });

    expect(apiLogout).toHaveBeenCalled();
    expect(mockLogout).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });
});
