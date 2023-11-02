class Button {
  constructor(x, y, text, onClick) {
    this.x = x;
    this.y = y;
    this.width = 300;
    this.height = 30;
    this.isClicked = false;
    this.onClick = onClick;
    this.text = text;
    this.color = 0;
  }

  get buttonPressed() {
    return (
      mouseIsPressed &&
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY < this.y + this.height / 2 &&
      mouseY > this.y - this.height / 2
    );
  }

  draw() {
    if (!this.isClicked && this.buttonPressed) {
      this.isClicked = true;
      this.onClick();
    }
    push();
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(30);
    text(`${this.text}`, this.x, this.y);
    fill(this.color);
    pop();
  }
}
