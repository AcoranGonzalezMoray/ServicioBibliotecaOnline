export interface User {
    uid?: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    plan?: string,
    favoriteBooksList?: string[],
    followers?: string[],
    following?: string[],
    readingHistory?: [],
    rol: 'USER',
    notifications?: string[]
}