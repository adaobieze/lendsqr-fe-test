import { login, logout, getAuthToken, fetchData, createData, updateData, deleteData } from '@/utils/api';
import Cookies from 'js-cookie';

jest.mock('js-cookie');

global.fetch = jest.fn();

describe('API Utility Functions', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('login', () => {
        it('should login successfully and set auth token', async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({
                    success: true,
                    data: {
                        token: 'test-token',
                        user: { id: '1', email: 'test@example.com' }
                    }
                })
            };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            const result = await login('test@example.com', 'password123');

            expect(global.fetch).toHaveBeenCalledWith('/api/api?endpoint=login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: 'test@example.com', password: 'password123' })
            });
            expect(Cookies.set).toHaveBeenCalledWith('authToken', 'test-token', { expires: 1 });
            expect(result).toEqual({
                success: true,
                data: {
                    token: 'test-token',
                    user: { id: '1', email: 'test@example.com' }
                }
            });
        });

        it('should throw an error when login fails', async () => {
            const mockResponse = {
                ok: false,
                json: jest.fn().mockResolvedValue({
                    success: false,
                    error: 'Invalid credentials'
                })
            };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            await expect(login('wrong@example.com', 'wrongpassword')).rejects.toThrow('Invalid credentials');
        });
    });

    describe('logout', () => {
        it('should remove the auth token', () => {
            logout();
            expect(Cookies.remove).toHaveBeenCalledWith('authToken');
        });
    });

    describe('getAuthToken', () => {
        it('should return the auth token', () => {
            (Cookies.get as jest.Mock).mockReturnValue('test-token');
            const token = getAuthToken();
            expect(token).toBe('test-token');
        });
    });

    describe('fetchData', () => {
        it('should fetch data successfully', async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({
                    data: [{ id: '1', name: 'Test Item' }]
                })
            };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            const result = await fetchData('testEndpoint');

            expect(global.fetch).toHaveBeenCalledWith('/api/api?endpoint=testEndpoint', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });
            expect(result).toEqual([{ id: '1', name: 'Test Item' }]);
        });

        it('should throw an error when fetch fails', async () => {
            const mockResponse = {
                ok: false
            };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            await expect(fetchData('testEndpoint')).rejects.toThrow('Network response was not ok');
        });
    });

    describe('createData', () => {
        it('should create data successfully', async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({
                    status: 201,
                    data: { id: '2', name: 'New Item' }
                })
            };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            const result = await createData('testEndpoint', { name: 'New Item' });

            expect(global.fetch).toHaveBeenCalledWith('/api/api?endpoint=testEndpoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: { name: 'New Item' } })
            });
            expect(result).toEqual({
                status: 201,
                data: { id: '2', name: 'New Item' }
            });
        });
    });

    describe('updateData', () => {
        it('should update data successfully', async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({
                    message: 'Resource updated successfully'
                })
            };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            const result = await updateData('testEndpoint', '1', { name: 'Updated Item' });

            expect(global.fetch).toHaveBeenCalledWith('/api/api?endpoint=testEndpoint', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resourceId: '1', data: { name: 'Updated Item' } })
            });
            expect(result).toEqual({
                message: 'Resource updated successfully'
            });
        });
    });

    describe('deleteData', () => {
        it('should delete data successfully', async () => {
            const mockResponse = {
                ok: true,
                json: jest.fn().mockResolvedValue({
                    message: 'Resource deleted successfully'
                })
            };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            const result = await deleteData('testEndpoint', '1');

            expect(global.fetch).toHaveBeenCalledWith('/api/api?endpoint=testEndpoint', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resourceId: '1' })
            });
            expect(result).toEqual({
                message: 'Resource deleted successfully'
            });
        });
    });
});