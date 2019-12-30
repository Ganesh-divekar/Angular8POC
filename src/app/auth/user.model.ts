export class User {
    constructor(public email: string,
        public id: string,
        private _token: string,
        private _tokenExpirationdate: Date) {

    }

    get token() {

        if (!this._tokenExpirationdate && this._tokenExpirationdate > new Date()) {
            return null;
        }
        return this._token;
    }
}