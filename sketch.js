// mode change에 관한 것들도 클래스 메서드로 만들어야 하나?
// 전역변수를 클래스 안에서 수정해줘도 되나?

// 녹음하기 -> 녹음 완료시 waiting 모드로 전환
const recordBtn = document.querySelector(".recordBtn");
recordBtn.addEventListener("click", () => {
  if (System.mode == System.modeMap.waiting) {
    System.changeMode(System.modeMap.record);
  } else if (System.mode == System.modeMap.record) {
    System.changeMode(System.modeMap.waiting);
  }
});

const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", () => {
  if (System.mode == System.modeMap.waiting) {
    if (localStorage.getItem("noteData")) {
      recorder.noteData = JSON.parse(localStorage.getItem("noteData"));
    }
    notePlayer.setNotes(recorder.noteData);

    System.changeMode(System.modeMap.play);
  } else if (System.mode == System.modeMap.play) {
    System.changeMode(System.modeMap.pause);
  } else if (System.mode == System.modeMap.pause) {
    System.changeMode(System.modeMap.play);
  }
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
  static modeMap = {
    waiting: "waiting",
    record: "record",
    play: "play",
    pause: "pause",
  };

  static changeMode(mode) {
    switch (mode) {
      case System.modeMap.waiting:
        System.mode = System.modeMap.waiting;
        // 이것도 하드코딩하지말자..
        recordBtn.innerText = "녹음하기";
        playBtn.innerText = "재생하기";
        recorder.stopRecording();
        break;
      case System.modeMap.record:
        System.mode = System.modeMap.record;
        recordBtn.innerText = "녹음중단";
        recorder.startRecord();
        break;
      case System.modeMap.play:
        System.mode = System.modeMap.play;
        playBtn.innerText = "일시중지";
        YTplayer.playVideo();
        break;
      case System.modeMap.pause:
        System.mode = System.modeMap.pause;
        playBtn.innerText = "재생하기";
        notePlayer.pause();
        YTplayer.pauseVideo();

        break;
    }
  }

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

class Recorder {
  constructor(displayTimeLapse) {
    this.recordStartDate = new Date();
    this.noteData = [];
    this.isRecording = true;
    this.displayTimeLapse = displayTimeLapse;
    this.isKeyPressed = {
      [System.keyCodeMap.q]: false,
      [System.keyCodeMap.w]: false,
      [System.keyCodeMap.e]: false,
      [System.keyCodeMap.r]: false,
    };
  }

  saveLocalStorage() {
    localStorage.setItem("noteData", JSON.stringify(this.noteData));
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

  startRecord() {
    this.isRecording = true;
    this.recordStartDate = new Date();
    this.noteData = [];
    YTplayer.playVideo();
  }

  record() {
    if (!this.isRecording) return;
    let timeLapse = new Date(new Date() - this.recordStartDate);
    this.checkKeyReleased();
    this.displayTimeLapse(timeLapse);
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
    this.saveLocalStorage();
    YTplayer.stopVideo();
  }
}

class NotePlayer {
  constructor(gameManager) {
    this.notes = [];
    this.gameManager = gameManager;
    this.isPlaying = false;
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

  pause() {
    this.isPlaying = false;
  }
}

class UI {
  constructor(gameManager, player) {
    this.gameManager = gameManager;
    this.player = player;
    this.isShowingResult = false;
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

  static displayTimeLapse(timeLapse) {
    textSize(30);
    fill(0);

    text(
      `${timeLapse.getMinutes()}분: ${timeLapse.getSeconds()}초 : ${timeLapse.getMilliseconds()}`,
      100,
      100
    );
  }

  displayPauseUI() {
    textSize(100);
    fill(0);
    text("Paused", width / 2, height / 2);
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

  displayResult() {
    textSize(100);
    fill(0);
    text("잘 했어요!!", width / 2, height / 2);
    text("당신의 점수: " + this.gameManager.score, width / 2, height / 2 + 100);
  }

  displayPlayUI() {
    this.displayScore();
    this.displayCombo();
    // if (this.player.isPlayerEnd && !this.resultTimer) {
    //   this.resultTimer = setTimeout(() => {
    //     this.result = true;
    //   }, 1500);
    // } else if (this.result) {
    //   this.displayResult();
    // } else {
    //   this.displayCombo();
    // }
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
  ui = new UI(gameManager, notePlayer);
  recorder = new Recorder(UI.displayTimeLapse);
}

function draw() {
  background(255);

  ui.displayUI();

  switch (System.mode) {
    case System.modeMap.play:
      notePlayer.play();
      ui.displayPlayUI();
      // if (notePlayer.isPlayerEnd && !ui.isShowingResult) {
      //   setTimeout(() => {
      //     ui.displayResult();
      //   }, 3000);
      //   ui.isShowingResult = true;
      // } else {
      //   ui.displayPlayUI();
      // }
      break;
    case System.modeMap.waiting:
      break;
    case System.modeMap.record:
      recorder.record();
      break;
    case System.modeMap.pause:
      ui.displayPauseUI();
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
