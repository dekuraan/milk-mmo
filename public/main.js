var socket = io();

riot.liveFeed = [];

socket.on("live_feed", function (data) {
    console.log(data);
    riot.liveFeed = data;
    riot.update();
});

socket.on("scoreboard", function (data) {
    console.log(data);
    riot.scoreboard = data.map(function (guild) {
        return {
            name: guild.name,
            points: guild.points
        }
    });
    console.log(riot.scoreboard)
    riot.update();
});

function drank(points) {
    socket.emit("drank", {
        name: document.getElementById('username').value,
        points: points
    });
}

function animateMilk(index) {
    milk.animate(500, "<>").plot(milk_points[index]);
}
const glass_points = '0,0 200,0 150,300 50,300';
var draw = SVG('drawing').size(200, 300);
var glass = draw.polygon(glass_points).fill({
    color: 'gray',
    opacity: 0.3
});
const milk_points = [
    [
        [56.666666666666664, 280],
        [143.33333333333334, 280],
        [143.33333333333334, 280],
        [56.666666666666664, 280]
    ],
    [
        [48.333333333333336, 230],
        [151.66666666666666, 230],
        [143.33333333333334, 280],
        [56.666666666666664, 280]
    ],
    [
        [40, 180],
        [160, 180],
        [143.33333333333334, 280],
        [56.666666666666664, 280]
    ],
    [
        [31.666666666666668, 130],
        [168.33333333333334, 130],
        [143.33333333333334, 280],
        [56.666666666666664, 280]
    ],
    [
        [23.333333333333336, 80],
        [176.66666666666666, 80],
        [143.33333333333334, 280],
        [56.666666666666664, 280]
    ],
    [
        [15, 30],
        [185, 30],
        [143.33333333333334, 280],
        [56.666666666666664, 280]
    ]
];

var milk_index = 5;
var milk;
milk = draw.polygon(milk_points[milk_index]).fill({
    color: 'white',
    opacity: 0.9
});
milk_index--;

var drinking = false;

function drink() {
    if (drinking) {
        console.log('already drinking')
    } else {
        var points_to_give = 0;
        drinking = true;
        console.log('drinking');

        if (milk_index == 0) {
            animateMilk(0);
            points_to_give += 100;
            milk_index = 5;
        }

        animateMilk(milk_index);
        points_to_give += 10;

        milk_index--;

        setTimeout(() => {
            drank(points_to_give);
            drinking = false;
        }, 500);
    }
}