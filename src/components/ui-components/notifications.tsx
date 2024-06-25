'use client'
import React from 'react';
import { Popover, Button, Badge, Typography, Box, CircularProgress } from '@mui/material';
import { NotificationsOutlined } from '@mui/icons-material';
import { useFetchNotifications } from '@/hooks/useNotifications';
import { Notification } from '@/lib/types'
import moment from 'moment';
import styles from '../../styles/components/notifications.module.scss'

const sortNotifications = (notifications: Notification[] | undefined) => {
    if (!Array.isArray(notifications)) {
        return [];
    }

    return notifications.filter(Boolean).sort((a: Notification, b: Notification) => {
        return moment(b.notification_timestamp).valueOf() - moment(a.notification_timestamp).valueOf();
    });
};

export default function Notifications() {
    const { notifications = [], isLoading, isError } = useFetchNotifications();
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const notificationsArray = Array.isArray(notifications) ? notifications : [];

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'notifications-popover' : undefined;

    const sortedNotifications = sortNotifications(notificationsArray);

    return (
        <div>
            <Button
                aria-describedby={id}
                onClick={handleClick}
                className={styles.notificationsButton}
            >
                <Badge
                    badgeContent={notificationsArray.length}
                    color="warning"
                    variant="dot"
                    invisible={notificationsArray.length === 0}
                    className={styles.notificationsBadge}
                >
                    <NotificationsOutlined className={styles.notificationsIcon} />
                </Badge>
            </Button>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
            >
                <Box className={styles.notificationsPopover}>
                    <Box className={styles.notificationsHeader}>
                        <Typography variant="h6" className={styles.notificationsHeaderTitle}>
                            Notifications
                        </Typography>
                        <Badge badgeContent={notificationsArray.length} color="primary">
                            <span></span>
                        </Badge>
                    </Box>
                    <Box>
                        {isLoading ? (
                            <Box className={styles.notificationsLoadingBox}>
                                <CircularProgress />
                            </Box>
                        ) : isError ? (
                            <Typography className={styles.notificationsErrorBox}>
                                There was an error fetching your notifications. Please refresh.
                            </Typography>
                        ) : (
                            <>
                                {notificationsArray.length === 0 ? (
                                    <Typography className={styles.notificationsEmptyBox}>
                                        You have no unread notifications
                                    </Typography>
                                ) : (
                                    <Box className={styles.notificationsContent}>
                                        {sortedNotifications.map((notification: Notification) => (
                                            <Box
                                                key={notification.notification_id}
                                                className={styles.notificationsItem}
                                            >
                                                <Typography variant="body2" className={styles.notificationsItemMessage}>
                                                    {notification.notification_message}
                                                </Typography>
                                                <Typography variant="caption" className={styles.notificationsItemTimestamp}>
                                                    {moment(notification.notification_timestamp).fromNow()}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </Box>
                                )}
                            </>
                        )}
                    </Box>
                </Box>
            </Popover>
        </div>
    );
}