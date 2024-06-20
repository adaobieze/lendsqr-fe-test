'use strict';

const apiUrl = '/api/api-routes';

type ApiResponse<T> = {
    success: boolean;
    data?: T;
    error?: string;
};

async function fetchData<T>(endpoint: string): Promise<T> {
    try {
        const response = await fetch(`${apiUrl}?endpoint=${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

async function createData<T>(endpoint: string, newData: any): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${apiUrl}?endpoint=${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: newData }),
        });

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error creating data:', error);
        throw error;
    }
}

async function updateData<T>(endpoint: string, resourceId: string, updatedData: any): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${apiUrl}?endpoint=${endpoint}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resourceId, data: updatedData }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error updating data:', error);
        throw error;
    }
}

async function deleteData<T>(endpoint: string, resourceId: string): Promise<ApiResponse<T>> {
    try {
        const response = await fetch(`${apiUrl}?endpoint=${endpoint}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ resourceId }),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error deleting data:', error);
        throw error;
    }
}

export { fetchData, createData, updateData, deleteData };
