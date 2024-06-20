import { renderHook, act } from '@testing-library/react';
import { useFetchTestData, useCreateTestData, useUpdateTestData, useDeleteTestData } from '@/hooks/useTest';
import { fetchData, createData, updateData, deleteData } from '@/utils/api';
import useSWR from 'swr';

jest.mock('@/utils/api');
jest.mock('swr');

describe('Test Data Hooks', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    describe('useFetchTestData', () => {
        it('should fetch data successfully', async () => {
            (useSWR as jest.Mock).mockImplementation((key, fetcher) => {
                fetcher();
                return {
                    data: { data: 'test data' },
                    error: null,
                    mutate: jest.fn(),
                };
            });

            const { result } = renderHook(() => useFetchTestData());

            expect(result.current.isLoading).toBe(false);
            expect(result.current.testData).toEqual({ data: 'test data' });
            expect(result.current.isError).toBe(false);

            expect(fetchData).toHaveBeenCalled();
        });

        it('should handle fetch error', async () => {
            (useSWR as jest.Mock).mockImplementation((key, fetcher) => {
                fetcher();
                return {
                    data: undefined,
                    error: new Error('Fetch failed'),
                    mutate: jest.fn(),
                };
            });

            const { result } = renderHook(() => useFetchTestData());

            expect(result.current.isLoading).toBe(false);
            expect(result.current.isError).toBe(true);
            expect(result.current.testData).toBeUndefined();

            expect(fetchData).toHaveBeenCalled();
        });
    });

    describe('useCreateTestData', () => {
        it('should create data successfully', async () => {
            (createData as jest.Mock).mockResolvedValue({ data: 'created data' });

            const { result } = renderHook(() => useCreateTestData());

            await act(async () => {
                const createdData = await result.current.create({ name: 'New Test' });
                expect(createdData).toEqual({ data: 'created data' });
            });

            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(null);
        });

        it('should handle create error', async () => {
            const error = new Error('Create failed');
            (createData as jest.Mock).mockRejectedValue(error);

            const { result } = renderHook(() => useCreateTestData());

            await act(async () => {
                try {
                    await result.current.create({ name: 'New Test' });
                } catch (e) {
                    expect(e).toBe(error);
                }
            });

            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(error);
        });
    });

    describe('useUpdateTestData', () => {
        it('should update data successfully', async () => {
            (updateData as jest.Mock).mockResolvedValue({ data: 'updated data' });

            const { result } = renderHook(() => useUpdateTestData());

            await act(async () => {
                const updatedData = await result.current.update('123', { name: 'Updated Test' });
                expect(updatedData).toEqual({ data: 'updated data' });
            });

            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(null);
        });

        it('should handle update error', async () => {
            const error = new Error('Update failed');
            (updateData as jest.Mock).mockRejectedValue(error);

            const { result } = renderHook(() => useUpdateTestData());

            await act(async () => {
                try {
                    await result.current.update('123', { name: 'Updated Test' });
                } catch (e) {
                    expect(e).toBe(error);
                }
            });

            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(error);
        });
    });

    describe('useDeleteTestData', () => {
        it('should delete data successfully', async () => {
            (deleteData as jest.Mock).mockResolvedValue({ success: true });

            const { result } = renderHook(() => useDeleteTestData());

            await act(async () => {
                const deleteResult = await result.current.remove('123');
                expect(deleteResult).toEqual({ success: true });
            });

            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(null);
        });

        it('should handle delete error', async () => {
            const error = new Error('Delete failed');
            (deleteData as jest.Mock).mockRejectedValue(error);

            const { result } = renderHook(() => useDeleteTestData());

            await act(async () => {
                try {
                    await result.current.remove('123');
                } catch (e) {
                    expect(e).toBe(error);
                }
            });

            expect(result.current.isLoading).toBe(false);
            expect(result.current.error).toBe(error);
        });
    });
});
