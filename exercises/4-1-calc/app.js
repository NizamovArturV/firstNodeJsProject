import Calculator from './calculator.js';
import CalculatorError from './calculatorError.js';


const calculator = new Calculator();

const [ , , firstNumber, secondNumber, operationCommand] = process.argv;

try {
    if (firstNumber === undefined || secondNumber === undefined || operationCommand === undefined) {
        throw new CalculatorError('Не указаны обязательные аргументы! ' +
            'Введите аргументы по шаблону - node app.js #Первое число# #Второе число# #Оператор#');
    }
    console.log('Результат вычислений:\n', calculator.compute(firstNumber, secondNumber, operationCommand));
} catch (e) {
    if (e instanceof CalculatorError) {
        console.log(e.message);
    } else {
        throw e;
    }
}