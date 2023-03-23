import add from './calculationOperators/add.js';
import subtract from './calculationOperators/subtract.js';
import multiply from './calculationOperators/multiply.js';
import divide from './calculationOperators/divide.js';
import CalculatorError from './calculatorError.js';


export default class Calculator {

    get operationList() {
        return {
            'add': add,
            '+': add,
            'subtract': subtract,
            '-': subtract,
            'multiply': multiply,
            '*': multiply,
            'divide': divide,
            '/': divide,
        }
    }

    compute(firstNumber, secondNumber, operation) {

        this.validateOperation(operation);
        operation = this.operationList[operation];

        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);

        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            throw new CalculatorError('Переданные параметры не являются числами');
        }

        return operation(firstNumber, secondNumber);
    }

    get operationListView() {
        return Object.keys(this.operationList).join('\n');
    }

    validateOperation(operation) {
        if (this.operationList[operation] === undefined) {
            throw new CalculatorError(
                'Такого оператора не существует! Укажите одну из команд:' + '\n' +
                this.operationListView
            );
        }
    }
}