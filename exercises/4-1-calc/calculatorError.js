export default class CalculatorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CalculatorError';
    }
}