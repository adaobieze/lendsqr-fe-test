import React from 'react';
import { Divider } from '@mui/joy';
import { UserDetails } from '@/lib/types';
import styles from '@/styles/components/userPersonalInfoTab.module.scss';

interface UserPersonalInfoTabProps {
    userDetails: UserDetails;
}

export default function UserPersonalInfoTab({ userDetails }: UserPersonalInfoTabProps) {
    return (
        <>
            <div className={styles.userPersonalInfoTab}>
                <p className={styles.sectionTitle}>
                    Personal Information
                </p>
                <div className={`${styles.infoGridPersonalInfo} ${styles.infoGrid}`}>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Full Name</p>
                        <p className={styles.value}>{userDetails?.personalInfo.userName}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Phone Number</p>
                        <p className={styles.value}>{userDetails?.personalInfo.phoneNumber}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Email Address</p>
                        <p className={styles.valueEmail}>
                            <a href={`mailto:${userDetails?.personalInfo.email}`}>{userDetails?.personalInfo.email}</a>
                        </p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>BVN</p>
                        <p className={styles.value}>{userDetails?.personalInfo.bvn}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Gender</p>
                        <p className={styles.value}>{userDetails?.personalInfo.gender}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Marital Status</p>
                        <p className={styles.value}>{userDetails?.personalInfo.maritalStatus}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Children</p>
                        <p className={styles.value}>{userDetails?.personalInfo.children}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Type of Residence</p>
                        <p className={styles.value}>{userDetails?.personalInfo.typeOfResidence}</p>
                    </div>
                </div>
            </div>

            <Divider className={styles.divider} />

            <div className={styles.userPersonalInfoTab}>
                <p className={styles.sectionTitle}>
                    Education And Employment
                </p>
                <div className={`${styles.infoGridEducationAndEmployment} ${styles.infoGrid}`}>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Level Of Education</p>
                        <p className={styles.value}>{userDetails?.educationAndEmployment.educationLevel}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Employment Status</p>
                        <p className={styles.value}>{userDetails?.educationAndEmployment.employmentStatus}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Sector of Employment</p>
                        <p className={styles.value}>{userDetails?.educationAndEmployment.employmentSector}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Duration of Employment</p>
                        <p className={styles.value}>{userDetails?.educationAndEmployment.employmentDuration}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Office Email</p>
                        <p className={styles.valueEmail}>
                            <a href={`mailto:${userDetails?.educationAndEmployment.officeEmail}`}>{userDetails?.educationAndEmployment.officeEmail}</a>
                        </p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Monthly Income</p>
                        <p className={styles.value}>
                            ₦{Number(userDetails?.educationAndEmployment.monthlyIncomeRange.lowRange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} - ₦{Number(userDetails?.educationAndEmployment.monthlyIncomeRange.highRange).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Loan Repayment</p>
                        <p className={styles.value}>
                            ₦{Number(userDetails?.educationAndEmployment.loanRepayment).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                    </div>
                </div>
            </div>

            <Divider className={styles.divider} />

            <div className={styles.userPersonalInfoTab}>
                <p className={styles.sectionTitle}>
                    Socials
                </p>
                <div className={`${styles.infoGridSocials} ${styles.infoGrid}`}>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Twitter</p>
                        <p className={styles.value}>{userDetails?.socials.twitter}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Facebook</p>
                        <p className={styles.value}>{userDetails?.socials.facebook}</p>
                    </div>
                    <div className={styles.infoGridItem}>
                        <p className={styles.label}>Instagram</p>
                        <p className={styles.value}>{userDetails?.socials.instagram}</p>
                    </div>
                </div>
            </div>

            <Divider className={styles.divider} />

            <div className={styles.userPersonalInfoTab}>
                <p className={styles.sectionTitle}>
                    Guarantor(s)
                </p>

                {userDetails?.guarantors.map((guarantor, index) => (
                    <div key={index}>
                        <div className={`${styles.infoGridGuarantors} ${styles.infoGrid}`}>
                            <div className={styles.infoGridItem}>
                                <p className={styles.label}>Full Name</p>
                                <p className={styles.value}>{guarantor.guarantorName}</p>
                            </div>
                            <div className={styles.infoGridItem}>
                                <p className={styles.label}>Phone Number</p>
                                <p className={styles.value}>{guarantor.guarantorPhoneNumber}</p>
                            </div>
                            <div className={styles.infoGridItem}>
                                <p className={styles.label}>Email Address</p>
                                <p className={styles.valueEmail}>
                                    <a href={`mailto:${guarantor.email}`}>{guarantor.email}</a>
                                </p>
                            </div>
                            <div className={styles.infoGridItem}>
                                <p className={styles.label}>Relationship</p>
                                <p className={styles.value}>{guarantor.relationship}</p>
                            </div>
                        </div>

                        {index < userDetails.guarantors.length - 1 && <Divider className={styles.divider} />}
                    </div>
                ))}
            </div>
        </>
    );
}
