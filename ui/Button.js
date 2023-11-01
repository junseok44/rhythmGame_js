class Button {
  constructor(id, x, y, width, height, text, color) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.width = width || 100;
    this.height = height || 100;
    this.text = text;
    this.color = color || 255;
    textAlign(CENTER, CENTER);
    textSize(20);
  }

  pressed() {
    this.color = 125;
  }

  drawBar() {
    // push();
    // let myY = this.y - this.height / 2 - 150;
    // let myX = this.x;
    // let myWidth = this.width;
    // let myHeight = 300;
    // let c1 = color(255, 0, 0); // Bottom color (fully opaque red)
    // let c2 = color(255, 0, 0, 0);
    // let steps = myHeight;
    // let alphaIncrement = 255 / steps;
    // for (let i = 0; i < steps; i++) {
    //   let interColor = lerpColor(c1, c2, i / steps);
    //   fill(
    //     red(interColor),
    //     green(interColor),
    //     blue(interColor),
    //     255 - i * alphaIncrement
    //   );
    //   rect(myX, myY, myWidth, myHeight / steps);
    //   myY -= myHeight / steps;
    // }
    // pop();
  }

  draw() {
    if (keyIsDown(this.id)) {
      this.color = 125;
      this.drawBar();
    } else {
      this.color = 255;
    }

    push();
    fill(this.color);
    rect(this.x, this.y, this.width, this.height);
    noStroke();

    fill(0);
    textSize(30);
    if (this.text) text(this.text, this.x, this.y);
    pop();
  }
}
