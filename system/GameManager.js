class GameManager {
  constructor() {
    this.score = 0;
    this.combo = 0;
    this.levelMap = new Map();
  }

  calculateScore(distance) {
    if (distance < -100) {
      this.displayText = "Miss...";
      this.combo = 0;
    } else {
      if (distance <= 50) {
        this.combo++;
        this.score += 100;
        this.displayText = "완벽해!!";
      } else if (distance <= 100) {
        this.combo++;
        this.score += 50;
        this.displayText = "오우 굿!";
      } else if (distance <= 150) {
        this.combo++;
        this.score += 10;
        this.displayText = "굿";
      } else {
        this.displayText = "Bad...";
        this.combo = 0;
      }
    }
  }

  setLevel(stage, level) {
    this.levelMap.set(stage, level);
  }
}
