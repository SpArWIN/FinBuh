
import styles from './FeedbackForm.module.scss';
import {useFeedbackFormViewModel} from "../ViewModel/useFeedbackFormViewModel.ts";
import {Button} from "../../Shared/UI/Button/Button.tsx";

export function FeedbackForm() {
    const {
        form,
        isSubmitting,
        successMessage,
        errorMessage,
        updateField,
        submit,
    } = useFeedbackFormViewModel();

    return (
        <form className={styles.form} onSubmit={submit}>
            <div className={styles.field}>
                <label htmlFor="name">Имя</label>
                <input
                    id="name"
                    type="text"
                    value={form.name}
                    onChange={(event) => updateField('name', event.target.value)}
                    placeholder="Как к вам обращаться"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="contact">Телефон или email</label>
                <input
                    id="contact"
                    type="text"
                    value={form.contact}
                    onChange={(event) => updateField('contact', event.target.value)}
                    placeholder="+7 999 123-45-67 или email"
                    required
                />
            </div>

            <div className={styles.field}>
                <label htmlFor="message">Кратко о задаче</label>
                <textarea
                    maxLength={1000}
                    id="message"
                    value={form.message}
                    onChange={(event) => updateField('message', event.target.value)}
                    placeholder="Например: нужна бухгалтерия для ООО, консультация по налогам или финансовый анализ."
                    rows={5}
                    required
                />
            </div>

            <input
                className={styles.honeypot}
                type="text"
                value={form.website}
                onChange={(event) => updateField('website', event.target.value)}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
            />

            <Button type="submit" disabled={isSubmitting} className={styles.submit}>
                {isSubmitting ? 'Отправляем...' : 'Оставить заявку'}
            </Button>

            {successMessage && <p className={styles.success}>{successMessage}</p>}
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <p className={styles.policy}>
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
            </p>
        </form>
    );
}