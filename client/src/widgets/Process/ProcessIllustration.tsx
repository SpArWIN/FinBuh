import styles from './ProcessIllustration.module.scss';

export type ProcessVisualType = 'request' | 'analysis' | 'proposal' | 'work';

type ProcessIllustrationProps = {
    type: ProcessVisualType;
    title: string;
    text: string;
    stepIndex: number;
};
export function ProcessIllustration({
                                        type,
                                        title,
                                        text,
                                        stepIndex,
                                    }: ProcessIllustrationProps) {
    return (
        <div className={styles.visual} key={type}>
            <div className={styles.glow} />

            <div className={styles.header}>
                <span className={styles.badge}>Этап {stepIndex}</span>
                <strong>{title}</strong>
                <p>{text}</p>
            </div>

            <div className={styles.scene}>
                {type === 'request' && <RequestVisual />}
                {type === 'analysis' && <AnalysisVisual />}
                {type === 'proposal' && <ProposalVisual />}
                {type === 'work' && <WorkVisual />}
            </div>
        </div>
    );
}

function RequestVisual() {
    return (
        <svg viewBox="0 0 420 260" className={styles.svg} aria-hidden="true">
            <rect className={styles.panel} x="70" y="34" width="280" height="184" rx="28" />
            <rect className={styles.paper} x="112" y="62" width="196" height="132" rx="18" />
            <rect className={styles.lineAccent} x="138" y="92" width="112" height="10" rx="5" />
            <rect className={styles.line} x="138" y="120" width="144" height="8" rx="4" />
            <rect className={styles.line} x="138" y="146" width="98" height="8" rx="4" />
            <circle className={styles.coin} cx="300" cy="182" r="34" />
            <path className={styles.check} d="M285 181l10 10 22-26" />
        </svg>
    );
}

function AnalysisVisual() {
    return (
        <svg viewBox="0 0 420 260" className={styles.svg} aria-hidden="true">
            <rect className={styles.panel} x="52" y="40" width="316" height="178" rx="30" />
            <rect className={styles.chartPanel} x="94" y="70" width="232" height="118" rx="20" />
            <rect className={styles.barMuted} x="126" y="132" width="28" height="38" rx="8" />
            <rect className={styles.barMuted} x="170" y="110" width="28" height="60" rx="8" />
            <rect className={styles.barAccent} x="214" y="88" width="28" height="82" rx="8" />
            <path className={styles.graph} d="M122 116c30 10 48-32 78-18 26 12 36 44 84-4" />
            <circle className={styles.dot} cx="286" cy="94" r="7" />
        </svg>
    );
}

function ProposalVisual() {
    return (
        <svg viewBox="0 0 420 260" className={styles.svg} aria-hidden="true">
            <rect className={styles.panel} x="66" y="36" width="288" height="188" rx="30" />
            <rect className={styles.paper} x="104" y="58" width="212" height="150" rx="20" />
            <rect className={styles.lineAccent} x="132" y="88" width="126" height="10" rx="5" />
            <rect className={styles.line} x="132" y="116" width="150" height="8" rx="4" />
            <rect className={styles.line} x="132" y="142" width="120" height="8" rx="4" />
            <rect className={styles.priceTag} x="232" y="160" width="64" height="28" rx="14" />
            <path className={styles.pen} d="M289 70l34 34-76 76-42 8 8-42 76-76z" />
        </svg>
    );
}

function WorkVisual() {
    return (
        <svg viewBox="0 0 420 260" className={styles.svg} aria-hidden="true">
            <rect className={styles.panel} x="54" y="40" width="312" height="180" rx="30" />
            <rect className={styles.dashboard} x="88" y="70" width="244" height="120" rx="20" />
            <circle className={styles.coin} cx="132" cy="112" r="24" />
            <rect className={styles.lineAccent} x="174" y="94" width="92" height="10" rx="5" />
            <rect className={styles.line} x="174" y="120" width="126" height="8" rx="4" />
            <rect className={styles.line} x="174" y="146" width="86" height="8" rx="4" />
            <path className={styles.loop} d="M116 200c58 28 168 28 210-18" />
            <path className={styles.arrow} d="M315 181l18 0-8 17" />
        </svg>
    );
}