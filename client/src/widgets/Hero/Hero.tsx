import { Button } from '../../Shared/UI/Button/Button';
import styles from './Hero.module.scss';
import {Container} from "../../Shared/UI/container/Container.tsx";

const stats = [
    {
        value: 'ИП / ООО',
        label: 'работаем с разными форматами бизнеса',
    },
    {
        value: 'Учёт',
        label: 'бухгалтерия, отчётность, налоги',
    },
    {
        value: 'Финансы',
        label: 'анализ, показатели, управленческая картина',
    },
];

export function Hero() {
    return (
        <section id="top" className={styles.hero}>
            <Container>
                <div className={styles.grid}>
                    <div className={styles.content}>
                        <p className={styles.eyebrow}>
                            Финансовый анализ и бухгалтерское сопровождение
                        </p>

                        <h1>
                            Бухгалтерия и финансы для бизнеса без лишней нагрузки
                        </h1>

                        <p className={styles.description}>
                            ФинБУХ помогает предпринимателям и компаниям вести учёт,
                            сдавать отчётность, разбирать цифры и принимать решения
                            на основе понятной финансовой картины.
                        </p>

                        <div className={styles.actions}>
                            <Button href="#feedback">Оставить заявку</Button>
                            <Button href="tel:+79999999999" variant="secondary">
                                Позвонить
                            </Button>
                        </div>

                        <div className={styles.stats}>
                            {stats.map((item) => (
                                <div className={styles.stat} key={item.value}>
                                    <strong>{item.value}</strong>
                                    <span>{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <aside className={styles.card}>
                        <div className={styles.cardHeader}>
                            <span>ФинБУХ</span>
                            <strong>аутсорсинг</strong>
                        </div>

                        <h2>Закрываем бухгалтерские и финансовые задачи под ключ</h2>

                        <ul>
                            <li>Ведение бухгалтерского учёта</li>
                            <li>Подготовка и сдача отчётности</li>
                            <li>Налоговые консультации</li>
                            <li>Финансовый анализ бизнеса</li>
                            <li>Управленческая отчётность</li>
                        </ul>
                    </aside>
                </div>
            </Container>
        </section>
    );
}