export class QuerySuccess {
    private message: string;

    constructor(messages: string) {
        this.message = messages
    }
}

export class QueryError {
    private messages: string[];

    constructor(messages: string[]) {
        this.messages = messages
    }
}