import Link from "next/link";
import styles from "./not-found.module.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export default function NotFound() {
    return (
        <>
            <div className={styles.bodyInner}>
                <Header />
                <section className={styles.notFoundContainer}>
                    <div className={`inner ${styles.notFoundContainerInner}`}>
                        <h1 className={styles.title}>404</h1>
                        <div className={styles.titleArea}>
                            <div className={styles.titleAreaInner}>
                                <p className={styles.titleEn}>
                                    ERROR:Not Found
                                </p>
                                <p className={styles.message}>
                                    お探しのページが見つかりませんでした。
                                </p>
                            </div>
                            <p className={styles.description}>
                                申し訳ありませんが、お探しのページは存在しないか、移動した可能性があります。
                            </p>
                        </div>
                        <div className={`linkBtn ${styles.notFoundLinkBtn}`}>
                            <Link href="/" className={styles.notFoundAreaLink}>
                                <span>Top Page</span>
                            </Link>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
