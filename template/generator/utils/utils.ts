export function toUpper(text: string): string {
    const sufix = text.slice(1);
    return text.charAt(0).toUpperCase() + sufix;
}

export function toLower(text: string): string {
    const sufix = text.slice(1);
    return text.charAt(0).toLowerCase() + sufix;
}