import add from './calculationOperators/add.js';
import subtract from './calculationOperators/subtract.js';
import multiply from './calculationOperators/multiply.js';
import divide from './calculationOperators/divide.js';
import CalculatorError from './calculatorError.js';


export default class Calculator {

    get operationList() {
        return new Map([
            ['add', 'add'],
            ['+', 'add'],
            ['subtract', 'subtract'],
            ['-', 'subtract'],
            ['multiply', 'multiply'],
            ['*', 'multiply'],
            ['divide', 'divide'],
            ['/', 'divide'],
        ]);
    }

    compute(firstNumber, secondNumber, operation) {

        if (firstNumber === undefined || secondNumber === undefined || operation === undefined) {
            throw new CalculatorError('Не указаны обязательные аргументы! ' +
                'Введите аргументы по шаблону - node app.js #Первое число# #Второе число# #Оператор#');
        }

        let result = 0;
        operation = this.operationList.get(operation);

        if (operation === undefined) {
            throw new CalculatorError('Такого оператора не существует');
        }

        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);

        if (isNaN(firstNumber) || isNaN(secondNumber)) {
            throw new CalculatorError('Переданные параметры не являются числами');
        }

        switch (operation) {
            case 'add':
                result = add(firstNumber, secondNumber);
                break;
            case 'subtract':
                result = subtract(firstNumber, secondNumber);
                break;
            case 'multiply':
                result = multiply(firstNumber, secondNumber);
                break;
            case 'divide':
                result = divide(firstNumber, secondNumber);
                break;
        }

        return result;
    }
}