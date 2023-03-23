import DateConverterError from "./dateConverterError.js";

export default class DateConverter {
    get allowParams() {
        return {
            'w': this.weeksToMilliseconds,
            'week': this.weeksToMilliseconds,
            'd': this.daysToMilliseconds,
            'day': this.daysToMilliseconds,
            'h': this.hoursToMilliseconds,
            'hour': this.hoursToMilliseconds,
            'm': this.minutesToMilliseconds,
            'minute': this.minutesToMilliseconds,
            's': this.secondsToMilliseconds,
            'second': this.secondsToMilliseconds,
            'ms': this.millisecondsToMilliseconds,
            'millisecond': this.millisecondsToMilliseconds,
        }
    }

    get validParamRegex() {
        return '^[0-9]+[a-z0-9]*[a-z]$';
    }

    parseParams(arParams) {

        return arParams.reduce((parsedParams, param) => {
            const validParam = param.match(this.validParamRegex);
            if (validParam) {
                const strParam = validParam[0];
                const number = strParam.match(/\d+/)[0];
                const param = strParam.replace(number, '');

                if (this.allowParams[param]) {
                    parsedParams[param] = Number(number);
                }

            }
            return parsedParams
        }, {});
    }

    getTimeFromParams(arParams) {
        const params = this.parseParams(arParams);

        if (Object.keys(params).length === 0) {
            throw new DateConverterError('Не указано ни одного валидного параметра. Укажите строку вида #number#day #number#hour и т.д.')
        }

        return Object.keys(params).reduce((milliseconds, key) => {
            milliseconds += this.allowParams[key](params[key]);
            return milliseconds;
        }, 0);
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

    millisecondsToMilliseconds(milliseconds) {
        return Number(milliseconds);
    }
}