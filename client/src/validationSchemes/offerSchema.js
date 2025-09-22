import * as yup from 'yup';

export const logoOfferSchema = yup.object().shape({ 
    offerData: yup.mixed().required('required'),
});

export const textOfferSchema = yup.object().shape({ 
    offerData: yup.string().trim().min(1, 'Suggestion is required').required('Suggestion is required'),
});