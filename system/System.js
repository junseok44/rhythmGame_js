const displayResult_delayed = Utils.delayDisplay(() => {
  ui.displayResult();
}, 1000);

const backToWaiting_delayed = Utils.callOneTime(() => {
  gameManager.reset();
  ytPlayer.stopVideo();
  system.changeMode(System.MODE.WAITING);
}, 3000);

class System {
  constructor(songLibrary, recorder, ytPlayer, gameManager, notePlayer) {
    this.songLibrary = songLibrary;
    this.mode = System.MODE.SELECT;
    this.ytPlayer = ytPlayer;
    this.recorder = recorder;
    this.gameManager = gameManager;
    this.notePlayer = notePlayer;
    this.currentSong = null;
  }

  static frameRate = 60;
  static MODE = {
    INTRO: "game_intro",
    SELECT: "select_song",
    WAITING: "waiting",
    RECORD: "record",
    PLAY: "play",
    PAUSE: "pause",
  };

  static controllerPosition = {
    q: { x: 250, y: 750 },
    w: { x: 350, y: 750 },
    e: { x: 450, y: 750 },
    r: { x: 550, y: 750 },
  };

  static keyCodeMap = {
    q: 81,
    w: 87,
    e: 69,
    r: 82,
  };

  static isKeyPressed = {
    [System.keyCodeMap.q]: false,
    [System.keyCodeMap.w]: false,
    [System.keyCodeMap.e]: false,
    [System.keyCodeMap.r]: false,
  };

  static checkKeyReleased() {
    for (const key in this.isKeyPressed) {
      if (this.isKeyPressed[key]) {
        if (!keyIsDown(key)) {
          this.isKeyPressed[key] = false;
        }
      }
    }
  }

  static checkKeyPressed() {
    for (const key in this.isKeyPressed) {
      if (!this.isKeyPressed[key]) {
        if (keyIsDown(key)) {
          this.isKeyPressed[key] = true;
        }
      }
    }
  }

  changeMode(mode) {
    switch (mode) {
      case System.MODE.INTRO:
        this.mode = System.MODE.INTRO;
        break;
      case System.MODE.SELECT:
        this.mode = System.MODE.SELECT;
        break;
      case System.MODE.WAITING:
        this.mode = System.MODE.WAITING;
        break;
      case System.MODE.RECORD:
        this.mode = System.MODE.RECORD;
        break;
      case System.MODE.PLAY:
        this.mode = System.MODE.PLAY;
        break;
      case System.MODE.PAUSE:
        this.mode = System.MODE.PAUSE;
        break;
    }
  }

  startRecording() {
    if (!system.currentSong) return;
    this.changeMode(System.MODE.RECORD);
    this.recorder.startRecord();
    this.ytPlayer.stopVideo(0);
    this.ytPlayer.startVideo();
  }

  stopRecording() {
    this.ytPlayer.stopVideo();
    this.changeMode(System.MODE.WAITING);
    console.log(this.recorder.noteData);
    this.recorder.saveLocalStorage();
  }

  resume() {
    this.ytPlayer.startVideo();
    this.changeMode(System.MODE.PLAY);
  }

  setCurrentSong(id) {
    this.currentSong = this.songLibrary.findSong(id);
  }

  loadVideo() {
    this.ytPlayer.changeVideo(this.currentSong.movieID);
  }

  backToSelect() {
    this.ytPlayer.stopVideo();
    system.changeMode(System.MODE.SELECT);
  }

  startPlaying() {
    if (!this.currentSong) return;
    this.gameManager.reset();
    this.ytPlayer.stopVideo(0);
    this.ytPlayer.startVideo();
    this.notePlayer.setNotes(this.currentSong.noteData);
    this.changeMode(System.MODE.PLAY);
  }

  gameEnd() {
    displayResult_delayed();
    backToWaiting_delayed();
  }

  pause() {
    this.ytPlayer.pauseVideo();
    this.changeMode(System.MODE.PAUSE);
  }

  replay() {
    this.ytPlayer.stopVideo(0);
    this.gameManager.reset();
    this.startPlaying();
  }
}
