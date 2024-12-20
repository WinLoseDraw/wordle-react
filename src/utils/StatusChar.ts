export enum LetterStatus {
    UNUSED,
    ABSENT,
    INCORRECT_POSITION,
    CORRECT_POSITION,
}

export class StatusChar {
    char: string
    status: LetterStatus

    constructor(char: string, status: LetterStatus) {
        this.char = char
        this.status = status
    }
}