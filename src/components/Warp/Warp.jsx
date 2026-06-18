import { useEffect, useRef } from "react";
import "./warp.scss";

export default function WarpSpeed() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    // Resize canvas
    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };

    resize();

    let xMod = 0;
    let yMod = 0;
    let warpSpeed = false;

    const setWarp = (on) => {
      warpSpeed = on;
    };

    // Star class
    function Star() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.c = 0;
    }

    Star.prototype.updateColor = function () {
      this.c = Math.min(255, this.c + 5);
    };

    Star.prototype.updatePos = function () {
      const speedMult = warpSpeed ? 0.026 : 0.02;

      const cx = w / 2;
      const cy = h / 2;

      this.x += xMod + (this.x - cx) * speedMult;
      this.y += yMod + (this.y - cy) * speedMult;

      this.updateColor();

      // Reset star if out of screen
      if (this.x > w || this.x < 0) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.c = 0;
      }

      if (this.y > h || this.y < 0) {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.c = 0;
      }
    };

    // Create stars
    const STAR_COUNT = 400;
    const stars = Array.from(
      { length: STAR_COUNT },
      () => new Star()
    );

    // Keyboard controls
    const onKeyDown = (e) => {
      switch (e.keyCode) {
        case 32: // Space
          setWarp(true);
          break;

        case 37: // Left
          xMod = Math.min(6, xMod + 0.3);
          break;

        case 38: // Up
          yMod = Math.min(6, yMod + 0.3);
          break;

        case 39: // Right
          xMod = Math.max(-6, xMod - 0.3);
          break;

        case 40: // Down
          yMod = Math.max(-6, yMod - 0.3);
          break;

        default:
          return;
      }

      e.preventDefault();
    };

    const onKeyUp = (e) => {
      switch (e.keyCode) {
        case 32:
          setWarp(false);
          break;

        case 37:
        case 39:
          xMod = 0;
          break;

        case 38:
        case 40:
          yMod = 0;
          break;

        default:
          return;
      }

      e.preventDefault();
    };

    // Mouse controls
    const onMouseDown = (e) => {
      if (e.button === 0) {
        setWarp(true);
      }
    };

    const onMouseUp = (e) => {
      if (e.button === 0) {
        setWarp(false);
      }
    };

    // Touch controls
    const onTouchStart = (e) => {
      e.preventDefault();
      setWarp(true);
    };

    const onTouchEnd = () => {
      setWarp(false);
    };

    // Draw animation
    const draw = () => {
      ctx.fillStyle = "rgba(0,0,0,0.2)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        const c = s.c;

        if (warpSpeed) {
          ctx.fillStyle = `rgb(${c}, ${Math.floor(c * 0.45)}, 0)`;
        } else {
          ctx.fillStyle = `rgb(${c}, ${c}, ${c})`;
        }

        const size = Math.max(1, c / 128);

        ctx.fillRect(s.x, s.y, size, size);

        s.updatePos();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    // Event listeners
    window.addEventListener("resize", resize);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mouseup", onMouseUp);

    canvas.addEventListener("touchstart", onTouchStart, {
      passive: false,
    });

    canvas.addEventListener("touchend", onTouchEnd);

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current);

      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);

      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mouseup", onMouseUp);

      canvas.removeEventListener(
        "touchstart",
        onTouchStart
      );

      canvas.removeEventListener(
        "touchend",
        onTouchEnd
      );
    };
  }, []);

  return (
    <div className="warp-wrap">
      <canvas
        ref={canvasRef}
        className="warp-canvas"
      />
    </div>
  );
}