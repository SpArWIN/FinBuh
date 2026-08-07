
import styles from './Footer.module.scss';
import {Container} from "../../Shared/UI/container/Container.tsx";

export function Footer() {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.inner}>
                    <a className={styles.logo} href="#top">
                        <span>Фин</span>БУХ
                    </a>

                    <p>© {new Date().getFullYear()} ФинБУХ. Финансовый анализ и бухгалтерское сопровождение.</p>
                </div>
            </Container>
        </footer>
    );
}