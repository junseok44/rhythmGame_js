class RecordNote extends BasicNote {
  constructor(time, code, gameManager) {
    super(time, code, gameManager);
    this.y = System.controllerPosition.q.y;
  }

  draw() {
    this.y -= this.gameManager.levelMap.get(1);

    push();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    pop();
  }
}
