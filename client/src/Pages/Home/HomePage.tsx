import styles from './HomePage.module.scss';
import {Header} from "../../widgets/Header/Header.tsx";
import {Hero} from "../../widgets/Hero/Hero.tsx";
import {ServicesSection} from "../../widgets/Services/ServicesSection.tsx";
import {ProcessSection} from "../../widgets/Process/ProcessSection.tsx";
import {ContactsSection} from "../../widgets/contacts/ContactsSection.tsx";
import {Footer} from "../../widgets/Footer/Footer.tsx";

export function HomePage() {
    return (
        <div className={styles.page}>
            <Header />
            <Hero />
            <ServicesSection />
            <ProcessSection />
            <ContactsSection />
            <Footer />
        </div>
    );
}