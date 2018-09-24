class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y
    }
    toString() {
        return this.x + "," + this.y;
    }
    toArray() {
        return [this.x, this.y];
    }
}

class Milk {
    constructor(topleft, topright, bottomright, bottomleft) {
        this.topleft = topleft;
        this.topright = topright;
        this.bottomright = bottomright;
        this.bottomleft = bottomleft;
        this.svgstring = "" + topleft + " " + topright + " " + bottomright + " " + bottomleft;
        this.points = [topleft.toArray(), topright.toArray(), bottomright.toArray(), bottomleft.toArray()];
    }

    // draw() {
    //     this.polygon = draw.polygon(this.svgstring).fill("white");
    //     return this;
    // }

    animate(points, duration, delay) {
        this.duration = duration || 1000;
        this.delay = delay || 1000;
        this.polygon.animate({
            ease: '-',
            delay: this.delay
        }).plot(points);
        return this;
    }

    toString() {
        return "[[" + this.topleft + "],[ " + this.topright + "],[ " + this.bottomright + "],[ " + this.bottomleft + "]],";
    }
}

class EasyMilk extends Milk {
    constructor(height) {
        super(new Point(((280 - height) / 6) + 10, 280 - height), new Point(((280 - height) / -6) + 190, 280 - height), new Point(280 / -6 + 190, 280), new Point(280 / 6 + 10, 280));
        this.height = height;
    }
}
// var draw = SVG('drawing').size(200, 300);
// var backglass = draw.polygon('0,0 200,0 150,300 50,300').fill('grey').opacity(0.3);
var milk5 = new EasyMilk(250);
var milk4 = new EasyMilk(200);
var milk3 = new EasyMilk(150);
var milk2 = new EasyMilk(100);
var milk1 = new EasyMilk(50);
var milk0 = new EasyMilk(0);
// var milk = milk5.draw()
// var frontglass = draw.polygon('0,0 200,0 150,300 50,300').fill('grey').opacity(0.3);
console.log('const glassPoints = \'0,0 200,0 150,300 50,300\'');
console.log(milk0.toString());
console.log(milk1.toString());
console.log(milk2.toString());
console.log(milk3.toString());
console.log(milk4.toString());
console.log(milk5.toString());