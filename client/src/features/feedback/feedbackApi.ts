import type {CreateFeedbackRequest, CreateFeedbackResponse, ErrorResponse} from "../models/feedbackTypes.ts";
import {env} from "../../Shared/Config/env.ts";


export async function createFeedback(
    request: CreateFeedbackRequest,
    signal?: AbortSignal,
): Promise<CreateFeedbackResponse> {
    const response = await fetch(`${env.apiBaseUrl}/api/feedback/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
        signal,
    });

    if (!response.ok) {
        const error = (await response.json()) as ErrorResponse;

        throw new Error(error.message || 'Не удалось отправить заявку.');
    }

    return await response.json() as Promise<CreateFeedbackResponse>;
}