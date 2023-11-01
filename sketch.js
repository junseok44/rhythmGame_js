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

// mode change에 관한 것들도 클래스 메서드로 만들어야 하나?
// 전역변수를 클래스 안에서 수정해줘도 되나?

// 녹음하기 -> 녹음 완료시 waiting 모드로 전환

// 예를들어 오브젝트 time을 3초라고 한다면, 3초 뒤에는 딱 맞아야 하는데,
// 그렇다면 3초만큼 거리를 띄워놓아야 한다.
// 그런데 물체가 3초동안 움직이는 px는 어느정도?

// 3.24252 초만큼 가는 거리는?

// 예를들어 draw() 에서 -= 1 씩 한다고 한다면, 1초에 60px씩 내려가는거고
// 즉 frameRate * deltaPixelY = 60px
// 그러면 3초동안 180px를 내려가는거고
