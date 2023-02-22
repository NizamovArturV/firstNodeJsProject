import add from './calculationOperators/add.mjs';
import subtract from './calculationOperators/subtract.mjs';
import multiply from "./calculationOperators/multiply.mjs";
import divide from "./calculationOperators/divide.mjs";
import CalculatorError from "./calculatorError.mjs";


export default class Calculator {

    compute(firstNumber, secondNumber, operation) {
        let result = 0;

        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);

        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            throw new CalculatorError('Переданные параметры не являются числами')
        }

        switch (operation) {
            case 'add':
            case '+':
                result = add(firstNumber, secondNumber);
                break;
            case 'subtract':
            case '-':
                result = subtract(firstNumber, secondNumber);
                break;
            case 'multiply':
            case '*':
                result = multiply(firstNumber, secondNumber);
                break;
            case 'divide':
            case '/':
                result = divide(firstNumber, secondNumber);
                break;
            default:
                throw new CalculatorError('Такого оператора не существует');
        }

        return result;
    }
}