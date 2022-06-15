/* eslint-disable @typescript-eslint/no-require-imports */
const childProccess = require('child_process');

const inquirer = require('inquirer');

const children = [];

const args = process.argv
  .filter(arg => arg.match(/^-{1,2}[^\-]/gim))
  .reduce((acc, arg) => {
    if (arg.startsWith('--')) return [...acc, arg.replace('--', '')];
    return [...acc, ...arg.replace('-', '').split('')];
  }, []);

const excludeProject = ['@my-eduzz/front'];

async function init() {
  const result = childProccess.execSync('yarn workspaces info', { encoding: 'utf-8' });
  const allProjects = Array.from(
    new Set(
      result
        .match(/(@.+)\"/gim)
        .map(r => r.replace('"', ''))
        .filter(p => !excludeProject.includes(p))
    )
  );

  let projects = [...allProjects];

  let skipAsk = false;

  if (args.includes('all')) {
    skipAsk = true;
  }

  if (args.includes('back')) {
    skipAsk = true;
    projects = projects.filter(p => p.includes('back'));
  }

  if (args.includes('front')) {
    skipAsk = true;
    projects = projects.filter(p => p.includes('front') || p.includes('shared'));
  }

  if (!skipAsk) {
    const answers = await inquirer.prompt([
      {
        name: 'projects',
        type: 'checkbox',
        default: allProjects,
        validate: a => (a.length > 0 ? true : 'Selecione ao menos 1.'),
        choices: allProjects.map(p => ({
          name: `${p}${p === '@my-eduzz/shared' ? ' (só desmarque se já tiver sido iniciado)' : ''}`,
          value: p
        })),
        message: 'Qual projeto deseja iniciar?'
      }
    ]);
    projects = answers.projects;
  }

  await spawn('yarn', ['ultra', ...projects.reduce((a, p) => [...a, '--filter', p], []), '-r', 'start']);
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
