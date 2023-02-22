export const LOGIN_REGEXP = /^(?=.*[a-zA-Z])([a-zA-Z0-9-_]){3,20}$/
export const NAME_REGEXP = /^[А-ЯЁA-Z][А-ЯЁA-Zа-яёa-z-]+$/
export const PASSWORD_REGEXP = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,40}$/
export const EMAIL_REGEXP = /.+@[^@]+[a-z]+\.[^@]{2,}$/
export const PHONE_REGEXP = /^[+-d]?\d{10,15}$/
