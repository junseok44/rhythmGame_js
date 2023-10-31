const recordBtn = document.querySelector(".recordBtn");
recordBtn.addEventListener("click", toggleRecord);
const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", () => {
  System.mode = "play";
  YTplayer.playVideo();
});

let gameManager;
let notePlayer;
let recorder;
let ui;

class Button {
  constructor(id, x, y, width, height, text, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width || 100;
    this.height = height || 100;
    this.text = text;
    this.color = color || 255;
    textAlign(CENTER, CENTER);
    textSize(20);
  }

  pressed() {
    this.color = 125;
  }

  drawBar() {
    // push();
    // let myY = this.y - this.height / 2 - 150;
    // let myX = this.x;
    // let myWidth = this.width;
    // let myHeight = 300;
    // let c1 = color(255, 0, 0); // Bottom color (fully opaque red)
    // let c2 = color(255, 0, 0, 0);
    // let steps = myHeight;
    // let alphaIncrement = 255 / steps;
    // for (let i = 0; i < steps; i++) {
    //   let interColor = lerpColor(c1, c2, i / steps);
    //   fill(
    //     red(interColor),
    //     green(interColor),
    //     blue(interColor),
    //     255 - i * alphaIncrement
    //   );
    //   rect(myX, myY, myWidth, myHeight / steps);
    //   myY -= myHeight / steps;
    // }
    // pop();
  }

  draw() {
    if (keyIsDown(this.id)) {
      this.color = 125;
      this.drawBar();
    } else {
      this.color = 255;
    }

    push();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    noStroke();

    fill(0);
    textSize(30);
    if (this.text) text(this.text, this.x, this.y);
    pop();
  }
}

class GameManager {
  constructor() {
    this.score = 0;
    this.combo = 0;
    this.levelMap = new Map();
  }

  calculateScore(distance) {
    if (distance < -100) {
      this.displayText = "Miss...";
      this.combo = 0;
    } else {
      if (distance <= 50) {
        this.combo++;
        this.score += 100;
        this.displayText = "완벽해!!";
      } else if (distance <= 100) {
        this.combo++;
        this.score += 50;
        this.displayText = "오우 굿!";
      } else if (distance <= 150) {
        this.combo++;
        this.score += 10;
        this.displayText = "굿";
      } else {
        this.displayText = "Bad...";
        this.combo = 0;
      }
    }
  }

  setLevel(stage, level) {
    this.levelMap.set(stage, level);
  }
}

class Note {
  constructor(time, code, gameManager) {
    switch (code) {
      case System.keyCodeMap.q:
        this.x = System.controllerPosition.q.x;
        break;
      case System.keyCodeMap.w:
        this.x = System.controllerPosition.w.x;
        break;
      case System.keyCodeMap.e:
        this.x = System.controllerPosition.e.x;
        break;
      case System.keyCodeMap.r:
        this.x = System.controllerPosition.r.x;
        break;
    }
    this.gameManager = gameManager;

    this.y =
      System.controllerPosition.q.y -
      time * System.frameRate * this.gameManager.levelMap.get(1);
    this.width = 80;
    this.height = 80;
    this.code = code;
    this.color = 0;
    this.isHit = false;
  }

  calculateScore() {
    let distance = System.controllerPosition.q.y - this.y;
    this.gameManager.calculateScore(distance);
  }

  draw() {
    push();

    if (this.y - System.controllerPosition.q.y >= 100 && !this.isHit) {
      this.isHit = true;
      this.calculateScore();
    }

    if (
      !this.isHit &&
      System.controllerPosition.q.y - this.y <= 200 &&
      keyIsDown(this.code)
    ) {
      this.color = "rgb(255, 0, 0)";
      this.isHit = true;
      this.calculateScore();
    }

    this.y += this.gameManager.levelMap.get(1);
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}

class LongNote {
  constructor() {}
}

class System {
  static frameRate = 60;
  static mode = "waiting";

  static controllerPosition = {
    q: { x: 350, y: 950 },
    w: { x: 450, y: 950 },
    e: { x: 550, y: 950 },
    r: { x: 650, y: 950 },
  };

  static keyCodeMap = {
    q: 81,
    w: 87,
    e: 69,
    r: 82,
  };
}

function toggleRecord() {
  if (System.mode == "waiting") {
    System.mode = "record";
    recordBtn.innerText = "녹음중단";
    recorder.startRecord();
  } else if (System.mode == "record") {
    System.mode = "waiting";
    recorder.stopRecording();
    recordBtn.innerText = "녹음하기";
  }
}

function setup() {
  let canvas = createCanvas(1000, 1000);
  stroke(0);
  noFill();
  rectMode(CENTER);
  frameRate(System.frameRate);
  canvas.parent("myCanvas");

  gameManager = new GameManager();
  gameManager.setLevel(1, 20);
  notePlayer = new NotePlayer(gameManager);
  recorder = new Recorder(notePlayer.setNotes.bind(notePlayer));
  ui = new UI(gameManager, notePlayer);

  // notes = [
  //   new Note(1.24252, System.keyCodeMap.q, gameManager),
  //   new Note(1.9124, keycodeMap.w, gameManager),
  //   new Note(2.1231, keycodeMap.e, gameManager),
  //   new Note(2.4421, keycodeMap.q, gameManager),
  //   new Note(2.9124, keycodeMap.w, gameManager),
  //   new Note(3.1231, keycodeMap.e, gameManager),
  //   new Note(3.4421, keycodeMap.q, gameManager),
  //   new Note(3.9124, keycodeMap.w, gameManager),
  //   new Note(4.1231, keycodeMap.e, gameManager),
  //   new Note(4.4421, keycodeMap.q, gameManager),
  //   new Note(4.9124, keycodeMap.w, gameManager),
  //   new Note(5.1231, keycodeMap.r, gameManager),
  //   new Note(5.4421, keycodeMap.r, gameManager),
  //   new Note(5.9124, keycodeMap.r, gameManager),
  //   new Note(6.1231, keycodeMap.w, gameManager),
  //   new Note(6.4421, keycodeMap.q, gameManager),
  //   new Note(6.9124, keycodeMap.e, gameManager),
  //   new Note(7.1231, keycodeMap.w, gameManager),
  //   new Note(7.4421, keycodeMap.q, gameManager),
  //   new Note(7.9124, keycodeMap.e, gameManager),
  //   new Note(8.1231, keycodeMap.w, gameManager),
  // ];
}

class Recorder {
  constructor(onEndRecording) {
    this.recordStartDate = new Date();
    this.noteData = [];
    this.isRecording = true;
    this.isKeyPressed = {
      [System.keyCodeMap.q]: false,
      [System.keyCodeMap.w]: false,
      [System.keyCodeMap.e]: false,
      [System.keyCodeMap.r]: false,
    };
    this.onEndRecording = onEndRecording;
  }

  checkKeyReleased() {
    for (const key in this.isKeyPressed) {
      if (this.isKeyPressed[key]) {
        if (!keyIsDown(key)) {
          this.isKeyPressed[key] = false;
        }
      }
    }
  }

  showTime(timeLapse) {
    textSize(30);
    fill(0);

    text(
      `${timeLapse.getMinutes()}분: ${timeLapse.getSeconds()}초 : ${timeLapse.getMilliseconds()}`,
      100,
      100
    );
  }

  startRecord() {
    this.isRecording = true;
    this.recordStartDate = new Date();
    this.noteData = [];
    YTplayer.playVideo();
  }

  record() {
    if (!this.isRecording) return;
    let timeLapse = new Date(new Date() - this.recordStartDate);
    this.showTime(timeLapse);
    this.checkKeyReleased();
    if (!this.isKeyPressed[keyCode] && keyIsDown(keyCode)) {
      this.isKeyPressed[keyCode] = true;
      this.noteData.push({
        time: timeLapse.getTime() / 1000,
        key: keyCode,
      });
    }
  }

  stopRecording() {
    this.isRecording = false;
    this.onEndRecording(this.noteData);
    YTplayer.stopVideo();
  }
}

class NotePlayer {
  constructor(gameManager) {
    this.notes = [];
    this.gameManager = gameManager;
  }

  get isPlayerEnd() {
    return this.notes.length !== 0 && this.notes.every((note) => note.isHit);
  }

  setNotes(noteData) {
    this.notes = [];
    for (let i = 0; i < noteData.length; i++) {
      this.notes.push(
        new Note(noteData[i].time, noteData[i].key, this.gameManager)
      );
    }
  }
  play() {
    for (let i = 0; i < this.notes.length; i++) {
      this.notes[i].draw();
    }
  }
}

class UI {
  constructor(gameManager, player) {
    this.gameManager = gameManager;
    this.player = player;
    this.buttons = [
      new Button(
        81,
        System.controllerPosition.q.x,
        System.controllerPosition.q.y,
        100,
        100,
        "Q"
      ),
      new Button(
        87,
        System.controllerPosition.w.x,
        System.controllerPosition.w.y,
        100,
        100,
        "W"
      ),
      new Button(
        69,
        System.controllerPosition.e.x,
        System.controllerPosition.e.y,
        100,
        100,
        "E"
      ),
      new Button(
        82,
        System.controllerPosition.r.x,
        System.controllerPosition.r.y,
        100,
        100,
        "R"
      ),
    ];
  }

  displayUI() {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }
  }

  displayScore() {
    push();
    textSize(50);
    fill(0);
    text(this.gameManager.score, 100, 100);
    pop();
  }

  displayCombo() {
    if (this.gameManager.displayText) {
      push();
      fill(0);
      textSize(100);
      text(this.gameManager.displayText, width / 2, height / 2);
      textSize(50);
      text(`Combo: ${this.gameManager.combo}`, width / 2, height / 2 + 100);
      pop();
    }
  }

  displayPlayUI() {
    this.displayScore();
    if (this.player.isPlayerEnd && !this.resultTimer) {
      this.resultTimer = setTimeout(() => {
        this.result = true;
      }, 1500);
    } else if (this.result) {
      textSize(100);
      fill(0);
      text("잘 했어요!!", width / 2, height / 2);
      text(
        "당신의 점수: " + this.gameManager.score,
        width / 2,
        height / 2 + 100
      );
    } else {
      this.displayCombo();
    }
  }
}

function draw() {
  background(255);

  ui.displayUI();

  switch (System.mode) {
    case "play":
      ui.displayPlayUI();
      notePlayer.play();
      break;
    case "waiting":
      break;
    case "record":
      recorder.record();
      break;
  }
}
// 예를들어 오브젝트 time을 3초라고 한다면, 3초 뒤에는 딱 맞아야 하는데,
// 그렇다면 3초만큼 거리를 띄워놓아야 한다.
// 그런데 물체가 3초동안 움직이는 px는 어느정도?

// 3.24252 초만큼 가는 거리는?

// 예를들어 draw() 에서 -= 1 씩 한다고 한다면, 1초에 60px씩 내려가는거고
// 즉 frameRate * deltaPixelY = 60px
// 그러면 3초동안 180px를 내려가는거고
