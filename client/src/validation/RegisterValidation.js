import * as yup from "yup";

const PASSWORD_RULES = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;

export const RegisterSchema = yup.object().shape({
    username: yup.string().min(5).required(),
    email: yup.string().email().matches(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address").required(),
    password: yup
        .string()
        .matches(PASSWORD_RULES, { message: 'Password is weak' })
        .min(6, "Password length is not enough")
        .required("Password is required"),
    confirmPassword: yup
        .string()
        .matches(PASSWORD_RULES, { message: 'Password is weak' })
        .oneOf(
            [yup.ref("password"), null],
            "Confirm password doesn't match password"
        )
        .min(6, "Confirm password length is not enough")
        .required("Confirm password is required"),
});