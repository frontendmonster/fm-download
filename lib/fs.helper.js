const path = require('path');
const fs = require('fs');

function mkDirByPathSync(targetDir, { isRelativeToScript = false } = {}) {
  const sep = path.sep;
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    if (!fs.existsSync(curDir)) {
      try {
        fs.mkdirSync(curDir);
        console.log(`Directory ${curDir} created!`);
      } catch (err) {
        if (err.code !== 'EEXIST') {
          throw err;
        }

        console.log(`Directory ${curDir} already exists!`);
      }
    }

    return curDir;
  }, initDir);
}

module.exports = {
  mkDirByPathSync
};
