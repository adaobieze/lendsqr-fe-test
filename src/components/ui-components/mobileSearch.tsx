'use client'

import React, { useState } from 'react';
import { IconButton, Dialog, DialogContent, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';
import styles from '@/styles/components/mobileSearch.module.scss';

export default function MobileSearch() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <IconButton onClick={handleOpen} className={styles.searchIcon}>
                <Search style={{color: '#213F7D'}}/>
            </IconButton>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogContent className={styles.dialogContent}>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="search"
                        placeholder="Search for anything"
                        type="text"
                        fullWidth
                        variant="outlined"
                        className={styles.searchInput}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleClose}
                        className={styles.searchButton}
                    >
                        Search
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    );
}