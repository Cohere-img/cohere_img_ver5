"use client";
import { useEffect } from "react"; // ← useEffectをインポート
import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Header from "../_components/Header";
import { initThreeScene } from "../utils/threeSetup";
import { addAmbientLight, addDirectionalLight } from "../utils/lights";
import { createTorus, createCylinder, createGlow } from "../utils/objects";
import { createFineParticles, animateParticles } from "../utils/particles";
import Footer from "../_components/Footer";

export default function Home() {
    useEffect(() => {
        const canvas = document.getElementById(
            "three-canvas"
        ) as HTMLCanvasElement;

        if (!canvas) return;

        const { scene, camera, renderer, composer } = initThreeScene(canvas);

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
    }, []);
    return (
        <>
            <div className={styles.bodyInner}>
                <Header />
                <section className={styles.philosophy}>
                    <div className={`inner ${styles.philosophyInner}`}>
                        <div className={styles.philosophyLeftArea}>
                            <div className={styles.pageTitle}>
                                <p>About</p>
                            </div>
                            <div className={styles.philosophyTitle}>
                                <div className={`mask`}>
                                    <h1>本質を感じる。</h1>
                                </div>
                                <p>Sense the essence.</p>
                            </div>
                            <div className={styles.philosophyText}>
                                <div className={`mask`}>
                                    <p>
                                        どんな商品も、最後に買うのは『人の気持ち』だ。
                                        <br />
                                        人の気持ちを動かすのは、数字や性能だけではない。
                                        <br />
                                        熱意や想い、一生懸命さといった不確定な要素が入り込み、そこに本質的な魅力が生まれる。
                                        <br />
                                        Cohere.imgは、その本質的な魅力を感覚と感情でとらえ、あなたらしい世界観をデザインする。
                                        <br />
                                        消費者の心に強く響き、共感と感動を生むデザインを通じて、理屈を超えた購買体験を提供する。
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={`mask ${styles.philosophyImg}`}>
                            <canvas
                                id="three-canvas"
                                className={styles.canvas}
                            ></canvas>
                        </div>
                    </div>
                </section>
                <section className={styles.selfIntroduction}>
                    <div className={`inner ${styles.selfIntroductionInner}`}>
                        <div className={styles.information}>
                            <div className={styles.name}>
                                <div className={`mask`}>
                                    <p className={styles.kanji}>渡部　生</p>
                                    <p className={styles.romaji}>
                                        Sho Watanabe
                                    </p>
                                </div>
                            </div>
                            <div className={styles.informationText}>
                                <p>
                                    秋田県生まれ。
                                    <br />
                                    建築系の大学を卒業し、デザイン工学修士課程を修了。
                                    <br />
                                    複数社でロゴマーク、webデザイン・構築、動画撮影・編集などの制作業務やブランディングなどに従事。
                                    <br />
                                    Cohere.imgを開業後、業務委託としてPR会社でクリエイティブを担当。動画制作やwebサイトの保守管理、修正調整などを行う。
                                    <br />
                                    映画を含む映像作品やジャンルを問わず音楽を鑑賞することを趣味にしている。
                                    <br />
                                    犬が好き。
                                </p>
                            </div>
                        </div>
                        <div className={`mask ${styles.selfIntroductionImg}`}>
                            <img
                                src="/img/top/aboutImg.jpg"
                                alt="profile"
                                width="100%"
                            />
                        </div>
                        <div className={styles.skillSet}>
                            <div className={styles.skillSetTitle}>
                                <h1>SKILL LIST</h1>
                            </div>
                            <div className={styles.skillSetTop}>
                                <div className={`mask ${styles.skillSetItem}`}>
                                    <div className={styles.skillName}>
                                        <p>web-Design</p>
                                    </div>
                                    <ul>
                                        <li>Figma</li>
                                    </ul>
                                </div>
                                <div className={`mask ${styles.skillSetItem}`}>
                                    <div className={styles.skillName}>
                                        <p>Cording</p>
                                    </div>
                                    <ul>
                                        <li>html</li>
                                        <li>css</li>
                                        <li>JavaScript</li>
                                        <li>TypeScript</li>
                                        <li>PHP</li>
                                    </ul>
                                </div>
                                <div className={`mask ${styles.skillSetItem}`}>
                                    <div className={styles.skillName}>
                                        <p>FlameWork</p>
                                    </div>
                                    <ul>
                                        <li>Next.js</li>
                                        <li>WordPress</li>
                                    </ul>
                                </div>
                                <div className={`mask ${styles.skillSetItem}`}>
                                    <div className={styles.skillName}>
                                        <p>Graphic Design</p>
                                    </div>
                                    <ul>
                                        <li>Illustrator</li>
                                        <li>Photoshop</li>
                                        <li>InDesign</li>
                                    </ul>
                                </div>
                            </div>
                            <div className={styles.skillSetUnder}>
                                <div className={`mask ${styles.skillSetItem}`}>
                                    <div className={styles.skillName}>
                                        <p>3DCG</p>
                                    </div>
                                    <ul>
                                        <li>Blender</li>
                                        <li>Substance 3D Stager</li>
                                    </ul>
                                </div>
                                <div className={`mask ${styles.skillSetItem}`}>
                                    <div className={styles.skillName}>
                                        <p>Photo / Video</p>
                                    </div>
                                    <ul>
                                        <li>Premiere Pro</li>
                                        <li>After Effects</li>
                                        <li>Lightroom</li>
                                    </ul>
                                </div>
                                <div className={`mask ${styles.skillSetItem}`}>
                                    <div className={styles.skillName}>
                                        <p>Communication</p>
                                    </div>
                                    <ul>
                                        <li>Slack</li>
                                        <li>Chatwork</li>
                                    </ul>
                                </div>
                                <div className={`mask ${styles.skillSetItem}`}>
                                    <div className={styles.skillName}>
                                        <p>Meeting</p>
                                    </div>
                                    <ul>
                                        <li>Google meet</li>
                                        <li>Zoom</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
