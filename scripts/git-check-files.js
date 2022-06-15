/* eslint-disable @typescript-eslint/no-require-imports */
const childProcess = require('child_process');

const inquirer = require('inquirer');

async function init() {
  const gitStatus = await execCommand('git status');

  const hasPendingFiles = gitStatus.includes('Changes not staged');
  const hasUntrackedFiles = gitStatus.includes('Untracked files');

  if (!hasPendingFiles && !hasUntrackedFiles) return true;

  const answers = await inquirer.prompt([
    {
      name: 'confirm',
      type: 'confirm',
      default: true,
      message: 'Existem arquivos não adicionados no git, deseja continuar o commit?'
    }
  ]);

  return answers.confirm;
}

async function execCommand(command) {
  return new Promise((resolve, reject) => {
    childProcess.exec(command, (err, std) => (err ? reject(err) : resolve(std)));
  });
}

init()
  .then(success => process.exit(success ? 0 : -1))
  .catch(err => {
    console.error(err);
    process.exit(-1);
  });
