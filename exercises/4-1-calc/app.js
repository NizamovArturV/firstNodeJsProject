import Calculator from './calculator.js';
import CalculatorError from './calculatorError.js';


const calculator = new Calculator();

let firstNumber = process.argv[2];
let secondNumber = process.argv[3];
let operationCommand = process.argv[4];

try {
    console.log('Результат вычислений:');
    console.log(calculator.compute(firstNumber, secondNumber, operationCommand));
} catch (e) {
    if (e instanceof CalculatorError) {
        console.log(e.message);
    } else {
        throw e;
    }
}