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
