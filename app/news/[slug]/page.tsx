import { client, Topic, getCategoryMap } from "../../../libs/client";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../../_components/Header";
import Footer from "../../_components/Footer";

export default async function TopicsPage(props: Props) {
    const { slug } = props.params; // Promise を解決してから値を取得
    if (!slug) {
        return <p>Error: Missing slug</p>;
    }

    try {
        // データを並行して取得
        const [topic, categoryMap] = await Promise.all([
            client.get<Topic>({ endpoint: "news", contentId: slug }),
            getCategoryMap(),
        ]);

        if (!topic) {
            return <p>Topic not found</p>;
        }

        const categoryName =
            topic.category?.id && categoryMap[topic.category.id]
                ? categoryMap[topic.category.id]
                : "カテゴリなし";

        // ページの内容をレンダリング
        return (
            <div className="bodyInner">
                {/* ページのコンテンツ */}
                <Header />
                <div className={styles.posterArea}>
                    <img src={topic.poster.url} alt="topicImg" width="100%" />
                </div>
                <section className={styles.newsInfo}>
                    <div className={`inner ${styles.newsInfoInner}`}>
                        <div className={styles.contentTitle}>
                            <h1>{topic.title}</h1>
                        </div>
                        <div className={styles.date}>
                            <ul>
                                <li>Date</li>
                                <li>
                                    {new Date(topic.createdAt)
                                        .toISOString()
                                        .slice(0, 10)
                                        .replace(/-/g, "/")}
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className={styles.newsContent}>
                    <div className={`inner ${styles.newsContentInner}`}>
                        <div
                            className={styles.newsContentBox}
                            dangerouslySetInnerHTML={{
                                __html: topic.contents,
                            }}
                        />
                    </div>
                </section>
                <Footer />
            </div>
        );
    } catch (error) {
        console.error("Error rendering TopicsPage:", error);
        return <p>Error loading page</p>;
    }
}
