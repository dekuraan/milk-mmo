const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const low = require('lowdb');
const FileAsync = require('lowdb/adapters/FileAsync');

class Guild {

  constructor(name) {
    let p = 0
    this.name = name;
    this.points = p;
  }

  get area() {
    return this.name;
  }

  addPoints(additionalPoints) {
    this.points += additionalPoints;
  }

  print() {
    console.log('Name: ' + this.name + ", Points: " + this.points);
  }
}

let liveFeed = [];

app.use(express.static('public'))

const adapter = new FileAsync('db.json');
low(adapter)
  .then(async (db) => {
    try {
      let scoreboard = [];
      // let scoreboard = await db.get(scoreboard);

      const emitLiveFeed = () => {
        console.log(liveFeed.slice(0, 10))
        io.emit('live_feed', liveFeed.slice(0, 14));
        emitScoreboard();
      }
      const sortScoreBoard = () => {
        scoreboard.sort((first, second) => {
          return second.points - first.points;
        });
      }
      const emitScoreboard = () => {
        sortScoreBoard();
        io.emit('scoreboard', scoreboard.slice(0, 6));
      }

      io.on('connection', function (socket) {

        emitLiveFeed();

        socket.on('drank', function (data) {
          let guild = scoreboard.find(function (g) {
            return g.name == data.name;
          })
          if (typeof guild == "undefined") {
            scoreboard.push(new Guild(data.name))
            console.log(scoreboard)
            guild = scoreboard.find(function (g) {
              return g.name == data.name;
            });
            console.log(guild)
          }
          guild.addPoints(data.points);
          let type = "drank some";
          if (data.points == 100) type = "finished a glass of";
          liveFeed.unshift({
            name: data.name,
            type: type
          })
          emitLiveFeed();
        });

        socket.on('scoreboard', function () {
          emitScoreboard();
        });

      });

      http.listen(port, function () {
        console.log('listening on *:' + port);
      });
    } catch (e) {
      console.error(e)
    }
  }).catch(e => console.log(e));