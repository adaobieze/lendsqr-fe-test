'use client'

import React from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { useAuth } from '@/hooks/useAuth';
import { LoginFormData } from '@/lib/types';
import Link from 'next/link';
import { TextField, Button, FormHelperText, FormControl, CircularProgress } from '@mui/material';
import { SnackbarContext } from '@/app/providers';
import styles from '@/styles/components/loginForm.module.scss';

export default function LoginForm() {
    const [show, setShow] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const { login } = useAuth();
    const { showSnackbar } = React.useContext(SnackbarContext);

    const methods = useForm<LoginFormData>({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
    });

    const { handleSubmit, register, formState: { errors } } = methods;

    const onSubmit = async (formData: LoginFormData) => {
        setIsLoading(true);
        try {
            await login(formData.email, formData.password);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
            showSnackbar(errorMessage, 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.formContainer}>
                    <div className={styles.header}>
                        <p className={styles.title}>Welcome!</p>
                        <p className={styles.subtitle}>Enter details to login.</p>
                    </div>

                    <FormControl fullWidth sx={{ marginBottom: '24px' }}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            autoComplete="email"
                            error={!!errors.email}
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '50px',
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
                                        fontWeight: '400'
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
                        />
                        {errors.email && <FormHelperText error>{errors.email.message}</FormHelperText>}
                    </FormControl>

                    <FormControl fullWidth sx={{ marginBottom: '24px' }}>
                        <TextField
                            id="password"
                            label="Password"
                            variant="outlined"
                            type={show ? 'text' : 'password'}
                            error={!!errors.password}
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 8,
                                    message: "Password must be at least 8 characters long"
                                }
                            })}
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    height: '50px',
                                    '& fieldset': {
                                        borderColor: 'rgba(84, 95, 125, 0.15)',
                                        borderWidth: '1px'
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
                                        fontWeight: '400'
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
                                        className={styles.showHideButton}
                                        sx={{
                                            height: '12.5',
                                            textTransform: 'uppercase',
                                            fontSize: '12px',
                                            color: '#39CDCC',
                                            fontFamily: 'Avenir Next',
                                            fontWeight: 600,
                                            backgroundColor: 'transparent',
                                        }}
                                        onClick={() => setShow(!show)}
                                    >
                                        {show ? 'Hide' : 'Show'}
                                    </Button>
                                ),
                            }}
                        />
                        {errors.password && <FormHelperText error>{errors.password.message}</FormHelperText>}
                    </FormControl>

                    <div className={styles.forgotPassword}>
                        <Link href="#">FORGOT PASSWORD?</Link>
                    </div>

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={isLoading}
                        className={styles.submitButton}
                    >
                        {isLoading ? <CircularProgress size={24} color="inherit" /> : 'Log In'}
                    </Button>
                </div>
            </form>
        </FormProvider >
    );
}