/* eslint-disable prettier/prettier */
export function generateUUID() {
    const timestamp = new Date().getTime();
    const random = Math.floor(Math.random() * 10000);
    return `${timestamp}-${random}`;
}