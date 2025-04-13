"use client";

import { useState, useEffect } from "react";
import styles from "./page.module.css";
import Header from "../_components/Header";
import WorksList from "../_components/WorksList/index";
import Footer from "../_components/Footer";
import { client, Work } from "../../libs/client";

export default function Home() {
    const [works, setWorks] = useState<Work[] | null>(null); // worksデータの状態
    const [loading, setLoading] = useState(true); // ローディング状態
    const [selectedCategory, setSelectedCategory] = useState("All"); // 現在選択されているカテゴリ

    useEffect(() => {
        // Worksデータを取得
        const fetchData = async () => {
            try {
                // Worksデータを取得
                const data = await client.getList<Work>({
                    endpoint: "works",
                    queries: { limit: 10 },
                });
                setWorks(data.contents);
            } catch (error) {
                console.error("データ取得中にエラーが発生しました:", error);
                setWorks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        return () => {
            // クリーンアップ処理
            setWorks(null);
            setLoading(true);
        };
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!works || works.length === 0) {
        return <p>No works found.</p>;
    }

    return (
        <>
            <div className={styles.bodyInner}>
                <Header />
                <section className={styles.worksContainer}>
                    <div className={`inner ${styles.worksContainerInner}`}>
                        <div className={styles.pageTitle}>
                            <p>Works</p>
                        </div>
                        <div className={styles.worksNavArea}>
                            <div className={styles.worksNav}>
                                <ul>
                                    {[
                                        "All",
                                        "Web",
                                        "Logo / VI",
                                        "Graphic",
                                        "Visual / Content",
                                    ].map((category) => (
                                        <li
                                            key={category}
                                            className={`${
                                                styles.worksNavList
                                            } ${
                                                selectedCategory === category
                                                    ? styles.active
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setSelectedCategory(category)
                                            }
                                        >
                                            <span>{category}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.WorksItemArea}>
                            <WorksList selectedCategory={selectedCategory} />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
