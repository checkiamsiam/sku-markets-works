// crate a function that takes a number and returns a string with the number in mils and bil
// 1 M = 1000000
// 1 B = 1000000000
// 1 T = 1000000000000

function milBil(num) {
    if (num >= 1000000000000) {
        return `${(num / 1000000000000).toFixed(2)}T`;
    } else if (num >= 1000000000) {
        return `${(num / 1000000000).toFixed(2)}B`;
    } else if (num >= 1000000) {
        return `${(num / 1000000).toFixed(2)}M`;
    } else {
        return num;
    }
}

export default milBil;
