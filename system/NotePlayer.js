class NotePlayer {
  constructor(gameManager) {
    this.notes = [];
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
        new Note(noteData[i].time, noteData[i].key, this.gameManager)
      );
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
