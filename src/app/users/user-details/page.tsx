'use client'

import React from 'react';
import Icon from '@/components/ui-components/icon';
import { Avatar, Button, CircularProgress, Tabs, TabList, Tab, TabPanel } from '@mui/joy';
import { Star, StarBorderOutlined } from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { useFetchUserDetails } from '@/hooks/useUsers';
import UserPersonalInfoTab from '@/components/userDetails/userPersonalInfo';
import styles from '@/styles/pages/userDetailsPage.module.scss';

export default function UserDetails() {
    const [activeTab, setActiveTab] = React.useState<number>(0);
    const { userDetails, isLoading: userDetailsLoading, isError: userDetailsError } = useFetchUserDetails();
    const router = useRouter();

    if (userDetailsLoading) {
        return <div className={styles.loadingContainer}><CircularProgress style={{ color: '#39CDCC' }} /></div>
    };

    const userTier = userDetails?.userTier ?? 0;

    return (
        <div className={styles.userDetailsPage}>
            <Button onClick={() => router.back()} className={styles.userDetailsPageBackButton}>
                <Icon name='back-arrow' className={styles.userDetailsPageBackButtonIcon} />
                <p className={styles.userDetailsPageBackButtonText}>Back to Users</p>
            </Button>

            <div className={styles.userDetailsPageHeader}>
                <p className={styles.userDetailsPageHeaderTitle}>User Details</p>

                <div className={styles.userDetailsPageHeaderActionButtons}>
                    <Button
                        variant="outlined"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#E4033B',
                            fontFamily: 'var(--font-work-sans)',
                            fontWeight: 500,
                            fontSize: '14px',
                            height: '40px',
                            width: '170px',
                            borderColor: '#E4033B',
                            borderWidth: '1px'
                        }}
                    >
                        BLACKLIST USER
                    </Button>

                    <Button
                        variant="outlined"
                        style={{
                            backgroundColor: 'transparent',
                            color: '#39CDCC',
                            fontFamily: 'var(--font-work-sans)',
                            fontWeight: 500,
                            fontSize: '14px',
                            height: '40px',
                            width: '170px',
                            borderColor: '#39CDCC',
                            borderWidth: '1px'
                        }}
                    >
                        ACTIVATE USER
                    </Button>
                </div>
            </div>

            <div className={styles.userDetailsPageCard}>
                <div className={styles.userDetailsPageCardTop}>
                    <div className={styles.userDetailsPageCardTopAvatarSection}>
                        <Avatar
                            alt={`${userDetails?.personalInfo.userName}`}
                            src={userDetails?.userPhoto}
                            style={{ width: '100px', height: '100px', marginRight: '20px', padding: '30px' }}
                        />
                        <div className={styles.userDetailsPageCardTopAvatarSectionInfo}>
                            <p className={styles.userDetailsPageCardTopAvatarSectionInfoName}>
                                {userDetails?.personalInfo.userName}
                            </p>
                            <p className={styles.userDetailsPageCardTopAvatarSectionInfoRegNo}>
                                {userDetails?.personalInfo.userRegNo}
                            </p>
                        </div>
                    </div>

                    <div className={styles.userDetailsPageCardTopSecond}>
                        <div className={styles.userDetailsPageCardTopTierSection}>
                            <p className={styles.userDetailsPageCardTopTierSectionLabel}>User's Tier</p>
                            <div>
                                {Array.from({ length: 3 }, (_, index) => (
                                    index < userTier ?
                                        <Star key={index} style={{ color: '#E9B200', width: '16px', height: '16px', marginRight: '4px' }} /> :
                                        <StarBorderOutlined key={index} style={{ color: '#E9B200', width: '16px', height: '16px', marginRight: '4px' }} />
                                ))}
                            </div>
                        </div>

                        <div className={styles.userDetailsPageCardTopBalanceSection}>
                            <p className={styles.userDetailsPageCardTopBalanceSectionBalance}>
                                ₦{Number(userDetails?.bankDetails.balance).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </p>
                            <p className={styles.userDetailsPageCardTopBalanceSectionAccount}>
                                {userDetails?.bankDetails.accountNumber} / {userDetails?.bankDetails.bankName}
                            </p>
                        </div>
                    </div>
                </div>

                <Tabs
                    value={activeTab}
                    onChange={(event, newValue) => setActiveTab(newValue as number)}
                    sx={{
                        borderBottom: '0px solid',
                        borderColor: 'divider',
                        bgcolor: 'transparent',
                        marginTop: '10px',
                        overflow: 'auto',
                        scrollSnapType: 'x mandatory',
                        '&::-webkit-scrollbar': { display: 'none' },
                    }}
                >
                    <TabList
                        sx={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}
                        disableUnderline
                    >
                        {['General Details', 'Documents', 'Bank Details', 'Loans', 'Savings', 'App and System'].map((label, index) => (
                            <Tab
                                key={index}
                                sx={{
                                    fontFamily: 'var(--font-sf-compact)',
                                    color: activeTab === index ? 'rgba(57, 205, 204, 1)' : 'rgba(0, 0, 0, 0.8)',
                                    bgcolor: 'transparent',
                                    flex: 'none',
                                    scrollSnapAlign: 'start',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        color: 'rgba(57, 205, 204, 1)'
                                    },
                                    '&:active': { backgroundColor: 'transparent' },
                                    '&:after': {
                                        content: '""',
                                        display: 'block',
                                        height: '2px',
                                        width: '100%',
                                        bgcolor: activeTab === index ? 'rgba(57, 205, 204, 1)' : 'transparent'
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: 'transparent'
                                    },
                                    '&.Mui-hovered': {
                                        backgroundColor: 'transparent',
                                        color: 'rgba(57, 205, 204, 1)'
                                    }
                                }}
                            >
                                {label}
                            </Tab>
                        ))}
                    </TabList>
                </Tabs>
            </div>

            <Tabs
                value={activeTab}
                // className={styles.userDetailsPageTabsContainer}
                sx={{
                    padding: '30px',
                    paddingBottom: '46px',
                    width: '100%',
                    backgroundColor: 'white',
                    boxShadow: '3px 5px 20px 0px rgba(0, 0, 0, 0.04)',
                    borderColor: 'rgba(33, 63, 125, 0.06)',
                    borderWidth: '1px',
                    borderRadius: '4px',
                }}
            >
                <TabPanel value={0} sx={{ padding: '0px' }}>
                    {userDetails && <UserPersonalInfoTab userDetails={userDetails} />}
                </TabPanel>
                <TabPanel value={1}>
                    <p>Documents</p>
                </TabPanel>
                <TabPanel value={2}>
                    <p>Bank Details</p>
                </TabPanel>
                <TabPanel value={3}>
                    <p>Loans</p>
                </TabPanel>
                <TabPanel value={4}>
                    <p>Savings</p>
                </TabPanel>
                <TabPanel value={5}>
                    <p>App and System</p>
                </TabPanel>
            </Tabs>
        </div >
    )
}