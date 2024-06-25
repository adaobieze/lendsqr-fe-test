'use client'

import useSWR from 'swr';
import { fetchData } from '@/utils/api';
import { User, UserDetails } from '@/lib/types';

export const useFetchUsers = () => {
    const { data, error, mutate } = useSWR<User>(
        'users',
        fetchData<User>
    );

    return {
        users: data,
        isLoading: !error && !data,
        isError: !!error,
        refetch: mutate
    };
};

export const useFetchUserDetails = () => {
    const { data, error, mutate } = useSWR<UserDetails>(
        'userDetails',
        fetchData<UserDetails>
    );

    return {
        userDetails: data,
        isLoading: !error && !data,
        isError: !!error,
        refetch: mutate
    };
};
