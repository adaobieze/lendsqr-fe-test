'use client'

import React, { useState, useEffect } from 'react';
import LoginPagePhoto from '/public/illustrations/LoginPagePhoto.svg';
import LendSQRLogo from '/public/brand-assets/LendsqrLogo.svg';
import LoadingSpinner from '@/components/ui-components/loadingSpinner';
import LoginForm from '@/components/loginForm';
import styles from '@/styles/pages/LoginPage.module.scss';

export default function Login() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      const logoSrc = '/brand-assets/LendsqrLogo.svg';
      const photoSrc = '/illustrations/LoginPagePhoto.svg';
      await Promise.all([
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.src = logoSrc;
        }),
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.src = photoSrc;
        }),
      ]);

      await document.fonts.ready;

      await new Promise(resolve => setTimeout(resolve, 1000));

      setIsLoading(false);
    };

    loadAssets();
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.loginContainer}>
      <div className={styles.leftSection}>
        <div className={styles.logoWrapper}>
          <LendSQRLogo
            style={{ width: 145, height: 30, objectFit: 'contain' }}
          />
        </div>

        <LoginPagePhoto className={styles.loginPhoto} />
      </div>
      <div className={styles.rightSection}>
        <LoginForm />
      </div>
    </div>
  );
}
