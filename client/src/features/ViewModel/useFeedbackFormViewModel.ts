import {type FormEvent, useState} from 'react';
import {createFeedback} from "../feedback/feedbackApi.ts";


type FormState = {
    name: string;
    contact: string;
    message: string;
    website: string;
};

const initialState: FormState = {
    name: '',
    contact: '',
    message: '',
    website: '',
};

export function useFeedbackFormViewModel() {
    const [form, setForm] = useState<FormState>(initialState);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
        setForm((current) => ({
            ...current,
            [key]: value,
        }));
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        setIsSubmitting(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await createFeedback(form);

            setSuccessMessage(response.message);
            setForm(initialState);
        } catch (error) {
            setErrorMessage(
                error instanceof Error
                    ? error.message
                    : 'Не удалось отправить заявку.',
            );
        } finally {
            setIsSubmitting(false);
        }
    }

    return {
        form,
        isSubmitting,
        successMessage,
        errorMessage,
        updateField,
        submit,
    };
}