import Header from "../_components/Header";
import Footer from "../_components/Footer";
import type { Metadata } from "next";
import ContactForm from "./_components/ContactForm";

export default function page() {
    return (
        <>
            <div className="bodyInner">
                <Header />
                <section className={styles.contactTop}>
                    <div className={`inner ${styles.contactTopInner}`}>
                        <div className={`pageTitle ${styles.pageTitle}`}>
                            <p>Contact</p>
                        </div>
                        <ContactForm />
                    </div>
                </section>
                <Footer />
            </div>
        </>
    );
}
