export type CreateFeedbackRequest = {
    name: string;
    contact: string;
    message: string;
    website: string;
};

export type CreateFeedbackResponse = {
    message: string;
};

export type ErrorResponse = {
    code: string;
    message: string;
};