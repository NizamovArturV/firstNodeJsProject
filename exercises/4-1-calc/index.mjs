import Calculator from "./calculator.mjs";
import CalculatorError from "./calculatorError.mjs";


const calculator = new Calculator();

let firstNumber = process.argv[2];
let secondNumber = process.argv[3];
let operationCommand = process.argv[4];

if (firstNumber === undefined || secondNumber === undefined || operationCommand === undefined) {
    console.log('Не указаны обязательные аргументы!');
    console.log('Введите аргументы по шаблону - node index.mjs #Первое число# #Второе число# #Оператор#');
} else {
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
}


