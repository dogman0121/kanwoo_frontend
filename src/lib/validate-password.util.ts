export enum VALIDATE_PASSWORD_RESULT {
    LESS_THAN_MIN_LENGTH,
    MORE_THAN_MAX_LENGTH,
    PUNKTUATION_MARKS_REQUIRED,
    LATIN_LOWERCASE_REQUIRED,          // нет строчных латинских букв
    LATIN_UPPERCASE_REQUIRED
}

export interface ValidationResult {
    result: boolean;
    detail: VALIDATE_PASSWORD_RESULT | null; // null при успехе
}

/**
 * Проверяет пароль на соответствие правилам:
 * - длина от 8 до 64 символов
 * - содержит хотя бы одну латинскую букву (A-Z или a-z)
 * - содержит хотя бы один знак препинания (из набора .,!?;:()[]{}<>'"\-)
 * 
 * @param password - проверяемая строка
 * @returns объект с полем result (true, если валиден) и detail (код ошибки или null)
 */
export function validatePassword(password: string): ValidationResult {
    const MIN_LENGTH = 8;
    const MAX_LENGTH = 64; 
    const LATIN_LOWERCASE_REGEX = /[a-z]/;
    const LATIN_UPPERCASE_REGEX = /[A-Z]/;
    const PUNKTUATION_REGEX = /[.,!?;:()\[\]{}<>'\"\-]/;

    // Проверка длины
    if (password.length < MIN_LENGTH) {
        return {
            result: false,
            detail: VALIDATE_PASSWORD_RESULT.LESS_THAN_MIN_LENGTH
        };
    }
    if (password.length > MAX_LENGTH) {
        return {
            result: false,
            detail: VALIDATE_PASSWORD_RESULT.MORE_THAN_MAX_LENGTH
        };
    }

    // Проверка наличия латинской буквы
    if (!LATIN_LOWERCASE_REGEX.test(password)) {
        return {
            result: false,
            detail: VALIDATE_PASSWORD_RESULT.LATIN_LOWERCASE_REQUIRED
        };
    }

    if (!LATIN_UPPERCASE_REGEX.test(password)) {
        return {
            result: false,
            detail: VALIDATE_PASSWORD_RESULT.LATIN_UPPERCASE_REQUIRED
        };
    }

    // Проверка наличия знака препинания
    // Используем набор часто встречающихся знаков (можно расширить)
    if (!PUNKTUATION_REGEX.test(password)) {
        return {
            result: false,
            detail: VALIDATE_PASSWORD_RESULT.PUNKTUATION_MARKS_REQUIRED
        };
    }

    // Все проверки пройдены
    return {
        result: true,
        detail: null
    };
}