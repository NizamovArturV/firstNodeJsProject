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

let firstNumber = process.argv[2];
let secondNumber = process.argv[3];
let operationCommand = process.argv[4];
let operationListView = '';


for (let operationName of calculator.operationList.keys()) {
    eventEmitter.on(operationName, calculationInEvent);
    operationListView += operationName + '\n';
}

eventEmitter.on('result', (result) => {
    console.log('Результат вычислений:');
    console.log(result);
})


eventEmitter.on('error', (e) => {
    if (e instanceof CalculatorError) {
        console.log('Ошибка вычислений:');
        console.log(e.message);
    } else {
        throw e;
    }
})

if (calculator.operationList.get(operationCommand) === undefined) {
    console.log('Такой операции не существует! Укажите одну из команд:');
    console.log(operationListView)
} else {
    eventEmitter.emit(operationCommand, firstNumber, secondNumber, operationCommand);
}