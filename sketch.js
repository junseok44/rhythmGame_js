const recordBtn = document.querySelector(".recordBtn");
recordBtn.addEventListener("click", () => {
  if (System.mode == System.MODE.WAITING) {
    System.startRecording();
  } else if (System.mode == System.MODE.RECORD) {
    System.stopRecording();
  } else if (
    System.mode == System.MODE.PAUSE ||
    System.mode == System.MODE.PLAY
  ) {
    System.startRecording();
  }
});

// WAITING -> play -> pause -> play
const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", () => {
  if (System.mode == System.MODE.WAITING) {
    System.startPlaying();
  } else if (System.mode == System.MODE.PLAY) {
    System.pause();
  } else if (System.mode == System.MODE.PAUSE) {
    System.resume();
  }
});

// play -> WAITING
const replayBtn = document.querySelector(".replayBtn");
replayBtn.addEventListener("click", () => {
  if (System.mode == System.MODE.PAUSE) {
    System.replay();
  }
});

let gameManager;
let notePlayer;
let recorder;
let ui;

function setup() {
  let canvas = createCanvas(1000, 1000);
  canvas.parent("myCanvas");

  stroke(0);
  noFill();
  rectMode(CENTER);
  frameRate(System.frameRate);

  gameManager = new GameManager();
  gameManager.setLevel(1, 20);
  recorder = new Recorder();
  notePlayer = new NotePlayer(gameManager);
  ui = new UI(gameManager, notePlayer, recorder);

  System.changeMode(System.MODE.SELECT);
  // System.loadData(2);
}

function draw() {
  background(255);
  System.checkKeyReleased();
  ui.displayUI();
  switch (System.mode) {
    case System.MODE.SELECT:
      ui.displaySelectUI();
      break;
    case System.MODE.PLAY:
      if (notePlayer.isPlayerEnd) {
        System.gameEnd();
      } else {
        ui.displayPlayUI();
      }
      playBtn.innerText = "일시중지";
      notePlayer.play();
      YTplayer.playVideo();

      break;
    case System.MODE.WAITING:
      ui.displayWaitingUI();
      recordBtn.innerText = "녹음하기";
      playBtn.innerText = "재생하기";
      break;
    case System.MODE.RECORD:
      ui.displayRecordUI();
      recorder.record();
      notePlayer.playRecordNotes();
      recordBtn.innerText = "녹음중단";
      break;
    case System.MODE.PAUSE:
      ui.displayPauseUI();
      playBtn.innerText = "재생하기";
      notePlayer.pause();
      YTplayer.pauseVideo();
      break;
  }
}

function keyPressed() {
  if (keyCode == 65 && System.mode == System.MODE.WAITING) {
    System.startPlaying();
  }

  if (keyCode == 32 && System.mode == System.MODE.PLAY) {
    System.changeMode(System.MODE.PAUSE);
  } else if (keyCode == 32 && System.mode == System.MODE.PAUSE) {
    System.changeMode(System.MODE.PLAY);
  }
  if (keyCode == 82 && System.mode == System.MODE.PAUSE) {
    System.replay();
  }
}

// mode change에 관한 것들도 클래스 메서드로 만들어야 하나?
// 전역변수를 클래스 안에서 수정해줘도 되나?

// 녹음하기 -> 녹음 완료시 WAITING 모드로 전환

// 예를들어 오브젝트 time을 3초라고 한다면, 3초 뒤에는 딱 맞아야 하는데,
// 그렇다면 3초만큼 거리를 띄워놓아야 한다.
// 그런데 물체가 3초동안 움직이는 px는 어느정도?

// 3.24252 초만큼 가는 거리는?

// 예를들어 draw() 에서 -= 1 씩 한다고 한다면, 1초에 60px씩 내려가는거고
// 즉 frameRate * deltaPixelY = 60px
// 그러면 3초동안 180px를 내려가는거고
