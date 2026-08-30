
import styles from './ContactSection.module.scss';
import {Container} from "../../Shared/UI/container/Container.tsx";
import {FeedbackForm} from "../../features/UI/FeedbackForm.tsx";

export function ContactsSection() {
    return (
        <section id="contacts" className={styles.section}>
            <Container>
                <div className={styles.layout}>
                    <div className={styles.content}>
                        <p className={styles.label}>Связаться</p>

                        <h2>Оставьте заявку — мы подскажем подходящий формат работы</h2>

                        <p className={styles.description}>
                            Напишите, что нужно: бухгалтерское сопровождение, отчётность,
                            консультация, финансовый анализ или разбор текущей ситуации.
                        </p>

                        <div className={styles.contacts}>
                            <a href="tel:+79997359842">
                                <span>Телефон</span>
                                +7 79997359842
                            </a>

                            <a href="mailto:info@finbuhsystem.ru">
                                <span>Email</span>
                                info@finbuhsystem.ru
                            </a>
                        </div>
                    </div>

                    <div id="feedback" className={styles.formWrap}>
                        <FeedbackForm />
                    </div>
                </div>
            </Container>
        </section>
    );
}