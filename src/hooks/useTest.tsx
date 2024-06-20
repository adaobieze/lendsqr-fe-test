'use client'

import useSWR from 'swr';
import { fetchData, createData, updateData, deleteData } from '@/utils/api';
import { useEffect, useState } from 'react';

type ApiError = Error | unknown;

export const useFetchTestData = () => {
    const { data, error, mutate } = useSWR('testData', fetchData);

    return {
        testData: data,
        isLoading: !error && !data,
        isError: error ? true : false,
        refetch: mutate
    };
};

export const useCreateTestData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const create = async (newData: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await createData('testData', newData);
            setIsLoading(false);
            return result;
        } catch (err) {
            setError(err);
            setIsLoading(false);
            throw err;
        }
    };

    return { create, isLoading, error };
};

export const useUpdateTestData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const update = async (resourceId: string, updatedData: any) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await updateData('testData', resourceId, updatedData);
            setIsLoading(false);
            return result;
        } catch (err) {
            setError(err);
            setIsLoading(false);
            throw err;
        }
    };

    return { update, isLoading, error };
};

export const useDeleteTestData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<ApiError | null>(null);

    const remove = async (resourceId: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await deleteData('testData', resourceId);
            setIsLoading(false);
            return result;
        } catch (err) {
            setError(err);
            setIsLoading(false);
            throw err;
        }
    };

    return { remove, isLoading, error };
};