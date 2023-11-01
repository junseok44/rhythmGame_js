class Note extends BasicNote {
  constructor(time, code, gameManager, notes) {
    super(time, code, gameManager, notes);
    this.y =
      System.controllerPosition.q.y -
      time * System.frameRate * this.gameManager.levelMap.get(1);
  }

  calculateScore() {
    let distance = System.controllerPosition.q.y - this.y;
    this.gameManager.calculateScore(distance);
  }

  get distance() {
    return System.controllerPosition.q.y - this.y;
  }

  draw() {
    push();

    if (this.distance <= -100 && !this.isHit) {
      this.isHit = true;
      this.calculateScore();
    }

    // 확인해야함. 뭐인지? 지금 isHit되지 않은, 그리고 controllerPosition이 같은 note 중에서
    // key가 눌렸을 때, isHit이 true가 되는 것이다.

    let firstNote = this.notes.filter(
      (note) => note.x === this.x && !note.isHit
    )[0];

    let isFirstNote = firstNote === this;

    if (
      !this.isHit &&
      !System.isKeyPressed[this.code] &&
      keyIsDown(this.code) &&
      isFirstNote &&
      this.distance <= 200
      // 문제는 이게 단발성이 아니다 보니까. 이게 계속 눌리는 것이다.
      // 그래서 첫번째 노트가 눌리면 두번째까지.
    ) {
      System.isKeyPressed[this.code] = true;
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
