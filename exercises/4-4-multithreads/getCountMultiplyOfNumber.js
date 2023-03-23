export default function getCountMultiplyOfNumber(arr, number) {
    return arr.filter(el => el % number === 0).length;
}