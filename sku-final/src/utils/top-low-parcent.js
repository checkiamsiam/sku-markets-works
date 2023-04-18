function topLowPercent(a, b) {
    let total = a + b;
    let percent = (a / total) * 100;
    return Math.round(percent);
}

console.log(topLowPercent(50, 50));

export default topLowPercent;
