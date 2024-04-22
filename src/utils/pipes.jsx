export const textPipe = (text) => {
    return text.length > 15 ? text.slice(0, 14) + "..." : text
}