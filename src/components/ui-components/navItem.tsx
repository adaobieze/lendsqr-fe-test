// import { usePathname } from 'next/navigation';
// import React from 'react';
// import Icon from './Icon';
// import Link from 'next/link';

// interface NavItemProps {
//     icon: string;
//     name: string;
//     href: string;
// };

// export default function NavItem({ icon, name, href }: NavItemProps) {
//     const pathname = usePathname();
//     const isActiveRoute = pathname.includes(href);

//     const baseStyles = {
//         display: 'flex',
//         alignItems: 'center',
//         marginBottom: '10px',
//         paddingLeft: '30px',
//         paddingTop: '10px',
//         paddingBottom: '10px',
//         textDecoration: 'none',
//         transition: 'background-color 0.3s, color 0.3s',
//         width: '100%',
//     };

//     const activeStyles = {
//         backgroundColor: 'rgba(57, 205, 204, 0.06)',
//         color: '#213F7D',
//     };

//     const inactiveStyles = {
//         backgroundColor: 'transparent',
//         color: '#213F7D',
//         opacity: 0.7,
//     };

//     const hoverStyles = {
//         ':hover': {
//             backgroundColor: 'rgba(57, 205, 204, 1)',
//         },
//     };

//     const combinedStyles = {
//         ...baseStyles,
//         ...(isActiveRoute ? activeStyles : inactiveStyles),
//         ...hoverStyles,
//     };

//     return (
//         <Link href={href} style={combinedStyles}>
//             <div style={{ display: 'flex', alignItems: 'center', height: '19px', gap: '10px' }}>
//                 <div style={{backgroundColor: isActiveRoute ? '#39CDCC' : 'transparent', width: '3px'}}></div>
//                 <div>
//                     <Icon
//                         name={icon}
//                         width={16}
//                         height={16}
//                     // color={isActiveRoute ? '#213F7D' : '#213F7D'}
//                     />
//                 </div>
//                 <p style={{ fontSize: '16px', fontWeight: isActiveRoute ? '500' : '400' }}>
//                     {name}
//                 </p>
//             </div>
//         </Link>
//     );
// }

import { usePathname } from 'next/navigation';
import React from 'react';
import Icon from './icon';
import Link from 'next/link';
import styles from '@/styles/components/navItem.module.scss';

interface NavItemProps {
    icon: string;
    name: string;
    href: string;
}

export default function NavItem({ icon, name, href }: NavItemProps) {
    const pathname = usePathname();
    const isActiveRoute = pathname.includes(href);

    return (
        <Link href={href} className={`${styles.navItem} ${isActiveRoute ? styles.active : ''}`}>
            <div className={`${styles.navStripe} ${isActiveRoute ? styles.active : ''}`}></div>
            <div className={styles.content}>
                <div className={styles.iconWrapper}>
                    <Icon
                        name={icon}
                        width={16}
                        height={16}
                        style={{display:'flex', alignItems: 'center'}}
                    />
                </div>
                <p className={styles.text}>
                    {name}
                </p>
            </div>
        </Link>
    );
}