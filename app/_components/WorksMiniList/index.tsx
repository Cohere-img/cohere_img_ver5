"use client";

import { useEffect, useState } from "react";
import { client, Work } from "../../../libs/client";
import Link from "next/link";
import styles from "./WorksMiniList.module.css";

export default function WorksMiniList() {
    const [works, setWorks] = useState<Work[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                const data = await client.getList<Work>({
                    endpoint: "works",
                    queries: { limit: 4 },
                });

                // フィルタリング処理
                const filteredWorks = data.contents.filter(
                    (work) =>
                        work.category?.id === "web" ||
                        work.category?.id === "logo_vi" ||
                        work.category?.id === "graphic" ||
                        work.category?.id === "visual_content"
                );

                setWorks(filteredWorks);
            } catch (error) {
                console.error("Error fetching works:", error);
                setWorks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchWorks();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (!works || works.length === 0) {
        return <p>No works found.</p>;
    }

    return (
        <div className={styles.worksItemBox}>
            {works.map((work) => {
                const categoryMap: { [key: string]: string } = {
                    web: "Web",
                    logo_vi: "Logo / VI",
                    graphic: "Graphic",
                    visual_content: "Visual / Contents",
                };
                const categoryName =
                    work.category?.id && categoryMap[work.category.id]
                        ? categoryMap[work.category.id]
                        : "カテゴリなし";

                return (
                    <article key={work.id} className={styles.worksItem}>
                        <div className={styles.worksItemInner}>
                            <div className={styles.worksInfo}>
                                <div className={styles.worksItemTitle}>
                                    <Link
                                        href={`/works/${work.id}`}
                                        className={`selectArea ${styles.selectArea}`}
                                        onClick={(e) => {
                                            console.log(
                                                `Navigating to /works/${work.id}`
                                            );
                                            // クリックイベントの伝播を停止
                                            e.stopPropagation();
                                        }}
                                    >
                                        <h2>{work.title}</h2>
                                    </Link>
                                </div>
                                <div className={styles.worksData}>
                                    <div className={styles.date}>
                                        <p>Date</p>
                                        <p>
                                            {new Date(work.date)
                                                .toISOString()
                                                .split("T")[0]
                                                .split("-")
                                                .slice(0, 2)
                                                .join("/")}
                                        </p>
                                    </div>
                                    <div className={styles.category}>
                                        <p>Category</p>
                                        <p>{categoryName}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.worksImg}>
                                <Link
                                    href={`/works/${work.id}`}
                                    className={`selectArea ${styles.selectArea}`}
                                    onClick={(e) => {
                                        console.log(
                                            `Navigating to /works/${work.id}`
                                        );
                                        // クリックイベントの伝播を停止
                                        e.stopPropagation();
                                    }}
                                >
                                    <img
                                        src={work.eyechatch.url}
                                        alt={work.title}
                                        width="100%"
                                    />
                                </Link>
                            </div>
                        </div>
                    </article>
                );
            })}
        </div>
    );
}
