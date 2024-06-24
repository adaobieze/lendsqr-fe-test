import { login, logout, getAuthToken, fetchData, createData, updateData, deleteData } from '@/utils/api';
import Cookies from 'js-cookie';

jest.mock('js-cookie');

global.fetch = jest.fn();

describe('API functions', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('login', () => {
        it('should login successfully', async () => {
            const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({ success: true, data: { token: 'test-token', user: { id: 1 } } }) };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    
            const result = await login('test@example.com', 'password');
    
            expect(global.fetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
            expect(Cookies.set).toHaveBeenCalledWith('authToken', 'test-token', { expires: 1 });
            expect(result).toEqual({ success: true, data: { token: 'test-token', user: { id: 1 } } });
        });
    
        it('should throw an error when login fails', async () => {
            const mockResponse = { ok: false, json: jest.fn().mockResolvedValue({ error: 'Invalid credentials' }) };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    
            await expect(login('test@example.com', 'wrong-password')).rejects.toThrow('Invalid credentials');
        });
    
        it('should throw a generic error when no specific error is provided', async () => {
            const mockResponse = { ok: false, json: jest.fn().mockResolvedValue({}) };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    
            await expect(login('test@example.com', 'wrong-password')).rejects.toThrow('Login failed');
        });
    });

    describe('logout', () => {
        it('should remove the authToken cookie', () => {
            logout();
            expect(Cookies.remove).toHaveBeenCalledWith('authToken');
        });
    });

    describe('getAuthToken', () => {
        it('should return the authToken from cookies', () => {
            (Cookies.get as jest.Mock).mockReturnValue('test-token');
            const token = getAuthToken();
            expect(token).toBe('test-token');
        });
    });

    describe('fetchData', () => {
        it('should fetch data successfully', async () => {
            const mockResponse = { ok: true, json: jest.fn().mockResolvedValue({ data: 'test data' }) };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    
            const result = await fetchData('test-endpoint');
    
            expect(global.fetch).toHaveBeenCalledWith('/api/api-routes?endpoint=test-endpoint', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            });
            expect(result).toBe('test data');
        });
    
        it('should throw an error when fetch fails', async () => {
            const mockResponse = { ok: false, json: jest.fn().mockResolvedValue({ error: 'Fetch failed' }) };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    
            await expect(fetchData('test-endpoint')).rejects.toThrow('Network response was not ok');
        });
    });

    describe('createData', () => {
        it('should create data successfully', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ data: 'created data' }) };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            const newData = { name: 'Test' };
            const result = await createData('test-endpoint', newData);

            expect(global.fetch).toHaveBeenCalledWith('/api/api-routes?endpoint=test-endpoint', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ data: newData }),
            });
            expect(result).toEqual({ data: 'created data' });
        });
    });

    describe('updateData', () => {
        it('should update data successfully', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ data: 'updated data' }) };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            const updatedData = { name: 'Updated Test' };
            const result = await updateData('test-endpoint', '123', updatedData);

            expect(global.fetch).toHaveBeenCalledWith('/api/api-routes?endpoint=test-endpoint', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resourceId: '123', data: updatedData }),
            });
            expect(result).toEqual({ data: 'updated data' });
        });
    });

    describe('deleteData', () => {
        it('should delete data successfully', async () => {
            const mockResponse = { json: jest.fn().mockResolvedValue({ success: true }) };
            (global.fetch as jest.Mock).mockResolvedValue(mockResponse);

            const result = await deleteData('test-endpoint', '123');

            expect(global.fetch).toHaveBeenCalledWith('/api/api-routes?endpoint=test-endpoint', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ resourceId: '123' }),
            });
            expect(result).toEqual({ success: true });
        });
    });
});