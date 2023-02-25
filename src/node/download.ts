import { spawn } from 'node:child_process';
import { join } from 'node:path';

const home = process.env[process.platform == "win32" ? "USERPROFILE" : "HOME"] ?? '~/';
const cwd = join(home, 'Downloads');

export function download(args: string[]) {
  const task = spawn('yt-dlp', args, { cwd });
  task.stdout.on('data', (data) => console.log(data));
  task.stderr.on('data', (data) => console.error(data));
  task.on('close', (code) => console.log(`child process exited with code ${code}`));
}
