import React, { ReactNode } from "react";
import styles from '@/styles/components/metricCard.module.scss';
import Icon from "./icon";
import { useMemo } from 'react';

interface MetricCardProps {
    label: string;
    value: any;
    icon?: string;
    color?: any;
}

export default function MetricCard({ label, value, icon, color }: MetricCardProps) {
    const formattedValue = useMemo(() => {
        if (typeof value === 'number') {
            return value.toLocaleString();
        }
        return value;
    }, [value]);
    return (
        <div className={styles.metricCard}>
            <div className={styles.contentContainer}>
                {icon && <div
                    className={styles.iconContainer}
                    style={{
                        backgroundColor: `rgba(${color}, 0.1)`,
                        width: '40px',
                        height: '40px',
                        borderRadius: '1000px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <Icon
                        name={icon}
                        width={20}
                        height={20}
                        style={{ display: 'flex', alignItems: 'center' }}
                    />
                </div>}
                <p style={{fontSize: 16, fontWeight: 'medium', textTransform: 'uppercase', color:'#545F7D', marginBottom: '12px', marginTop:'14px', fontFamily:'var(--font-work-sans)'}}>{label}</p>
                <p style={{fontSize: '24px', fontWeight: 600, textTransform: 'uppercase', color:'#213F7D', fontFamily:'var(--font-work-sans)'}}>
                    {formattedValue}
                </p>
            </div>
        </div >
    );
};
