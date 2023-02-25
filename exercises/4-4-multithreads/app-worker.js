import {Worker} from 'worker_threads';
import generateArrOfNumbers from './generateArrOfNumbers.js';
import {performance, PerformanceObserver} from 'perf_hooks';
import OS from 'os';

const performanceObserver = new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry.name + ' : ' + entry.duration)
    })
})

performanceObserver.observe({entryTypes: ['measure']})


const compute = (arr, number) => {

    return new Promise((resolve, reject) => {
        const worker = new Worker('./worker.js', {
            workerData: {
                'arr': arr,
                'number': number
            }
        });

        worker.on('message', (msg) => {
            resolve(msg)
        });

        worker.on('error', (err) => {
            reject(err)
        })
    })
}

const main = async () => {
    const chunkCount = OS.cpus().length;
    const finishNumber = 300000;
    const chunkSize = finishNumber / chunkCount;
    performance.mark('start');

    const arr = generateArrOfNumbers(1, finishNumber);

    let allWorkers = [];
    let number = 3;

    for (let i = 0; i < arr.length; i += chunkSize) {
        const chunk = arr.slice(i, i + chunkSize);

        allWorkers.push(compute(chunk, number));
    }

    const result = await Promise.all(allWorkers);

    const sum = result.reduce((partialSum, a) => partialSum + a, 0)

    console.log(sum)

    performance.mark('finish')


    performance.measure('duration', 'start', 'finish');
}


main();