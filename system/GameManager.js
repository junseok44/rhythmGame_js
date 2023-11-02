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
      if (distance <= 30) {
        this.combo++;
        this.score += 100;
        this.displayText = "Perfect!!";
      } else if (distance <= 60) {
        this.combo++;
        this.score += 50;
        this.displayText = "very good!";
      } else if (distance <= 130) {
        this.combo++;
        this.score += 10;
        this.displayText = "nice";
      } else {
        this.displayText = "Bad...";
        this.combo = 0;
      }
    }
  }

  setLevel(stage, level) {
    this.levelMap.set(stage, level);
  }

  reset() {
    this.score = 0;
    this.combo = 0;
    this.displayText = "";
  }
}
