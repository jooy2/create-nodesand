#!/usr/bin/env node
import { spawn } from 'child_process';
import { existsSync, rmSync, statSync } from 'fs';
import { join } from 'path';

async function run() {
  const packageName = 'nodesand';

  try {
    if (existsSync(packageName) && statSync(packageName).isDirectory()) {
      console.error(`Failed: Directory "${packageName}" already exists.`);
      process.exit(1);
      return;
    }

    spawn('git', ['clone', 'https://github.com/jooy2/nodesand', packageName, '--depth', '1'], { stdio: 'inherit' }).on(
      'close',
      (code) => {
        if (code) {
          rmSync(join(process.cwd(), packageName, '.git'), { recursive: true, force: true });
        }
      },
    );
  } catch (e) {
    console.error(e?.message);
    process.exit(1);
  }
}

run();
