import React, { useState } from 'react';
import { Avatar, Menu, MenuItem, Button } from '@mui/material';
import ArrowDropDown from '@mui/icons-material/ArrowDropDown';
import { useUserStore } from '@/hooks/userStore';
import styles from '@/styles/components/userDetailsDropdown.module.scss';

export default function UserDetailsDropdown() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const { user } = useUserStore();

    const handleClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <Button
                onClick={handleClick}
                className={styles.userDropdownButton}
            >
                <div className={styles.userDropdownContent}>
                    <Avatar
                        alt="userImage"
                        src={user?.profilePhoto}
                        className={styles.userDropdownAvatar}
                    />
                    <p className={styles.userDropdownName}>
                        {user?.lastName}
                    </p>
                </div>
                <ArrowDropDown fontSize='medium' sx={{ color: '#213F7D' }} />
            </Button>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                className={styles.userDropdownMenu}
            >
                <MenuItem className={styles.userDropdownMenuItemMobile}>
                    <p className={styles.userDropdownName}>
                        {user?.lastName}
                    </p>
                </MenuItem>
                <MenuItem className={styles.userDropdownMenuItem}>
                    <p>Menu Content</p>
                </MenuItem>
            </Menu>
        </>
    );
}