import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner = () => (
    <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            zIndex: 9999,
        }}
    >
        <CircularProgress />
    </Box>
);

export default LoadingSpinner;