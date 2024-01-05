import React from 'react';
import styles from './LayoutAuth.module.css';

export default function AuthLayout( { children }: { children: React.ReactNode } ) {
    return (
        <div className="flex h-screen bg-[#252525]">
            <div className="m-auto bg-[#27AE60] rounded-md w-3/5 h-3/4 grid lg:grid-cols-2">
                <div className={styles.imgStyle}>
                    <div className={styles.imgCartoon}></div>
                    <div className={styles.cloud_one}></div>
                    <div className={styles.cloud_two}></div>
                </div>
                <div className="right flex flex-col justify-evenly bg-gray-50 rounded-md">
                    <div className="text-center py-10">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    )
}
