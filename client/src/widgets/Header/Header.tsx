import styles from './Header.module.scss';
import {Container} from "../../Shared/UI/container/Container.tsx";
import {Button} from "../../Shared/UI/Button/Button.tsx";

export function Header() {
    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.inner}>
                    <a className={styles.logo} href="#top" aria-label="ФинБУХ">
                        <span>Фин</span>БУХ
                    </a>

                    <nav className={styles.nav} aria-label="Главная навигация">
                        <a href="#services">Услуги</a>
                        <a href="#process">Как работаем</a>
                        <a href="#contacts">Контакты</a>
                    </nav>

                    <Button href="#feedback" variant="primary" className={styles.action}>
                        Оставить заявку
                    </Button>
                </div>
            </Container>
        </header>
    );
}