'use client'

import React, { useState } from 'react';
import Icon from './icon';
import { KeyboardArrowDownOutlined, Menu, Close } from '@mui/icons-material';
import NavItem from './navItem';
import { Modal, Typography, Button, ModalClose, ModalDialog, Select, Option } from '@mui/joy';
import { useAuth } from '@/hooks/useAuth';
import styles from '@/styles/components/sidebar.module.scss';
import { useUserStore } from '@/hooks/userStore';

const sidebarData = [
    {
        section: "",
        items: [
            { name: "Dashboard", icon: "home", link: "/dashboard" },
        ],
    },
    {
        section: "CUSTOMERS",
        items: [
            { name: "Users", icon: "user-friends", link: "/users" },
            { name: "Guarantors", icon: "users", link: "/guarantors" },
            { name: "Loans", icon: "sack", link: "/loans" },
            { name: "Decision Models", icon: "handshake-regular", link: "/decision-models" },
            { name: "Savings", icon: "piggy-bank", link: "/savings" },
            { name: "Loan Requests", icon: "loan-request", link: "/loan-requests" },
            { name: "Whitelist", icon: "user-check", link: "/whitelist" },
            { name: "Karma", icon: "user-times", link: "/karma" },
        ],
    },
    {
        section: "BUSINESSES",
        items: [
            { name: "Organization", icon: "briefcase", link: "/organization" },
            { name: "Loan Products", icon: "loan-request", link: "/loan-products" },
            { name: "Savings Products", icon: "bank", link: "/savings-products" },
            { name: "Fees and Charges", icon: "coins", link: "/fees-charges" },
            { name: "Transactions", icon: "transactions", link: "/transactions" },
            { name: "Services", icon: "galaxy", link: "/services" },
            { name: "Service Account", icon: "user-cog", link: "/service-account" },
            { name: "Settlements", icon: "scroll", link: "/settlements" },
            { name: "Reports", icon: "chart-bar", link: "/reports" },
        ],
    },
    {
        section: "SETTINGS",
        items: [
            { name: "Preferences", icon: "sliders", link: "/preferences" },
            { name: "Fees and Pricing", icon: "badge-percent", link: "/fees-pricing" },
            { name: "Audit Logs", icon: "clipboard-list", link: "/audit-logs" },
            { name: "Systems Messages", icon: "tire", link: "/system-messages" },
        ],
    },
];

export default function Sidebar() {
    const [logoutModalOpen, setLogoutModalOpen] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { logout } = useAuth();
    const { user } = useUserStore();

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const handleLogout = () => {
        logout();
        setLogoutModalOpen(false);
    };

    return (
        <>
            <button onClick={toggleSidebar} className={styles.mobileMenuButton}>
                {sidebarOpen ? <Close style={{ width: '24px', height: '24px' }} /> : <Menu style={{ width: '24px', height: '24px' }} />}
            </button>

            {sidebarOpen && <div className={styles.backdrop} onClick={toggleSidebar}></div>}

            <div className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                <div className={styles.sidebarContent}>
                    <div className={styles.sidebarSwitchOrg}>
                        <Select
                            placeholder="Switch Organization"
                            indicator={<KeyboardArrowDownOutlined />}
                            startDecorator={
                                <Icon
                                    name='briefcase'
                                    width={16}
                                    height={16}
                                />
                            }
                            sx={{
                                boxShadow: '3px 5px 20px 0px rgba(0, 0, 0, 0.04)',
                                border: 'none',
                                width: '230px',
                                height: '16px',
                                fontFamily: 'var(--font-work-sans)',
                                fontWeight: 400,
                                fontSize: '15px',
                                color: '#213F7D',
                            }}
                        >
                            {user?.organizations?.map((org: string) => (
                                <Option
                                    key={org}
                                    value={org}
                                    sx={{
                                        boxShadow: '3px 5px 20px 0px rgba(0, 0, 0, 0.04)',
                                        border: '1px solid rgba(33, 63, 125, 0.2)',
                                        width: '206px',
                                        color: '#545F7D',
                                        fontFamily: 'var(--font-work-sans)',
                                        fontWeight: 400,
                                        fontSize: '15px',
                                    }}
                                >
                                    {org}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    {sidebarData.map((section, index) => (
                        <div key={index} className={styles.sidebarSection}>
                            <p className={styles.sidebarSectionTitle}>{section.section}</p>
                            {section.items.map((item, itemIndex) => (
                                <NavItem
                                    key={itemIndex}
                                    href={item.link}
                                    icon={item.icon}
                                    name={item.name}
                                />
                            ))}
                        </div>
                    ))}
                </div>

                <div className={styles.sidebarFooter} onClick={() => setLogoutModalOpen(true)}>
                    <NavItem
                        href='#'
                        icon={'sign-out'}
                        name={'Logout'}
                    />
                    <div className={styles.sidebarFooterVersion}>
                        <span>v1.2.0</span>
                    </div>
                </div>
            </div>

            <Modal
                aria-labelledby="logoutModal"
                open={logoutModalOpen}
                onClose={() => setLogoutModalOpen(false)}
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <ModalDialog size="sm">
                    <ModalClose variant="plain" sx={{ m: 1 }} />
                    <Typography
                        component="h2"
                        id="logoutModal"
                        level="h4"
                        textColor="inherit"
                        fontWeight="lg"
                        mb={1}
                    >
                        Logout
                    </Typography>
                    <Typography id="modal-desc" textColor="text.tertiary">
                        Are you sure you'd like to logout?
                    </Typography>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            className={styles.sidebarLogoutButton}
                            onClick={handleLogout}
                        >
                            YES
                        </Button>
                    </div>
                </ModalDialog>
            </Modal>
        </>
    )
}
