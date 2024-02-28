export default class Account {
    account: string;
    password: string;
    constructor();
    setAll(d: any): this;
    getAccount(): string;
    getPassword(): string;
    setAccount(v: string): void;
    setPassord(v: string): void;
    json(): void;
}
