import notifier from 'node-notifier';
import DateConverterError from "../4-2-timer/dateConverterError.js";
import DateConverter from "../4-2-timer/dateConverter.js";

const dateConverter = new DateConverter();

try {
    //Ожидается строка в формате 1w 2d 3h 4m 5s 6ms - можно передавать в любом порядке
    //Если значение будет передано дважды, например 4s 3s, то будет взято последнее
    let secondsFromParams = dateConverter.getTimeFromParams(process.argv);

    setTimeout(() => {
        notifier.notify({
            title: 'Таймер!',
            message: 'Ваш таймер на ' + secondsFromParams / 1000 + 's сработал',
        });
    }, secondsFromParams)

} catch (e) {
    if (e instanceof DateConverterError) {
        console.log('Ошибка выполнения:');
        console.log(e.message);
    } else {
        throw e;
    }
}