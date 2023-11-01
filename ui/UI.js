class UI {
  constructor(gameManager, player) {
    this.gameManager = gameManager;
    this.player = player;
    this.isShowingResult = false;
    this.buttons = [
      new Button(
        81,
        System.controllerPosition.q.x,
        System.controllerPosition.q.y,
        100,
        100,
        "Q"
      ),
      new Button(
        87,
        System.controllerPosition.w.x,
        System.controllerPosition.w.y,
        100,
        100,
        "W"
      ),
      new Button(
        69,
        System.controllerPosition.e.x,
        System.controllerPosition.e.y,
        100,
        100,
        "E"
      ),
      new Button(
        82,
        System.controllerPosition.r.x,
        System.controllerPosition.r.y,
        100,
        100,
        "R"
      ),
    ];
  }

  static displayTimeLapse(timeLapse) {
    textSize(30);
    fill(0);

    text(
      `${timeLapse.getMinutes()}분: ${timeLapse.getSeconds()}초 : ${timeLapse.getMilliseconds()}`,
      100,
      100
    );
  }

  displayPauseUI() {
    textSize(100);
    fill(0);
    text("Paused", width / 2, height / 2);
    textSize(50);
    text("재시작 : r키", width / 2, height / 2 + 100);
  }

  displayUI() {
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].draw();
    }
  }

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

  displayPlayUI() {
    this.displayScore();
    this.displayCombo();
    // if (this.player.isPlayerEnd && !this.resultTimer) {
    //   this.resultTimer = setTimeout(() => {
    //     this.result = true;
    //   }, 1500);
    // } else if (this.result) {
    //   this.displayResult();
    // } else {
    //   this.displayCombo();
    // }
  }
}
