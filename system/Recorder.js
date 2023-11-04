class Recorder {
  constructor() {
    this.recordStartDate = new Date();
    this.noteData = [];
    this.isRecording = true;
    this.timeLapse = new Date();
  }

  getNoteData() {
    return this.noteData;
  }

  saveLocalStorage() {
    localStorage.setItem("noteData", JSON.stringify(this.noteData));
  }

  startRecord() {
    this.recordStartDate = new Date();
    this.noteData = [];
  }

  record() {
    let timeLapse = new Date(new Date() - this.recordStartDate);
    this.timeLapse = timeLapse;
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
}
