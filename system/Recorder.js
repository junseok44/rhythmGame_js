class Recorder {
  constructor(displayTimeLapse) {
    this.recordStartDate = new Date();
    this.noteData = [];
    this.isRecording = true;
    this.displayTimeLapse = displayTimeLapse;
  }

  saveLocalStorage() {
    localStorage.setItem("noteData", JSON.stringify(this.noteData));
  }

  // checkKeyReleased() {
  //   for (const key in this.isKeyPressed) {
  //     if (this.isKeyPressed[key]) {
  //       if (!keyIsDown(key)) {
  //         this.isKeyPressed[key] = false;
  //       }
  //     }
  //   }
  // }

  startRecord() {
    this.recordStartDate = new Date();
    this.noteData = [];
    YTplayer.playVideo();
  }

  record() {
    let timeLapse = new Date(new Date() - this.recordStartDate);
    this.displayTimeLapse(timeLapse);
    if (!System.isKeyPressed[keyCode] && keyIsDown(keyCode)) {
      System.isKeyPressed[keyCode] = true;
      this.noteData.push({
        time: timeLapse.getTime() / 1000,
        key: keyCode,
      });
      notePlayer.recordNotes.push(
        new RecordNote(
          timeLapse.getTime() / 1000,
          keyCode,
          notePlayer.gameManager
        )
      );
    }
  }

  stopRecording() {
    YTplayer.stopVideo();
  }
}
