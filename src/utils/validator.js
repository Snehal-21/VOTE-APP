export const passwordValidator = (password) => {
    if (password.length < 5) {
        throw new Error("Password should be at least 5 characters long.");
    }
    if (!/[A-Z]/.test(password)) {
        throw new Error("Password should contain at least one uppercase letter.");
    }
    if (!/[a-z]/.test(password)) {
        throw new Error("Password should contain at least one lowercase letter.");
    }
    if (!/\d/.test(password)) {
        throw new Error("Password should contain at least one digit.");
    }
    if (/\s/.test(password)) {
        throw new Error("Password should not contain whitespace.");
    }
    if (!/[!@#$%^&*]/.test(password)) {
        throw new Error("Password should contain at least one special character");
    }
};