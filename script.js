const output = document.getElementById('output');
const commandInput = document.getElementById('command');
const statusText = document.getElementById('statusText');

// Boot sequence lines
const bootLines = [
  '[BOOT] BIOS v1.22',
  '[BOOT] Scanning SCSI Bus...',
  '[BOOT] Loading kernel modules...',
  '[INIT] Starting network services...',
  '[INIT] Connecting to mainframe...',
  '[OK] Welcome, User.'
];

// Commands available in terminal
const commands = {
  help: () => print('Commands: help, status, connect <host>, trace, clear'),
  status: () => print('All systems nominal.'),
  connect: (args) => {
    const host = args[0] || 'remote';
    print(`Connecting to ${host}... done.`);
  },
  trace: () => {
    let percent = 0;
    const interval = setInterval(() => {
      percent += 10;
      print(`[TRACE] Node ${percent}%`);
      if (percent >= 100) clearInterval(interval);
    }, 200);
  },
  clear: () => {
    output.innerHTML = '';
  }
};

function print(text) {
  const line = document.createElement('div');
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

async function boot() {
  for (const line of bootLines) {
    print(line);
    await new Promise(r => setTimeout(r, 600));
  }
  statusText.textContent = 'ONLINE';
  commandInput.disabled = false;
  commandInput.focus();
  print('Type "help" to begin.');
}

commandInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const input = commandInput.value.trim();
    print(`> ${input}`);
    const [cmd, ...args] = input.split(' ');
    if (commands[cmd]) {
      commands[cmd](args);
    } else {
      print('Unknown command');
    }
    commandInput.value = '';
  }
});

// Globe using Three.js
function initGlobe() {
  const canvas = document.getElementById('globe');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  renderer.setSize(width, height);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
  camera.position.z = 3;
  const geometry = new THREE.SphereGeometry(1, 16, 16);
  const wireframe = new THREE.WireframeGeometry(geometry);
  const line = new THREE.LineSegments(wireframe, new THREE.LineBasicMaterial({ color: 0x00ff00 }));
  scene.add(line);
  function animate() {
    requestAnimationFrame(animate);
    line.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}

// Chart with random data
function initChart() {
  const ctx = document.getElementById('chart').getContext('2d');
  const data = {
    labels: Array.from({ length: 20 }, (_, i) => i),
    datasets: [{
      label: 'Activity',
      data: Array.from({ length: 20 }, () => Math.random() * 100),
      borderColor: '#0f0',
      backgroundColor: 'rgba(0,255,0,0.1)',
    }]
  };
  const chart = new Chart(ctx, {
    type: 'line',
    data,
    options: {
      animation: false,
      scales: {
        x: { display: false },
        y: { display: false }
      },
      plugins: { legend: { display: false } }
    }
  });
  setInterval(() => {
    data.datasets[0].data.shift();
    data.datasets[0].data.push(Math.random() * 100);
    chart.update();
  }, 1000);
}

document.addEventListener('DOMContentLoaded', () => {
  commandInput.disabled = true;
  boot();
  initGlobe();
  initChart();
});
