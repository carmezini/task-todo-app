export default function loginValidate(values) {
    const errors = {};

    // Validate email address
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    // Validate password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.lenght < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20 characters";
    } else if (values.password.includes(' ')) {
        errors.password = "Invalid password";
    }

    return errors;
}

export function registerValidate(values) {
    const errors = {};

    // Validate username
    if (!values.name) {
        errors.name = "Required";
    }

    // Validate email address
    if (!values.email) {
        errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }


    // Validate password
    if (!values.password) {
        errors.password = "Required";
    } else if (values.password.lenght < 8 || values.password.length > 20) {
        errors.password = "Must be greater than 8 and less than 20 characters";
    } else if (values.password.includes(' ')) {
        errors.password = "Invalid password";
    }

    // Validate confirm password
    if (!values.cpassword) {
        errors.cpassword = "Required";
    } else if (values.password !== values.cpassword) {
        errors.cpassword = "Password must match";
    } else if (values.cpassword.includes(' ')) {
        errors.cpassword = "Invalid password";
    }

    return errors;
}