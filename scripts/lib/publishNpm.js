/* eslint-disable unicorn/no-process-exit, unicorn/prefer-module */
const { exec } = require('child_process');

const publishPackages = (pkgPath, labels) => {
  return new Promise((_res, _rej) => {
    try {
      const command = `npm publish ${pkgPath} --access public --tag ${labels}`;

      exec(command, (error, stdout, stderr) => {
        if (error) {
          return;
        }
        if (stderr) {
          return;
        }
      });
    } catch (e) {
      console.error(e);
    }
  });
};

module.exports = {
  publishPackages,
};
