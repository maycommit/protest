import yargs from 'yargs';
import { genHTML } from './gen';

const cli = yargs
  .help()
  .version()
  .command('gen:html', 'Generate complete CRUD structure', genHTML)
  .command('gen:model', 'Generate model', genHTML)
  .command('gen:controller', 'Generate controller', genHTML)
  .command('gen:view', 'Generate view', genHTML)
  .command('db:migrate', 'generate migration', genHTML)
  .command('db:undo', 'undo migration', genHTML)
  .wrap(yargs.terminalWidth())
  .strict()

const args = cli.argv

if (!args._[0]) {
  cli.showHelp();
}
