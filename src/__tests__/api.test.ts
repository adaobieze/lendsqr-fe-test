import { fetchData, createData, updateData, deleteData } from '@/utils/api';

global.fetch = jest.fn();

describe('API functions', () => {
    beforeEach(() => {
        jest.resetAllMocks();
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
            expect(result).toEqual({ data: 'test data' });
        });

        it('should throw an error when fetch fails', async () => {
            (global.fetch as jest.Mock).mockRejectedValue(new Error('Fetch failed'));

            await expect(fetchData('test-endpoint')).rejects.toThrow('Fetch failed');
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