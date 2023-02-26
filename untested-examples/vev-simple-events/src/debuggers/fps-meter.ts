if (!window.requestAnimationFrame) {
  window.requestAnimationFrame = (() => {
    return (
      window.requestAnimationFrame ||
      (window as any).webkitRequestAnimationFrame ||
      (window as any).mozRequestAnimationFrame ||
      function (callback) {
        window.setTimeout(callback, 1000 / 60);
      }
    );
  })();
}

const getTime = () => {
  return window.performance && window.performance.now
    ? window.performance.now()
    : +new Date();
};

export default class FPSMeter {
  isRunning: boolean;
  fps: number;
  element: HTMLElement;
  text: Text;
  constructor(opts) {
    this.fps = 0;
    this.element = opts.element;
    this.isRunning = false;
  }

  measure() {
    const time = getTime();
    window.requestAnimationFrame(() => {
      const _fps = Math.round((1 / (getTime() - time)) * 1000);

      this.fps = _fps;

      let i = 4 - `${_fps}`.length;
      let pad = "";

      while (i > 0) {
        pad += " ";
        i--;
      }

      this.element.textContent = `${_fps}${pad}fps`;

      switch (false) {
        case !(_fps < 7):
          this.element.className = "dead";
          break;
        case !(_fps < 25):
          this.element.className = "danger";
          break;
        case !(_fps < 40):
          this.element.className = "warn";
          break;
        case !(_fps > 70):
          this.element.className = "high";
          break;
        default:
          this.element.className = "";
          break;
      }

      if (this.isRunning) {
        this.measure();
      }
    });
  }

  start() {
    if (!this.isRunning) {
      this.isRunning = true;

      this.text = document.createTextNode("");

      this.measure();
    }
  }

  pause() {
    this.isRunning = false;
  }

  resume() {
    if (!this.isRunning) {
      this.isRunning = true;
      this.measure();
    }
  }

  toggle() {
    this.isRunning ? this.pause() : this.resume();
  }

  stop() {
    if (this.isRunning) {
      this.isRunning = false;
    }
  }
}

export { FPSMeter };
