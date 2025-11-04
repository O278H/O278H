const globe = document.querySelector('.globe');
const speed = document.getElementById('speed');
const spdVal = document.getElementById('spdVal');
const stars1 = document.querySelector('.layer-1');
const stars2 = document.querySelector('.layer-2');
const root = document.documentElement;

/* ===== SPEED CONTROL ===== */
const setSpeed = (s) => {
  root.style.setProperty('--spin-duration', `${s}s`);
  spdVal.textContent = `${s}s`;
};
setSpeed(speed.value);
speed.addEventListener('input', e => setSpeed(e.target.value));

/* ===== LIGHT AND PARALLAX ===== */
document.addEventListener('mousemove', (e) => {
  const xPct = (e.clientX / window.innerWidth) * 100;
  const yPct = (e.clientY / window.innerHeight) * 100;
  root.style.setProperty('--light-x', `${xPct}%`);
  root.style.setProperty('--light-y', `${yPct}%`);

  const parX = (e.clientX - window.innerWidth / 2) / 60;
  const parY = (e.clientY - window.innerHeight / 2) / 60;
  stars1.style.transform = `translate(${parX}px, ${parY}px)`;
  stars2.style.transform = `translate(${parX * 1.6}px, ${parY * 1.6}px)`;

  const wobX = (window.innerWidth / 2 - e.pageX) / 90;
  const wobY = (window.innerHeight / 2 - e.pageY) / 90;
  globe.style.transform = `rotateZ(23.5deg) rotateY(${wobX}deg) rotateX(${wobY}deg)`;
});

/* ===== DRAG TO SPIN ===== */
let dragging = false, startX = 0, startOffset = 0;
const mapWidthPx = () => globe.offsetHeight * 2;
const getOffset = () => parseFloat(getComputedStyle(root).getPropertyValue('--map-offset')) || 0;
const setOffset = (px) => {
  const width = mapWidthPx();
  let v = px % width;
  if (v > 0) v -= width;
  root.style.setProperty('--map-offset', `${v}px`);
};
globe.addEventListener('mousedown', (e) => {
  dragging = true;
  startX = e.clientX;
  startOffset = getOffset();
  globe.style.animationPlayState = 'paused';
  document.body.style.cursor = 'grabbing';
});
window.addEventListener('mouseup', () => {
  if (!dragging) return;
  dragging = false;
  globe.style.animationPlayState = 'running';
  document.body.style.cursor = '';
});
window.addEventListener('mousemove', (e) => {
  if (!dragging) return;
  const delta = e.clientX - startX;
  setOffset(startOffset - delta);
});
