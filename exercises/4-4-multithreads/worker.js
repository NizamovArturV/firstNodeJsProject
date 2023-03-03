import {parentPort, workerData} from 'worker_threads';
import getCountMultiplyOfNumber from './getCountMultiplyOfNumber.js';


parentPort.postMessage(getCountMultiplyOfNumber(workerData.arr, workerData.number))