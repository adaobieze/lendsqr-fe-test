'use client'

import useSWR from 'swr';
import { fetchData } from '@/utils/api';
import { UserDashboardMetrics } from '@/lib/types';

export const useUserDashboardMetrics = () => {
    const { data, error, mutate } = useSWR<UserDashboardMetrics>(
        'userDashboardMetrics',
        fetchData<UserDashboardMetrics>
    );

    return {
        userDashboardMetrics: data,
        isLoading: !error && !data,
        isError: !!error,
        refetch: mutate
    };
};
