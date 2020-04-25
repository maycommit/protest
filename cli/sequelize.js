const fs = require('fs')
const path = require('path');
const nodePlop = require('node-plop');
const { exec } = require("child_process");

const basename = path.resolve(__dirname, '..');
const args = process.argv.slice(2);

exec(`cd src && ${basename}/node_modules/.bin/sequelize-cli ${args.join(' ')}`, (error, stdout, stderr) => {
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