'use client'

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import LendSQRLogo from '/public/brand-assets/LendsqrLogo.svg';
import { Button, TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import UserDetailsDropdown from './userDetailsDropdown';
import Notifications from './notifications';
import styles from '@/styles/components/header.module.scss';
import MobileSearch from './mobileSearch';

export default function Header() {
    const router = useRouter()

    return (
        <div className={styles.header}>
            <div className={styles.headerLogo}>
                <Link href={'#'}>
                    <LendSQRLogo className={styles.headerLogoSvg} />
                </Link>
            </div>
            <div className={styles.headerContent}>
                <form className={styles.headerSearchDesktop}>
                    <TextField
                        id="search"
                        label=""
                        placeholder='Search for anything'
                        variant="outlined"
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                height: 40,
                                width: 400,
                                borderRadius: '8px',
                                paddingRight: 0,
                                '& fieldset': {
                                    borderColor: 'rgba(84, 95, 125, 0.15)',
                                    borderWidth: '1px',
                                },
                                '&:hover fieldset': {
                                    borderColor: 'rgba(9,30,66,.31)',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#39CDCC',
                                    borderWidth: '1px',
                                },
                                '& input': {
                                    fontFamily: 'Avenir Next',
                                    fontSize: '.875rem',
                                    fontWeight: '400',
                                    '&::placeholder': {
                                        color: '#545F7D',
                                        fontSize: '14px'
                                    },
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: 'rgba(9, 30, 66, 0.31)',
                                fontFamily: 'Avenir Next',
                                fontSize: '14px',
                                '&.Mui-focused': {
                                    color: '#39CDCC',
                                    fontFamily: 'Avenir Next',
                                },
                            },
                        }}
                        InputProps={{
                            endAdornment: (
                                <Button
                                    variant='text'
                                    style={{
                                        backgroundColor: '#39CDCC',
                                        borderRadius: '0 8px 8px 0',
                                        height: '100%',
                                    }}
                                >
                                    <Search style={{ color: 'white' }} />
                                </Button>
                            )
                        }}
                    />
                </form>
                <div className={styles.headerSearchMobile}>
                    <MobileSearch />
                </div>
                <div className={styles.headerLinks}>
                    <Link href={'#'}>
                        Docs
                    </Link>

                    <Notifications/>

                    <div className={styles.headerUserSection}>
                        <UserDetailsDropdown />
                    </div>
                </div>
            </div>
        </div>
    )
}
