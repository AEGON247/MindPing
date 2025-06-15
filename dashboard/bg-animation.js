const canvas = document.getElementById("pixelBg");
const ctx = canvas.getContext("2d");

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const pixelSize = 10;

function drawPixelatedNoise() {
  for (let x = 0; x < width; x += pixelSize) {
    for (let y = 0; y < height; y += pixelSize) {
      ctx.fillStyle = `rgba(${Math.floor(Math.random()*255)}, 255, ${Math.floor(Math.random()*255)}, 0.1)`;
      ctx.fillRect(x, y, pixelSize, pixelSize);
    }
  }
}

function animate() {
  drawPixelatedNoise();
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});