import DateConverterError from "./dateConverterError.js";

export default class DateConverter {
    parseParams(arParams) {
        let parsedParams = new Map();
        let validParamRegex = '^[0-9]+[a-z0-9]*[a-z]$';
        for (let i in arParams) {
            let validParam = arParams[i].match(validParamRegex);
            if (validParam) {
                let strParam = validParam[0];
                let number = strParam.match(/\d+/)[0];
                let param = strParam.replace(number, '');

                if (this.allowParams.get(param)) {
                    parsedParams.set(this.allowParams.get(param), Number(number))
                }

            }

        }
        return parsedParams;
    }
    getTimeFromParams(arParams) {
        let params = this.parseParams(arParams);
        let milliseconds = 0;

        if (params.size === 0) {
            throw new DateConverterError('Не указано ни одного валидного параметра. Укажите строку вида #number#day #number#hour и т.д.')
        }

        params.forEach((number, key) => {

            switch (key) {
                case 'week':
                    milliseconds += this.weeksToMilliseconds(number);
                    break;
                case 'day':
                    milliseconds += this.daysToMilliseconds(number);
                    break;
                case 'hour':
                    milliseconds += this.hoursToMilliseconds(number);
                    break;
                case 'minute':
                    milliseconds += this.minutesToMilliseconds(number);
                    break;
                case 'second':
                    milliseconds += this.secondsToMilliseconds(number);
                    break;
                case 'millisecond':
                    milliseconds += number;
                    break;
            }
        })

        return milliseconds;
    }
    weeksToMilliseconds(weeks) {
        return weeks * 7 * 24 * 60 * 60 * 1000;
    }
    daysToMilliseconds(days) {
        return days * 24 * 60 * 60 * 1000;
    }
    hoursToMilliseconds(hours) {
        return hours * 60 * 60 * 1000;
    }
    minutesToMilliseconds(minutes) {
        return minutes * 60 * 1000;
    }
    secondsToMilliseconds(seconds) {
        return seconds * 1000;
    }
    get allowParams () {
        return new Map([
            ['w', 'week'],
            ['week', 'week'],
            ['d', 'day'],
            ['day', 'day'],
            ['h', 'hour'],
            ['hour', 'hour'],
            ['m', 'minute'],
            ['minute', 'minute'],
            ['s', 'second'],
            ['second', 'second'],
            ['ms', 'millisecond'],
            ['millisecond', 'millisecond'],
        ])
    }
}