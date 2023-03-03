import generateArrOfNumbers from "./generateArrOfNumbers.js";
import getCountMultiplyOfNumber from "./getCountMultiplyOfNumber.js";
import {performance, PerformanceObserver} from 'perf_hooks';

const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry.name + ' : ' + entry.duration)
    })
})

performanceObserver.observe({entryTypes: ['measure']})


performance.mark('start');
const arr = generateArrOfNumbers(1, 300000);
console.log(getCountMultiplyOfNumber(arr, 3));
performance.mark('finish');
performance.measure('duration', 'start', 'finish');