export default class DateConverterError extends Error {
    constructor(message) {
        super(message);
        this.name = 'DateConverterError';
    }
}