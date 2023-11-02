class Utils {
  static callOneTime(fn, time) {
    let triggered = false;

    if (time) {
      return function () {
        if (!triggered) {
          triggered = true;
          setTimeout(() => {
            fn();
          }, time);
        }
      };
    } else {
      return function () {
        if (!triggered) {
          triggered = true;
          fn();
        }
      };
    }
  }

  static delayDisplay(fn, time) {
    let triggered = false;
    let isShowing = false;
    return function () {
      if (!triggered) {
        triggered = true;
        setTimeout(() => {
          isShowing = true;
        }, time);
      }

      if (isShowing) {
        fn();
      }
    };
  }
}
