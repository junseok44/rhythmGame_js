class NotePlayer {
  constructor(gameManager) {
    this.notes = [];
    this.recordNotes = [];
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
        new Note(
          noteData[i].time,
          noteData[i].key,
          this.gameManager,
          this.notes
        )
      );
    }
  }

  playRecordNotes() {
    for (let i = 0; i < this.recordNotes.length; i++) {
      this.recordNotes[i].draw();
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
