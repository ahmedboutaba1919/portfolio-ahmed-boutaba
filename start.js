const { spawn } = require('child_process');
const path = require('path');

console.log('Demarrage du serveur sur http://localhost:5173 ...');
const viteBin = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');

const child = spawn(process.execPath, [viteBin, '--host', '0.0.0.0', '--port', '5173'], {
  stdio: 'inherit',
  shell: true
});

child.on('error', (err) => console.error('Erreur lancement:', err));
