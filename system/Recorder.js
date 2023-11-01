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
