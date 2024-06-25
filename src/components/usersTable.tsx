'use client'

import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Dropdown, Menu, MenuButton, MenuItem, Sheet, Table, IconButton, Chip, ListItemDecorator, Option, Select, Button, FormControl, FormLabel, Input, Checkbox } from '@mui/joy';
import { Pagination } from '@mui/material';
import { ColorPaletteProp } from '@mui/joy/styles';
import { MoreVert, RemoveRedEyeOutlined, KeyboardArrowDown, Clear, FilterList } from '@mui/icons-material';
import moment from 'moment';
import { User } from '@/lib/types';
import Icon from './ui-components/icon';

interface UserTableProps {
    table_data: User[];
};

type Filters = {
    organization: string[];
    userName: string;
    email: string;
    phoneNumber: string;
    dateJoined: string;
    status: string[];
};

const formFieldStyles = {
    boxShadow: '3px 5px 20px 0px rgba(0, 0, 0, 0.04)',
    border: '1px solid rgba(33, 63, 125, 0.2)',
    width: '230px',
    height: '40px',
};

const placeholderStyles = {
    fontFamily: 'var(--font-work-sans)',
    fontWeight: 400,
    fontSize: '14px',
    color: 'rgba(84, 95, 125, 0.7)',
};

const labelStyles = {
    fontFamily: 'var(--font-work-sans)',
    fontWeight: 500,
    fontSize: '14px',
    color: 'rgba(84, 95, 125, 0.7)',
};

export default function UsersTable({ table_data }: UserTableProps) {
    const users = table_data;
    const router = useRouter();

    const columns = [
        { id: 'organization', label: 'Organization' },
        { id: 'userName', label: 'User Name' },
        { id: 'email', label: 'Email' },
        { id: 'phoneNumber', label: 'Phone Number' },
        { id: 'dateJoined', label: 'Date Joined' },
        { id: 'status', label: 'Status' },
        { id: 'actions', label: '' }
    ];

    const handleRowClick = (userId: string) => {
        console.log('Clicked user ID:', userId);
        router.push(`/users/user-details?id=${userId}`);
    };

    const [filterValue, setFilterValue] = useState("");
    const [rowsPerPage, setRowsPerPage] = useState(100);
    const [page, setPage] = useState(1);

    const [openFilter, setOpenFilter] = useState<string | null>(null);
    const [filters, setFilters] = useState<Filters>({
        organization: [],
        userName: '',
        email: '',
        phoneNumber: '',
        dateJoined: '',
        status: []
    });

    const filterButtonRefs = useRef<{ [key: string]: HTMLElement | null }>({});

    const handleFilterButtonClick = (columnId: string, event: React.MouseEvent<HTMLButtonElement>) => {
        setOpenFilter(openFilter === columnId ? null : columnId);
        filterButtonRefs.current[columnId] = event.currentTarget;
    };

    const hasSearchFilter = Boolean(filterValue);

    const filteredItems = useMemo(() => {
        let filteredUsers = [...users];

        if (hasSearchFilter) {
            filteredUsers = filteredUsers.filter((user) =>
                user.organization.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.userName.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.email.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.phoneNumber.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.dateJoined.toLowerCase().includes(filterValue.toLowerCase()) ||
                user.status.toLowerCase().includes(filterValue.toLowerCase())
            );
        }

        Object.entries(filters).forEach(([key, value]) => {
            if (value) {
                filteredUsers = filteredUsers.filter((user) => {
                    switch (key) {
                        case 'organization':
                        case 'status':
                            return (value as string[]).length === 0 || (value as string[]).includes(user[key as keyof User]);
                        case 'dateJoined':
                            return moment(user[key]).format('YYYY-MM-DD') === value;
                        default:
                            return user[key as keyof User].toLowerCase().includes((value as string).toLowerCase());
                    }
                });
            }
        });

        return filteredUsers;
    }, [users, filterValue, hasSearchFilter, filters]);

    const pages = Math.ceil(filteredItems.length / rowsPerPage);
    const totalItems = useMemo(() => filteredItems.length, [filteredItems.length]);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return filteredItems.slice(start, end);
    }, [page, filteredItems, rowsPerPage]);

    const renderCell = useCallback((user: User, columnKey: keyof User | 'actions') => {
        const cellValue = user[columnKey as keyof User];

        switch (columnKey) {
            case 'organization':
                return <>{cellValue}</>;
            case 'userName':
                return <p>{cellValue}</p>;
            case 'email':
                return (
                    <div>
                        <a href={`mailto:${cellValue}`}>
                            {cellValue}
                        </a>
                    </div>
                );
            case 'phoneNumber':
                return (
                    <div>
                        <a href={`tel:${cellValue}`}>
                            {cellValue}
                        </a>
                    </div>
                );
            case 'dateJoined':
                return (
                    <p className="text-bold text-sm">{moment(cellValue).format('MMM D, YYYY h:mm A')}</p>
                );
            case 'status':
                return (
                    <div>
                        <Chip
                            variant="soft"
                            size="md"
                            color={
                                {
                                    active: 'success',
                                    inactive: 'default',
                                    pending: 'warning',
                                    blacklisted: 'danger'
                                }[user.status] as ColorPaletteProp
                            }
                            sx={{
                                paddingInline: '12px',
                                paddingBlock: '7px',
                                fontSize: '14px'
                            }}
                        >
                            <span style={{ textTransform: 'capitalize', fontWeight: 400 }}>
                                {cellValue}
                            </span>
                        </Chip>
                    </div>
                );
            case 'actions':
                return (
                    <div className="relative flex items-center gap-2">
                        <Dropdown>
                            <MenuButton
                                slots={{ root: IconButton }}
                                slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
                            >
                                <MoreVert style={{ color: '#545F7D' }} />
                            </MenuButton>
                            <Menu size="sm" placement="bottom-end" sx={{ minWidth: 140 }}>
                                <MenuItem>
                                    <ListItemDecorator>
                                        <RemoveRedEyeOutlined />
                                    </ListItemDecorator>{' '}
                                    View Details
                                </MenuItem>
                                <MenuItem>
                                    <ListItemDecorator>
                                        <Icon name='user-delete-line' />
                                    </ListItemDecorator>{' '}
                                    Blacklist User
                                </MenuItem>
                                <MenuItem>
                                    <ListItemDecorator>
                                        <Icon name='user-check-line' />
                                    </ListItemDecorator>{' '}
                                    Activate User
                                </MenuItem>
                            </Menu>
                        </Dropdown>
                    </div>
                );
            default:
                return cellValue;
        }
    }, [router]);

    const onRowsPerPageChange = useCallback((
        event: React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element> | React.FocusEvent<Element, Element> | null,
        value: string | null
    ) => {
        if (value !== null) {
            setRowsPerPage(Number(value));
            setPage(1);
        }
    }, []);

    const handleFilterChange = (field: string, value: any) => {
        setFilters(prev => ({ ...prev, [field]: value }));
    };

    const resetFilters = () => {
        setFilters({
            organization: [],
            userName: '',
            email: '',
            phoneNumber: '',
            dateJoined: '',
            status: []
        });
    };

    const clearField = (field: string) => {
        setFilters(prev => ({ ...prev, [field]: field === 'organization' || field === 'status' ? [] : '' }));
    };

    const organizations = useMemo(() => {
        return Array.from(new Set(users.map(user => user.organization)));
    }, [users]);

    const filterContent = useMemo(() => {
        if (!openFilter) return null;

        return (
            <Menu
                open={Boolean(openFilter)}
                onClose={() => setOpenFilter(null)}
                anchorEl={filterButtonRefs.current[openFilter]}
                style={{ borderRadius: '8px' }}
            >
                <form
                    onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
                        event.preventDefault();
                        setOpenFilter(null);
                    }}
                    style={{
                        backgroundColor: 'white',
                        borderRadius: '8px',
                        padding: '24px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '14px',
                    }}
                >
                    <FormControl>
                        <FormLabel sx={labelStyles}>Organization</FormLabel>
                        <Select
                            multiple
                            placeholder="Select"
                            indicator={<KeyboardArrowDown />}
                            onChange={(_, value) => handleFilterChange('organization', value)}
                            value={filters.organization}
                            sx={{ ...formFieldStyles, ...placeholderStyles }}
                            endDecorator={
                                filters.organization.length > 0 && (
                                    <IconButton size="sm" onClick={() => clearField('organization')}>
                                        <Clear />
                                    </IconButton>
                                )
                            }
                        >
                            {organizations.map((org) => (
                                <Option key={org} value={org}
                                    style={{
                                        boxShadow: '3px 5px 20px 0px rgba(0, 0, 0, 0.04)',
                                        border: '1px solid rgba(33, 63, 125, 0.2)',
                                        width: '230px',
                                        color: '#545F7D',
                                    }}
                                >
                                    {org}
                                </Option>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={labelStyles}>User Name</FormLabel>
                        <Input
                            placeholder="User"
                            value={filters.userName}
                            onChange={(e) => handleFilterChange('userName', e.target.value)}
                            endDecorator={
                                filters.userName && (
                                    <IconButton variant="plain" size="sm" color="neutral" onClick={() => clearField('userName')}>
                                        <Clear />
                                    </IconButton>
                                )
                            }
                            sx={formFieldStyles}
                            slotProps={{ input: { sx: placeholderStyles } }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={labelStyles}>Email</FormLabel>
                        <Input
                            placeholder="Email"
                            value={filters.email}
                            onChange={(e) => handleFilterChange('email', e.target.value)}
                            endDecorator={
                                filters.email && (
                                    <IconButton variant="plain" size="sm" color="neutral" onClick={() => clearField('email')}>
                                        <Clear />
                                    </IconButton>
                                )
                            }
                            sx={formFieldStyles}
                            slotProps={{ input: { sx: placeholderStyles } }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={labelStyles}>Date</FormLabel>
                        <Input
                            placeholder="Date"
                            type="date"
                            value={filters.dateJoined}
                            onChange={(e) => handleFilterChange('dateJoined', e.target.value)}
                            endDecorator={
                                filters.dateJoined && (
                                    <IconButton variant="plain" size="sm" color="neutral" onClick={() => clearField('dateJoined')}>
                                        <Clear />
                                    </IconButton>
                                )
                            }
                            sx={formFieldStyles}
                            slotProps={{ input: { sx: placeholderStyles } }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={labelStyles}>Phone Number</FormLabel>
                        <Input
                            placeholder="Phone Number"
                            value={filters.phoneNumber}
                            onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
                            endDecorator={
                                filters.phoneNumber && (
                                    <IconButton variant="plain" size="sm" color="neutral" onClick={() => clearField('phoneNumber')}>
                                        <Clear />
                                    </IconButton>
                                )
                            }
                            sx={formFieldStyles}
                            slotProps={{ input: { sx: placeholderStyles } }}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel sx={labelStyles}>Status</FormLabel>
                        <Select
                            placeholder="Select"
                            // value={filters.status}
                            onChange={(event, value) => handleFilterChange('status', value)}
                            sx={formFieldStyles}
                            slotProps={{ listbox: { sx: { maxHeight: 200 } } }}
                        // renderValue={(selected) => (selected.length === 0 ? 'Select' : selected.join(', '))}
                        >
                            {['active', 'inactive', 'pending', 'blacklisted'].map(status => (
                                <Option key={status} value={status}>
                                    <Checkbox
                                        checked={filters.status.includes(status)}
                                        onChange={(event) => {
                                            if (event.target.checked) {
                                                handleFilterChange('status', [...filters.status, status]);
                                            } else {
                                                handleFilterChange('status', filters.status.filter(item => item !== status));
                                            }
                                        }}
                                    >
                                        {status}
                                    </Checkbox>
                                </Option>
                            ))}
                        </Select>
                    </FormControl>

                    <div style={{ display: 'flex', gap: '14px', paddingTop: '10px' }}>
                        <Button
                            variant="outlined"
                            color="neutral"
                            onClick={resetFilters}
                            style={{ borderColor: '#545F7D', color: '#545F7D', fontFamily: 'var(--font-work-sans)', fontWeight: 600, fontSize: '14px', height: '40px', width: '98px' }}
                        >
                            Reset
                        </Button>

                        <Button
                            type="submit"
                            style={{ backgroundColor: '#39CDCC', color: 'white', fontFamily: 'var(--font-work-sans)', fontWeight: 600, fontSize: '14px', height: '40px', width: '98px' }}
                        >
                            Filter
                        </Button>
                    </div>
                </form>
            </Menu>
        );
    }, [openFilter, filters]);

    return (
        <>
            <Sheet
                variant="outlined"
                sx={{
                    width: '100%',
                    height: '640px',
                    borderRadius: 'md',
                    flex: 1,
                    overflow: 'auto',
                    minHeight: 0,
                    border: 'none',
                }}
            >
                <Table
                    aria-labelledby="usersTable"
                    stickyHeader
                    hoverRow
                    sx={{
                        '--Table-headerUnderlineThickness': '0px',
                        '--TableRow-hoverBackground': 'rgba(0, 0, 0, 0.02)',
                        '& thead th:nth-child(1)': { width: '15.12%' },
                        '& thead th:nth-child(2)': { width: '13.82%' },
                        '& thead th:nth-child(3)': { width: '19.17%' },
                        '& thead th:nth-child(4)': { width: '16.17%' },
                        '& thead th:nth-child(5)': { width: '20.08%' },
                        '& thead th:nth-child(6)': { width: '13.04%' },
                        '& thead th:nth-child(7)': { width: '2.61%' },
                        padding: '30px',
                        maxHeight: '640px',
                        height: '100%',
                        tableLayout: 'fixed',
                        // display: 'flex',
                        // flexDirection: 'column',
                        '& thead': {
                            width: '100%',
                        },
                        '& tbody': {
                            // flex: 1,
                            // overflow: 'auto',
                            // width: '100%',
                        },
                        '& tr': {
                            // display: 'table',
                            // width: '100%',
                            // tableLayout: 'fixed',
                        },
                        '& th, & td': {
                            // maxWidth: 0,
                            // overflow: 'hidden',
                            // textOverflow: 'ellipsis',
                            // whiteSpace: 'nowrap',
                        },
                    }}
                >
                    <thead>
                        <tr>
                            {columns.map(column => (
                                <th key={column.id} scope="col" style={{ fontSize: '12px', fontFamily: 'var(--font-work-sans)', fontWeight: 600, textTransform: 'uppercase', color: '#545F7D', padding: 0, paddingRight: '35px' }}>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        {column.label}
                                        {column.id !== 'actions' && (
                                            <Button
                                                component="button"
                                                variant="plain"
                                                color="neutral"
                                                size="sm"
                                                onClick={(event: React.MouseEvent<HTMLButtonElement>) => handleFilterButtonClick(column.id, event)}
                                                ref={(el) => {
                                                    if (el) {
                                                        filterButtonRefs.current[column.id] = el;
                                                    }
                                                }}
                                                style={{
                                                    marginLeft: '10px',
                                                    padding: '0px',
                                                    height: '16px'
                                                }}
                                            >
                                                <FilterList style={{ color: '#545F7D', width: '16px', height: '16px' }} />
                                            </Button>
                                        )}
                                    </div>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {items.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length}>
                                    <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        No data available
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            items.map((user) => (
                                <tr
                                    key={user.id}
                                    style={{ height: '62px', cursor: 'pointer' }}
                                    onClick={() => handleRowClick(user.id)}
                                >
                                    {columns.map(column => (
                                        <td
                                            key={column.id}
                                            style={{
                                                fontSize: '14px',
                                                fontFamily: 'var(--font-work-sans)',
                                                fontWeight: 'regular',
                                                color: '#545F7D',
                                                padding: '0 10px 0 0',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                paddingRight: '35px'
                                            }}
                                        >
                                            {renderCell(user, column.id as keyof User | 'actions')}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </Table>

                {filterContent}
            </Sheet>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '3px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#545F7D' }}>Showing</span>
                    <Select
                        sx={{
                            backgroundColor: 'rgba(33, 63, 125, 0.1)',
                            color: '#213F7D'
                        }}
                        defaultValue="100"
                        indicator={<KeyboardArrowDown style={{ color: 'rgba(33, 63, 125, 0.6)' }} />}
                        onChange={onRowsPerPageChange}
                    >
                        <Option value="50">50</Option>
                        <Option value="100">100</Option>
                        <Option value="200">200</Option>
                    </Select>
                    <span style={{ color: '#545F7D' }}>out of {totalItems}</span>
                </div>
                <Pagination count={pages} variant="outlined" shape="rounded" />
            </div>
        </>
    );
}
