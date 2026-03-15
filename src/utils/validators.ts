export const validateEmail = (email: string) => {
    const emailRegex = /^[\w.+-]+@[a-z0-9-]+(\.[a-z0-9-]+)?\.[a-z]{2}$/i
    return emailRegex.test(email);
}