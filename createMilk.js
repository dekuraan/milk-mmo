var milkXY = [0, 0, 90, 0, 70, 140, 20, 140];
var milk2 = [0, 0, 85 / 90, 0, 67.5 / 70, 120 / 140, 17.5 / 20, 120 / 140];

for (var y = 0; y < 6; y++) {
    milkXY.forEach((x, i, a) => {
        a[i] = x * milk2[i] * 2
    })
    console.log(milkXY);
}
