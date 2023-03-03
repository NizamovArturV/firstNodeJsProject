export default function generateArrOfNumbers(startNumber, finishNumber) {
    const arr = [];

    for (let i = startNumber; i < finishNumber; i++) {
        arr.push(i)
    }
    arr.map((x) => {
        Math.random() > 0.5 ? x * 2 : x / 3
    })
    return arr;
}