export enum LetterStatus {
    UNUSED,
    ABSENT,
    INCORRECT_POSITION,
    CORRECT_POSITION,
}

export interface StatusChar {
    char: string
    status: LetterStatus
}
