import Link from "next/link";
import Image from "next/image";
import styles from "./Footer.module.css";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={`inner ${styles.footerInner}`}>
                <div className={styles.contactBtn}>
                    <div className={`linkBtn ${styles.contactLinkBtn}`}>
                        <Link href="/contact">
                            <span>Contact</span>
                        </Link>
                    </div>
                </div>
                <div className={styles.footerLogoArea}>
                    <Link href="/">
                        <Image
                            src="/svgs/footerLogo.svg"
                            alt="footerLogo"
                            width={100}
                            height={100}
                            className={styles.footerLogo}
                        />
                    </Link>
                </div>
                <div className={styles.footerNav}>
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
                    <div className={styles.recaptchaNotice}>
                        <p>
                            This site is protected by reCAPTCHA and the Google{" "}
                            <a
                                href="https://policies.google.com/privacy"
                                target="_blank"
                            >
                                Privacy Policy
                            </a>{" "}
                            and{" "}
                            <a
                                href="https://policies.google.com/terms"
                                target="_blank"
                            >
                                Terms of Service
                            </a>{" "}
                            apply.
                        </p>
                    </div>
                    <div className={styles.copyRight}>
                        <p>
                            &copy; {currentYear} Cohere Inc. All rights
                            reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
