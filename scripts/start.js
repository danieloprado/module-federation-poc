/* eslint-disable @typescript-eslint/no-require-imports */
const childProccess = require('child_process');
const fs = require('fs');

const inquirer = require('inquirer');

const children = [];

const args = process.argv
  .filter(arg => arg.match(/^-{1,2}[^\-]/gim))
  .reduce((acc, arg) => {
    if (arg.startsWith('--')) return [...acc, arg.replace('--', '')];
    return [...acc, ...arg.replace('-', '').split('')];
  }, []);

async function init() {
  const result = childProccess.execSync('yarn workspaces info', { encoding: 'utf-8' });
  const projects = Array.from(new Set(result.match(/(@.+)\"/gim).map(r => r.replace('"', ''))));

  const answers = await inquirer.prompt([
    {
      name: 'projects',
      type: 'checkbox',
      default: projects,
      choices: projects.map(p => ({ name: p, value: p })),
      message: 'Qual projeto deseja iniciar?'
    }
  ]);
}

async function spawn(command, args) {
  const child = childProccess.spawn(command, args, { stdio: 'inherit' });
  children.push(child);

  return new Promise((resolve, reject) => {
    child.once('exit', code => (code >= 0 ? resolve() : reject()));
  });
}

init().catch(err => {
  console.error(err);
  process.exit(-1);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(reason);
  console.log(promise);
});

process.on('uncaughtException', err => {
  console.error(err);
});

process.on('SIGINT', () => {
  children.forEach(child => child.kill());
  process.exit(0);
});

process.on('SIGTERM', () => {
  children.forEach(child => child.kill());
  process.exit(0);
});
