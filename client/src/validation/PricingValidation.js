import * as yup from "yup";

export const PricingSchema = yup.object().shape({
    planName: yup.string().min(3).required("Plan Name is a required field"),
    quality: yup.string().min(3).required("Quality is a required field"),
    price: yup.number().positive().min(0).required("Price is a required field"),
    qualityID: yup.string().required("Quality is a required field"),
    screenCount: yup.number().positive().min(0).required("Screen Count is a required field"),
    downloadCount: yup.number().positive().min(0).required("Download Count is a required field"),
});