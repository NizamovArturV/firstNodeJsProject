import Calculator from "../4-1-calc/calculator.js";
import CalculatorError from "../4-1-calc/calculatorError.js";
import EventEmitter from 'events';

const eventEmitter = new EventEmitter();
const calculator = new Calculator();

const calculationInEvent = (firstNumber, secondNumber, operationCommand) => {
    try {
        eventEmitter.emit('result', calculator.compute(firstNumber, secondNumber, operationCommand));
    } catch (e) {
        eventEmitter.emit('error', e)
    }
}

for (const operationName of Object.keys(calculator.operationList)) {
    eventEmitter.on(operationName, calculationInEvent);
}

eventEmitter.on('result', (result) => {
    console.log('Результат вычислений:\n', result);
})

eventEmitter.on('error', (e) => {
    if (e instanceof CalculatorError) {
        console.log('Ошибка вычислений:');
        console.log(e.message);
    } else {
        throw e;
    }
})

const [ , , firstNumber, secondNumber, operationCommand] = process.argv;

try {
    if (firstNumber === undefined || secondNumber === undefined || operationCommand === undefined) {
        throw new CalculatorError('Не указаны обязательные аргументы! ' +
            'Введите аргументы по шаблону - node app.js #Первое число# #Второе число# #Оператор#');
    }
    calculator.validateOperation(operationCommand);
    eventEmitter.emit(operationCommand, firstNumber, secondNumber, operationCommand);
} catch (e) {
    if (e instanceof CalculatorError) {
        console.log('Ошибка вычислений:\n', e.message);
    } else {
        throw e;
    }
}