import { useEffect } from "react";
// This code Import is Codepen for animation
const Confetti = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = 
      (() => {
        "use strict";

        const Utils = {
          parsePx: (value) => parseFloat(value.replace(/px/, "")),
          getRandomInRange: (min, max, precision = 0) => {
            const multiplier = Math.pow(10, precision);
            const randomValue = Math.random() * (max - min) + min;
            return Math.floor(randomValue * multiplier) / multiplier;
          },
          getRandomItem: (array) => array[Math.floor(Math.random() * array.length)],
          getScaleFactor: () => Math.log(window.innerWidth) / Math.log(1920),
          debounce: (func, delay) => {
            let timeout;
            return (...args) => {
              clearTimeout(timeout);
              timeout = setTimeout(() => func(...args), delay);
            };
          },
        };

        const defaultConfettiConfig = {
          confettiesNumber: 2500,
          confettiRadius: 6,
          confettiColors: [
            "#fcf403", "#62fc03", "#f4fc03", "#03e7fc", "#03fca5", "#a503fc", "#fc03ad", "#fc03c2"
          ],
          emojies: [],
          svgIcon: null,
        };

        class Confetti {
          constructor({ initialPosition, direction, radius, colors, emojis, svgIcon }) {
            const speedFactor = Utils.getRandomInRange(0.9, 1.7, 3) * Utils.getScaleFactor();
            this.speed = { x: speedFactor, y: speedFactor };
            this.finalSpeedX = Utils.getRandomInRange(0.2, 0.6, 3);
            this.rotationSpeed = emojis.length || svgIcon ? 0.01 : Utils.getRandomInRange(0.03, 0.07, 3) * Utils.getScaleFactor();
            this.dragCoefficient = Utils.getRandomInRange(0.0005, 0.0009, 6);
            this.radius = { x: radius, y: radius };
            this.initialRadius = radius;
            this.rotationAngle = direction === "left" ? Utils.getRandomInRange(0, 0.2, 3) : Utils.getRandomInRange(-0.2, 0, 3);
            this.emojiRotationAngle = Utils.getRandomInRange(0, 2 * Math.PI);
            this.radiusYDirection = "down";

            const offset = Utils.getRandomInRange(-150, 0);
            const position = {
              x: initialPosition.x + (direction === "left" ? -offset : offset),
              y: initialPosition.y - offset
            };

            this.position = { ...position };
            this.initialPosition = { ...position };
            this.color = emojis.length || svgIcon ? null : Utils.getRandomItem(colors);
            this.emoji = emojis.length ? Utils.getRandomItem(emojis) : null;

            this.createdAt = Date.now();
            this.direction = direction;
          }

          draw(context) {
            const { x, y } = this.position;
            const { x: radiusX, y: radiusY } = this.radius;
            const scale = window.devicePixelRatio;

            if (this.color) {
              context.fillStyle = this.color;
              context.beginPath();
              context.ellipse(x * scale, y * scale, radiusX * scale, radiusY * scale, this.rotationAngle, 0, 2 * Math.PI);
              context.fill();
            }
          }

          updatePosition(deltaTime, currentTime) {
            const elapsed = currentTime - this.createdAt;

            if (this.speed.x > this.finalSpeedX) {
              this.speed.x -= this.dragCoefficient * deltaTime;
            }

            this.position.x += this.speed.x * (this.direction === "left" ? -1 : 1) * deltaTime;
            this.position.y = this.initialPosition.y - this.speed.y * elapsed + 0.00125 * Math.pow(elapsed, 2) / 2;
          }

          isVisible(canvasHeight) {
            return this.position.y < canvasHeight + 100;
          }
        }

        class ConfettiManager {
          constructor() {
            this.canvas = document.createElement("canvas");
            this.canvas.style = "position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 1000; pointer-events: none;";
            document.body.appendChild(this.canvas);
            this.context = this.canvas.getContext("2d");
            this.confetti = [];
            this.lastUpdated = Date.now();
            window.addEventListener("resize", Utils.debounce(() => this.resizeCanvas(), 200));
            this.resizeCanvas();
            requestAnimationFrame(() => this.loop());
          }

          resizeCanvas() {
            this.canvas.width = window.innerWidth * window.devicePixelRatio;
            this.canvas.height = window.innerHeight * window.devicePixelRatio;
          }

          addConfetti(config = {}) {
            const { confettiesNumber, confettiRadius, confettiColors, emojies } = { ...defaultConfettiConfig, ...config };
            const baseY = (5 * window.innerHeight) / 7;
            for (let i = 0; i < confettiesNumber / 2; i++) {
              this.confetti.push(new Confetti({
                initialPosition: { x: 0, y: baseY },
                direction: "right",
                radius: confettiRadius,
                colors: confettiColors,
                emojis: emojies,
              }));
              this.confetti.push(new Confetti({
                initialPosition: { x: window.innerWidth, y: baseY },
                direction: "left",
                radius: confettiRadius,
                colors: confettiColors,
                emojis: emojies,
              }));
            }
          }

          resetAndStart(config = {}) {
            this.confetti = [];
            this.addConfetti(config);
          }

          loop() {
            const currentTime = Date.now();
            const deltaTime = currentTime - this.lastUpdated;
            this.lastUpdated = currentTime;

            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.confetti = this.confetti.filter((item) => {
              item.updatePosition(deltaTime, currentTime);
              item.draw(this.context);
              return item.isVisible(this.canvas.height);
            });

            requestAnimationFrame(() => this.loop());
          }
        }

        const manager = new ConfettiManager();
        manager.addConfetti();
      })();
    ;
    document.body.appendChild(script);
  }, []);

  return null; // No UI needed
};

export default Confetti;
