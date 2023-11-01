class Note extends BasicNote {
  constructor(time, code, gameManager) {
    super(time, code, gameManager);
    this.y =
      System.controllerPosition.q.y -
      time * System.frameRate * this.gameManager.levelMap.get(1);
  }

  calculateScore() {
    let distance = System.controllerPosition.q.y - this.y;
    this.gameManager.calculateScore(distance);
  }

  draw() {
    push();

    if (this.y - System.controllerPosition.q.y >= 100 && !this.isHit) {
      this.isHit = true;
      this.calculateScore();
    }

    if (
      !this.isHit &&
      System.controllerPosition.q.y - this.y <= 200 &&
      keyIsDown(this.code)
    ) {
      this.color = "rgb(255, 0, 0)";
      this.isHit = true;
      this.calculateScore();
    }

    this.y += this.gameManager.levelMap.get(1);
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
