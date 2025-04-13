"use client";

import { useState } from "react";
import styles from "./Header.module.css";
import Link from "next/link";

export default function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerInner}>
                <Link href="/" className={styles.icon}>
                    <img
                        src="/svgs/headerIcon.svg"
                        alt="headerIcon"
                        width="100%"
                        className={styles.headerLogo}
                    />
                </Link>
                <div className={styles.headerInner}>
                    <div
                        className={`${styles.navArea} ${
                            isMenuOpen ? styles.menuOpen : ""
                        }`}
                    >
                        <button
                            onClick={toggleMenu}
                            className={styles.menuToggle}
                        >
                            MENU
                        </button>

                        {/* メニュー全体（T字ライン＋リスト） */}
                        <nav className={styles.navMenu}>
                            {/* メニュー項目 */}
                            <ul className={styles.menuList}>
                                <li className={styles.topItem}>
                                    <Link href="/">Top</Link>
                                </li>
                            </ul>
                            <ul className={styles.borderConts}>
                                <li
                                    className={`${styles.border} ${styles.border1st}`}
                                ></li>
                                <div className={styles.borderBox}>
                                    <li
                                        className={`${styles.border} ${styles.border1st}`}
                                    ></li>
                                    <li
                                        className={`${styles.border} ${styles.border2st}`}
                                    ></li>
                                    <li
                                        className={`${styles.border} ${styles.border2st}`}
                                    ></li>
                                    <li
                                        className={`${styles.border} ${styles.border2st}`}
                                    ></li>
                                    <li
                                        className={`${styles.border} ${styles.border2st}`}
                                    ></li>
                                </div>
                            </ul>
                            <ul className={styles.menuList}>
                                <li>
                                    <Link href="/about">About</Link>
                                </li>
                                <li>
                                    <Link href="/service">Service</Link>
                                </li>
                                <li>
                                    <Link href="/works">Works</Link>
                                </li>
                                <li>
                                    <Link href="/news">News</Link>
                                </li>
                                <li>
                                    <Link href="/contact">Contact</Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        </header>
    );
}
