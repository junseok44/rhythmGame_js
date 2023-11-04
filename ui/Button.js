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

  get isHover() {
    return (
      mouseX > this.x - this.width / 2 &&
      mouseX < this.x + this.width / 2 &&
      mouseY < this.y + this.height / 2 &&
      mouseY > this.y - this.height / 2
    );
  }

  draw() {
    if (this.isHover) {
      this.color = "rgb(255,0,0)";
    } else {
      this.color = 0;
    }

    if (!this.isClicked && this.isHover && mouseIsPressed) {
      this.isClicked = true;
      this.onClick();
    }

    push();
    rectMode(CENTER);
    textAlign(CENTER);
    textSize(30);
    fill(this.color);
    cursor(HAND);
    text(`${this.text}`, this.x, this.y);
    pop();
  }
}
