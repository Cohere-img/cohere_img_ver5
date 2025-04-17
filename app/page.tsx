"use client";
import { useEffect } from "react"; // ← useEffectをインポート
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "./_components/Header";
import { initThreeScene } from "./utils/threeSetup";
import { addAmbientLight, addDirectionalLight } from "./utils/lights";
import { createTorus, createCylinder, createGlow } from "./utils/objects";
import { createFineParticles, animateParticles } from "./utils/particles";
import WorksMiniList from "./_components/WorksMiniList/index";
import NewsMiniList from "./_components/NewsMiniList/index";
import Footer from "./_components/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cohere.img | Home",
    description:
        "Cohere.imgは本質的な魅力を感覚でとらえ、あなたらしい世界観を気持ちを元に構築するデザイナーです。",
    keywords: [
        "Webデザイン",
        "ロゴデザイン",
        "グラフィックデザイン",
        "クリエイティブ",
        "デザインスタジオ",
        "デザイン",
        "フリーランス",
        "フリーランスデザイナー",
        "秋田県",
        "Web制作",
        "Webデザイン",
        "ロゴデザイン",
    ],
    openGraph: {
        title: "Cohere.img | Home",
        description:
            "Cohere.imgは本質的な魅力を感覚でとらえ、あなたらしい世界観を気持ちを元に構築するデザイナーです。",
        images: [
            {
                url: "/default-1200x630.png",
                width: 1200,
                height: 630,
                alt: "Cohere.img Home",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        images: ["/default-1200x630.png"],
    },
    alternates: {
        canonical: "https://cohere-img.design",
    },
};

export default function Home() {
    useEffect(() => {
        const init = async () => {
            const canvas = document.getElementById(
                "three-canvas"
            ) as HTMLCanvasElement;
            if (!canvas) return;

            const { scene, camera, renderer, composer } = await initThreeScene(
                canvas
            );

            addAmbientLight(scene);
            addDirectionalLight(scene);

            const torus = createTorus(scene);
            const cylinder = createCylinder(scene);
            createGlow(scene, cylinder);

            const fineParticles = createFineParticles(scene);

            const animate = () => {
                requestAnimationFrame(animate);

                animateParticles(fineParticles);

                const time = Date.now();
                const minAngleX = (-65 * Math.PI) / 180;
                const maxAngleX = (-5 * Math.PI) / 180;
                const minAngleY = (5 * Math.PI) / 180;
                const maxAngleY = (65 * Math.PI) / 180;

                const waveSpeedX = 0.2;
                const waveSpeedY = 0.1;

                torus.rotation.x =
                    minAngleX +
                    ((Math.sin(time * 0.001 * waveSpeedX) + 1) / 2) *
                        (maxAngleX - minAngleX);
                torus.rotation.y =
                    minAngleY +
                    ((Math.sin(time * 0.001 * waveSpeedY) + 1) / 2) *
                        (maxAngleY - minAngleY);

                torus.rotation.z += 0.005;

                composer.render();
            };

            animate();

            const handleResize = () => {
                renderer.setSize(window.innerWidth, window.innerHeight);
                composer.setSize(window.innerWidth, window.innerHeight);
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
            };

            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        };
        init();
    }, []);
    return (
        <>
            <div className="bodyInner">
                <Header />
                <section className={`mainVisual ${styles.mainVisual}`}>
                    <div className="mainVisualInner">
                        <canvas
                            id="three-canvas"
                            className={styles.canvas}
                        ></canvas>
                        <div className={styles.mainLogoArea}>
                            <div className={styles.mainLogoInner}>
                                <img
                                    src="/svgs/mainLogo.svg"
                                    alt="Main Logo"
                                    width="100%"
                                    className={styles.mainLogo}
                                />
                            </div>
                            <div className={styles.logoUnderArea}>
                                <div className={styles.tagLine}>
                                    <p>
                                        Cohere.img captures the essence of true
                                        appeal through sensation and emotion,
                                        designing a world that reflects your
                                        unique vision.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={styles.about}>
                    <div className={`inner ${styles.aboutInner}`}>
                        <div className={styles.aboutLeftBox}>
                            <div className={styles.aboutTitle}>
                                <div className={`mask`}>
                                    <h1>本質を感じる。</h1>
                                </div>
                                <p>Sense the essence.</p>
                            </div>
                            <div className={styles.aboutConts}>
                                <p>
                                    Cohere.imgは、本質的な魅力を感覚でとらえ、あなたらしい世界観を気持ちを元に構築するデザイナーです。
                                </p>
                            </div>
                            <div className={`linkBtn ${styles.aboutLinkBtn}`}>
                                <Link
                                    href="/about"
                                    className={styles.aboutAreaLink}
                                >
                                    <span>About</span>
                                </Link>
                            </div>
                        </div>
                        <div className={`mask ${styles.aboutImg}`}>
                            <img
                                src="/img/top/aboutImg.jpg"
                                alt="aboutImg"
                                width="100%"
                            />
                        </div>
                    </div>
                </section>

                <section className={styles.service}>
                    <div className={`inner ${styles.serviceInner}`}>
                        <div className={styles.serviceTitle}>
                            <h1>SERVICE</h1>
                            <div className={`linkBtn ${styles.serviceLinkBtn}`}>
                                <Link href="/service">
                                    <span>Service</span>
                                </Link>
                            </div>
                        </div>
                        <div className={`mask ${styles.serviceConts}`}>
                            <img
                                src="/svgs/serviceWebIcon.svg"
                                alt="webIcon"
                                width="100%"
                            />
                            <h2>Web</h2>
                        </div>
                        <div className={`mask ${styles.serviceConts}`}>
                            <img
                                src="/svgs/serviceLogoIcon.svg"
                                alt="logoIcon"
                                width="100%"
                            />
                            <h2>Logo / VI</h2>
                        </div>
                        <div className={`mask ${styles.serviceConts}`}>
                            <img
                                src="/svgs/serviceGraphicIcon.svg"
                                alt="graphicIcon"
                                width="100%"
                            />
                            <h2>Graphic</h2>
                        </div>
                        <div className={`mask ${styles.serviceConts}`}>
                            <img
                                src="/svgs/serviceVisualIcon.svg"
                                alt="visualIcon"
                                width="100%"
                            />
                            <h2>
                                Visual
                                <span style={{ display: "block" }}></span>
                                Contents
                            </h2>
                        </div>
                    </div>
                </section>

                <section className={styles.works}>
                    <div className={`inner ${styles.worksInner}`}>
                        <div className={styles.worksTitle}>
                            <h1>WORKS</h1>
                            <div className={`linkBtn ${styles.worksLinkBtn}`}>
                                <Link href="/works">
                                    <span>Works</span>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.worksConts}>
                            <WorksMiniList />
                        </div>
                    </div>
                </section>

                <section className={styles.news}>
                    <div className={`inner ${styles.newsInner}`}>
                        <div className={styles.newsTitle}>
                            <h1>NEWS</h1>
                            <div className={`linkBtn ${styles.worksLinkBtn}`}>
                                <Link href="/news">
                                    <span>News</span>
                                </Link>
                            </div>
                        </div>
                        <div className={styles.newsConts}>
                            <NewsMiniList />
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
