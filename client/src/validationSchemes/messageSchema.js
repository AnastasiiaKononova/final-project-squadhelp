import * as yup from 'yup';

export const messageSchema = yup.object({
    message: yup.string().trim().min(1, 'Message cannot be empty').required('Message is required'),
});