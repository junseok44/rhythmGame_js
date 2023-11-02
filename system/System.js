const displayResult_delayed = Utils.delayDisplay(() => {
  ui.displayResult();
}, 1000);

const backToWaiting_delayed = Utils.callOneTime(() => {
  YTplayer.stopVideo();
  System.changeMode(System.MODE.WAITING);
}, 3000);

class System {
  static frameRate = 60;
  static mode = "waiting";
  static MODE = {
    INTRO: "game_intro",
    SELECT: "select_song",
    WAITING: "waiting",
    RECORD: "record",
    PLAY: "play",
    PAUSE: "pause",
  };
  static currentSong;

  static changeMode(mode) {
    switch (mode) {
      case System.MODE.INTRO:
        System.mode = System.MODE.INTRO;
        break;
      case System.MODE.SELECT:
        System.mode = System.MODE.SELECT;
        break;
      case System.MODE.WAITING:
        System.mode = System.MODE.WAITING;
        break;
      case System.MODE.RECORD:
        System.mode = System.MODE.RECORD;
        break;
      case System.MODE.PLAY:
        System.mode = System.MODE.PLAY;
        break;
      case System.MODE.PAUSE:
        System.mode = System.MODE.PAUSE;
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

  static startRecording() {
    if (!System.currentSong) return;
    System.changeMode(System.MODE.RECORD);
    recorder.startRecord();
    YTplayer.playVideo();
  }

  static stopRecording() {
    YTplayer.stopVideo();
    System.changeMode(System.MODE.WAITING);
    recorder.saveLocalStorage();
  }

  static resume() {
    System.changeMode(System.MODE.PLAY);
  }

  static loadData(id) {
    let song = songData.filter((song) => song.id === id);
    if (song.length == 0) return;
    System.currentSong = song[0];
    notePlayer.setNotes(System.currentSong.noteData);
    videoId = System.currentSong.movieID;
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  }

  static startPlaying() {
    // if (localStorage.getItem("noteData")) {
    //   recorder.noteData = JSON.parse(localStorage.getItem("noteData"));
    // }
    // notePlayer.setNotes(recorder.noteData);

    // 예를 들어 mongoDB로부터 데이터를 받았어. 그럼 어떻게 하는데?
    System.loadData(System.currentSong.id);
    gameManager.reset();
    System.changeMode(System.MODE.PLAY);
  }

  static gameEnd() {
    gameManager.reset();
    displayResult_delayed();
    backToWaiting_delayed();
  }

  static pause() {
    System.changeMode(System.MODE.PAUSE);
  }

  static replay() {
    YTplayer.stopVideo(0);
    gameManager.reset();
    System.startPlaying();
  }
}
