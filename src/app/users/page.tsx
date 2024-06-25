'use client'

import React from 'react';
import { useUserDashboardMetrics } from '@/hooks/useUserDashboardMetrics';
import MetricCard from '@/components/ui-components/metricCard';
import UsersTable from '@/components/usersTable';
import { useFetchUsers } from '@/hooks/useUsers';
import { CircularProgress } from '@mui/material';
import styles from '@/styles/pages/usersPage.module.scss';

export default function Users() {
    const { userDashboardMetrics, isLoading: metricsLoading, isError: metricsError } = useUserDashboardMetrics();
    const { users, isLoading: usersLoading, isError: usersError } = useFetchUsers();

    if (metricsLoading || usersLoading) {
        return <div className={styles.loadingContainer}><CircularProgress /></div>
    }

    const usersArray = Array.isArray(users) ? users : [];

    return (
        <div className={styles.usersPage}>
            <p className={styles.usersPageTitle}>
                Users
            </p>
            <div className={styles.usersPageMetricsGrid}>
                <MetricCard
                    label='Users'
                    value={userDashboardMetrics?.allUsers}
                    icon='users-line'
                    color={'223, 24, 255'}
                />
                <MetricCard
                    label='Active Users'
                    value={userDashboardMetrics?.activeUsers}
                    icon='active-users-line'
                    color={'87, 24, 255'}
                />
                <MetricCard
                    label='Users With Loans'
                    value={userDashboardMetrics?.usersWithLoans}
                    icon='loan-line'
                    color={'245, 95, 68'}
                />
                <MetricCard
                    label='Users With Savings'
                    value={userDashboardMetrics?.usersWithSavings}
                    icon='money-line'
                    color={'255, 51, 102'}
                />
            </div>
            <div className={styles.usersPageUsersTableContainer}>
                <UsersTable table_data={usersArray} />
            </div>
        </div>
    );
};
