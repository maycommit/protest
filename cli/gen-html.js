const fs = require('fs')
const path = require('path');
const nodePlop = require('node-plop');
const { exec } = require("child_process");

const basename = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const [name] = args
const attributes = args.slice(1)

const plop = nodePlop(`${basename}/plopfile.js`)
const generator = plop.getGenerator('generate')

generator.runActions({ name, attributes: attributes.join(' ') })
  .then(() => console.log('Plop generate files'))
  .catch(err => console.error(err))

exec(`cd src && ${basename}/node_modules/.bin/sequelize-cli model:generate --name ${name} --attributes ${attributes.join(',')} --force`, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});