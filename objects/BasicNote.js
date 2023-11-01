class BasicNote {
  constructor(time, code, gameManager, notes) {
    switch (code) {
      case System.keyCodeMap.q:
        this.x = System.controllerPosition.q.x;
        break;
      case System.keyCodeMap.w:
        this.x = System.controllerPosition.w.x;
        break;
      case System.keyCodeMap.e:
        this.x = System.controllerPosition.e.x;
        break;
      case System.keyCodeMap.r:
        this.x = System.controllerPosition.r.x;
        break;
    }
    this.gameManager = gameManager;
    this.notes = notes;
    this.width = 80;
    this.height = 80;
    this.code = code;
    this.color = 0;
    this.isHit = false;
  }
}
