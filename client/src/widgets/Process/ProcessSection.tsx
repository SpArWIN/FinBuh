
import styles from './ProcessSection.module.scss';
import {Container} from "../../Shared/UI/container/Container.tsx";
import {ProcessIllustration, type ProcessVisualType} from "./ProcessIllustration.tsx";
import {useState} from "react";

type ProcessStep = {
    title: string;
    text: string;
    visualType: ProcessVisualType;
    visualTitle: string;
    visualText: string;
};
const steps: ProcessStep[] = [
    {
        title: 'Заявка',
        text: 'Вы оставляете контакт и кратко описываете задачу.',
        visualType: 'request',
        visualTitle: 'Фиксируем обращение',
        visualText: 'Контакт, задача и первичный контекст попадают в работу.',
    },
    {
        title: 'Первичный разбор',
        text: 'Уточняем формат бизнеса, текущие проблемы и объём работ.',
        visualType: 'analysis',
        visualTitle: 'Разбираем цифры',
        visualText: 'Смотрим учёт, отчётность, расходы, налоги и финансовую картину.',
    },
    {
        title: 'Предложение',
        text: 'Подбираем формат сопровождения и список задач.',
        visualType: 'proposal',
        visualTitle: 'Формируем план',
        visualText: 'Определяем объём работ, формат сопровождения и зоны ответственности.',
    },
    {
        title: 'Работа',
        text: 'Берём учёт, отчётность или финансовый анализ в регулярную работу.',
        visualType: 'work',
        visualTitle: 'Ведём процесс',
        visualText: 'Регулярно закрываем задачи, отчётность и финансовые вопросы.',
    },
];

export function ProcessSection() {
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    const activeStep = steps[activeStepIndex];

    return (
        <section id="process" className={styles.section}>
            <Container>
                <div className={styles.layout}>
                    <div className={styles.info}>
                        <p>Как работаем</p>

                        <h2>Понятный процесс без лишней бюрократии</h2>

                        <div className={styles.visualWrap}>
                            <ProcessIllustration
                                stepIndex={activeStepIndex+1}
                                type={activeStep.visualType}
                                title={activeStep.visualTitle}
                                text={activeStep.visualText}
                            />
                        </div>
                    </div>

                    <div className={styles.steps}>
                        {steps.map((step, index) => {
                            const isActive = index === activeStepIndex;

                            return (
                                <article
                                    className={`${styles.step} ${isActive ? styles.active : ''}`}
                                    key={step.title}
                                    tabIndex={0}
                                    onMouseEnter={() => setActiveStepIndex(index)}
                                    onFocus={() => setActiveStepIndex(index)}
                                    onClick={() => setActiveStepIndex(index)}
                                >
                                    <span>{String(index + 1).padStart(2, '0')}</span>

                                    <div>
                                        <h3>{step.title}</h3>
                                        <p>{step.text}</p>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </Container>
        </section>
    );
}