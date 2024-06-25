'use client'

import useSWR from 'swr';
import { fetchData } from '@/utils/api';
import { Notification } from '@/lib/types';

export const useFetchNotifications = () => {
  const { data, error, mutate } = useSWR<Notification>('notifications', fetchData<Notification>);

  return {
    notifications: data,
    isLoading: !error && !data,
    isError: !!error,
    refetch: mutate
  };
};

