// ===== Fade-in on scroll (IntersectionObserver) =====
document.addEventListener('DOMContentLoaded', () => {
  const observers = document.querySelectorAll('.section, .fade-in, .card');
  const io = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // observe key elements: sections and fades and cards
  document.querySelectorAll('.section, .fade-in, .card').forEach(el => io.observe(el));
});

// ===== Canvas particle ambient background =====
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

let W = canvas.width = window.innerWidth;
let H = canvas.height = window.innerHeight;
const NUM = Math.round((W * H) / 90000 * 60); // scale particle count with screen

let particles = [];
function resetParticles(){
  particles = [];
  for(let i=0;i<NUM;i++){
    particles.push({
      x: Math.random()*W,
      y: Math.random()*H,
      r: Math.random()*1.6 + 0.6,
      dx: (Math.random()-0.5)*0.3,
      dy: (Math.random()-0.5)*0.3,
      life: Math.random()*1
    });
  }
}
resetParticles();

function resize(){
  W = canvas.width = window.innerWidth;
  H = canvas.height = window.innerHeight;
  resetParticles();
}
window.addEventListener('resize', resize);

function draw(){
  ctx.clearRect(0,0,W,H);
  // subtle radial gradient overlay
  const g = ctx.createLinearGradient(0,0,W,H);
  g.addColorStop(0, 'rgba(11,16,32,0.05)');
  g.addColorStop(1, 'rgba(10,13,22,0.15)');
  ctx.fillStyle = g;
  ctx.fillRect(0,0,W,H);

  // draw particles
  particles.forEach(p => {
    p.x += p.dx;
    p.y += p.dy;
    if(p.x < -20) p.x = W + 20;
    if(p.x > W + 20) p.x = -20;
    if(p.y < -20) p.y = H + 20;
    if(p.y > H + 20) p.y = -20;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI*2);
    ctx.fillStyle = `rgba(110,231,183,${0.08 + 0.12*Math.sin(p.life + Date.now()/8000)})`;
    ctx.fill();
  });

  requestAnimationFrame(draw);
}
draw();
