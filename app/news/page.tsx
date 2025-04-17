"use client";

import styles from "./page.module.css";
import Header from "../_components/Header";
import NewsList from "../_components/NewsList/index";
import Footer from "../_components/Footer";

export default function Home() {
    return (
        <>
            <div className="bodyInner">
                <Header />
                <section className={styles.news}>
                    <div className={`inner ${styles.newsInner}`}>
                        <div className={styles.pageTitle}>
                            <p>News</p>
                        </div>
                        <div className={styles.newsContainerArea}>
                            <NewsList />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
