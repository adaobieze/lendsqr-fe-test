'use client'
import React from 'react';
import withAuth from '@/middleware/withAuth';
import Header from './header';
import Sidebar from './sidebar';
import styles from '@/styles/components/navigation.module.scss';

interface NavigationProps {
    children: React.ReactNode;
}

function Navigation({ children }: NavigationProps) {
    return (
        <div className={styles.navigation}>
            <Header />
            <div className={styles.navigationContent}>
                <Sidebar/>
                <main className={styles.navigationMain}>
                    {children}
                </main>
            </div>
        </div>
    )
}

export default withAuth(Navigation);