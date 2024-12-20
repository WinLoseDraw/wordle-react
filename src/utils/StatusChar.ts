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

    getColor = () => {
        switch (this.status) {
            case LetterStatus.UNUSED:
                return 'white'
            case LetterStatus.ABSENT:
                return 'red'
            case LetterStatus.INCORRECT_POSITION:
                return 'yellow'
            case LetterStatus.CORRECT_POSITION:
                return 'green'
        }
    }
}