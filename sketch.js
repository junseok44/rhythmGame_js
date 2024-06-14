const recordBtn = document.querySelector(".recordBtn");
recordBtn.addEventListener("click", () => {
  if (system.mode == System.MODE.WAITING) {
    system.startRecording();
  } else if (system.mode == System.MODE.RECORD) {
    system.stopRecording();
  } else if (
    system.mode == System.MODE.PAUSE ||
    system.mode == System.MODE.PLAY
  ) {
    system.startRecording();
  }
});

// WAITING -> play -> pause -> play
const playBtn = document.querySelector(".playBtn");
playBtn.addEventListener("click", () => {
  if (system.mode == System.MODE.WAITING) {
    system.startPlaying();
  } else if (system.mode == System.MODE.PLAY) {
    system.pause();
  } else if (system.mode == System.MODE.PAUSE) {
    system.resume();
  }
});

// play -> WAITING
const replayBtn = document.querySelector(".replayBtn");
replayBtn.addEventListener("click", () => {
  if (system.mode == System.MODE.PAUSE) {
    system.replay();
  }
});

const songSelectBtn = document.querySelector(".songSelectBtn");
songSelectBtn.addEventListener("click", () => {
  system.backToSelect();
});

let system;
let gameManager;
let notePlayer;
let recorder;
let ytPlayer;
let ui;
let songLibrary;
let hitSound;

function preload() {
  hitSound = loadSound("assets/hit.wav");
}

function setup() {
  let canvas = createCanvas(800, 800);
  canvas.parent("myCanvas");

  stroke(0);
  noFill();
  rectMode(CENTER);
  frameRate(System.frameRate);

  gameManager = new GameManager();
  gameManager.setLevel(1, 20);

  recorder = new Recorder();
  songLibrary = new SongLibrary();
  ytPlayer = new YouTubePlayer();

  notePlayer = new NotePlayer(gameManager);
  ui = new UI(gameManager, notePlayer, recorder, songLibrary.songData);
  system = new System(songLibrary, recorder, ytPlayer, gameManager, notePlayer);
}

function draw() {
  background(255);
  System.checkKeyReleased();
  ui.displayUI();
  switch (system.mode) {
    case System.MODE.SELECT:
      ui.displaySelectUI();
      break;
    case System.MODE.PLAY:
      if (notePlayer.isPlayerEnd) {
        system.gameEnd();
      } else {
        ui.displayPlayUI();
      }
      playBtn.innerText = "일시중지";
      notePlayer.play();
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
      break;
  }
}

function keyPressed() {
  if (keyCode == 65 && system.mode == System.MODE.WAITING) {
    system.startPlaying();
  }
  if (keyCode == 32 && system.mode == System.MODE.PLAY) {
    system.pause();
  } else if (keyCode == 32 && system.mode == System.MODE.PAUSE) {
    system.resume();
  }
  if (keyCode == 82 && system.mode == System.MODE.PAUSE) {
    system.replay();
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
