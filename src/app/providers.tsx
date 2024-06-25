'use client'

import React from 'react';
import { Snackbar, Alert } from '@mui/material';
import { usePathname } from 'next/navigation';
import Navigation from '@/components/ui-components/navigation';

export const SnackbarContext = React.createContext({
    showSnackbar: (message: string, severity: 'success' | 'info' | 'warning' | 'error') => { },
});

export default function Providers({ children }: { children: React.ReactNode }) {

    const [snackbar, setSnackbar] = React.useState({
        open: false,
        message: '',
        severity: 'info' as 'success' | 'info' | 'warning' | 'error',
    });

    const showSnackbar = (message: string, severity: 'success' | 'info' | 'warning' | 'error') => {
        setSnackbar({ open: true, message, severity });
    };

    const handleCloseSnackbar = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    const pathname = usePathname();
    const isLoginPage = pathname === '/';
    const content = isLoginPage ? children : <Navigation>{children}</Navigation>;

    return (
        <SnackbarContext.Provider value={{ showSnackbar }}>
            {content}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </SnackbarContext.Provider>
    )
}
