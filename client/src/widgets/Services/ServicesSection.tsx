
import styles from './ServicesSection.module.scss';
import {Container} from "../../Shared/UI/container/Container.tsx";
import type {ReactNode} from "react";

type ServiceItem = {
    title: string;
    text: string;
    icon: ReactNode;
};

const services: ServiceItem[] = [
    {
        title: 'Бухгалтерский учёт',
        text: 'Ведение учёта, первичные документы, контроль операций и подготовка к закрытию периодов.',
        icon: <AccountingIcon />,
    },
    {
        title: 'Налоговая отчётность',
        text: 'Подготовка и сдача отчётности, контроль сроков, помощь с налоговыми вопросами.',
        icon: <TaxIcon />,
    },
    {
        title: 'Финансовый анализ',
        text: 'Разбор доходов, расходов, прибыли, обязательств и ключевых показателей бизнеса.',
        icon: <AnalyticsIcon />,
    },
    {
        title: 'Управленческая отчётность',
        text: 'Понятные отчёты для собственника: движение денег, прибыльность, структура затрат.',
        icon: <ReportIcon />,
    },
];

export function ServicesSection() {
    return (
        <section id="services" className={styles.section}>
            <Container>
                <div className={styles.header}>
                    <p>Услуги</p>
                    <h2>Что берём на себя</h2>
                </div>

                <div className={styles.grid}>
                    {services.map((service) => (
                        <article className={styles.card} key={service.title}>
                            <div className={styles.iconWrap}>
                                {service.icon}
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.text}</p>
                        </article>
                    ))}
                </div>
            </Container>
        </section>
    );

}

function AccountingIcon() {
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M9 4h14a2 2 0 0 1 2 2v20a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
            <path d="M12 9h8M12 14h8M12 19h3M19 19h1M12 23h3M19 23h1" />
        </svg>
    );
}

function TaxIcon() {
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M8 5h12l4 4v18H8V5Z" />
            <path d="M20 5v5h5" />
            <path d="M11 21 21 11" />
            <circle cx="12" cy="12" r="2" />
            <circle cx="20" cy="20" r="2" />
        </svg>
    );
}

function AnalyticsIcon() {
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M6 25h20" />
            <path d="M9 21v-5" />
            <path d="M16 21V9" />
            <path d="M23 21v-9" />
            <path d="M8 12c4 2 7-5 11-2 2 2 3 4 6 1" />
        </svg>
    );
}

function ReportIcon() {
    return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
            <path d="M7 6h18v20H7V6Z"/>
            <path d="M11 11h10"/>
            <path d="M11 16h10"/>
            <path d="M11 21h5"/>
            <path d="M21 21l2 2 4-5"/>
        </svg>
    )
}