class UI {
  constructor(gameManager, player, recorder) {
    this.gameManager = gameManager;
    this.player = player;
    this.recorder = recorder;
    this.buttons = [
      new Controller(
        81,
        System.controllerPosition.q.x,
        System.controllerPosition.q.y,
        100,
        100,
        "Q"
      ),
      new Controller(
        87,
        System.controllerPosition.w.x,
        System.controllerPosition.w.y,
        100,
        100,
        "W"
      ),
      new Controller(
        69,
        System.controllerPosition.e.x,
        System.controllerPosition.e.y,
        100,
        100,
        "E"
      ),
      new Controller(
        82,
        System.controllerPosition.r.x,
        System.controllerPosition.r.y,
        100,
        100,
        "R"
      ),
    ];
    this.songButtons = songData.map(
      (song) =>
        new Button(
          width / 2,
          300 + song.id * 50,
          `${song.artist} - ${song.title}`,
          () => {
            System.loadData(song.id);
            System.changeMode(System.MODE.WAITING);
          }
        )
    );
  }

  displayRecordUI() {
    textSize(30);
    fill(0);
    text(
      `${this.recorder.timeLapse.getMinutes()}분: ${this.recorder.timeLapse.getSeconds()}초 : ${this.recorder.timeLapse.getMilliseconds()}`,
      100,
      100
    );
  }

  displayPauseUI() {
    textSize(100);
    fill(0);
    text("Paused", width / 2, height / 2);
    textSize(30);
    text("재개 : 스페이스바", width / 2, height / 2 + 100);
    text("재시작 : r키", width / 2, height / 2 + 150);
  }

  displayUI() {}

  displayScore() {
    push();
    textSize(50);
    fill(0);
    text(this.gameManager.score, 100, 100);
    pop();
  }

  displayCombo() {
    if (this.gameManager.displayText) {
      push();
      fill(0);
      textSize(100);
      text(this.gameManager.displayText, width / 2, height / 2);
      textSize(50);
      text(`Combo: ${this.gameManager.combo}`, width / 2, height / 2 + 100);
      pop();
    }
  }

  displayResult() {
    textSize(100);
    fill(0);
    text("잘 했어요!!", width / 2, height / 2);
    text("당신의 점수: " + this.gameManager.score, width / 2, height / 2 + 100);
  }

  displaySelectUI() {
    push();
    textSize(30);
    fill(0);
    text("곡 목록", width / 2, 100);

    for (const btn of this.songButtons) {
      btn.draw();
    }
    pop();
  }

  displayWaitingUI() {
    push();
    fill(0);
    textSize(50);
    text("준비가 되었다면 A키를 눌러주세요", width / 2, height / 2);
    pop();
  }

  displayPlayUI() {
    this.displayScore();
    this.displayCombo();
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }
  }
}
