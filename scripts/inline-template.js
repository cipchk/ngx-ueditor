const fs = require('fs')
const path = require('path')
const glob = require('glob').sync
const less = require('less');

function inlineResourcesForDirectory(folderPath) {
  return Promise.all(glob(path.join(folderPath, '**/*.ts')).map(filePath => inlineResources(filePath)))
}

function inlineResources(filePath) {
  return new Promise(resolve => {
    let fileContent = fs.readFileSync(filePath, 'utf-8')

    fileContent = inlineTemplate(fileContent, filePath)

    inlineLess(fileContent, filePath).then(res => {
      fs.writeFileSync(filePath, res, 'utf-8');
      resolve();
    }).catch(() => resolve());
  });
}

function inlineLess(fileContent, filePath) {
  return new Promise(resolve => {
    const re = /styleUrls\s*:\s*\[\s*'([^']+?\.less)'\s*\]/g;
    const matches = re.exec(fileContent);
    if (matches == null || matches.length <= 0) {
      resolve(fileContent);
      return ;
    }
    const templatePath = path.join(path.dirname(filePath), matches[1]);
    const templateContent = loadResourceFile(templatePath);
    less.render(templateContent, {}).then(lessResult => {
      const newContent = fileContent.replace(re, (_match, templateUrl) => `styles: [\`${lessResult.css}\`]`);
      resolve(newContent);
    }).catch(() => resolve(fileContent));
  });
}

function inlineTemplate(fileContent, filePath) {
  return fileContent.replace(/templateUrl\s*:\s*'([^']+?\.html)'/g, (_match, templateUrl) => {
    const templatePath = path.join(path.dirname(filePath), templateUrl)
    const templateContent = loadResourceFile(templatePath)
    return `template: \`${templateContent}\``
  });
}

function loadResourceFile(filePath) {
  return fs.readFileSync(filePath, 'utf-8').replace(/([\n\r]\s*)+/gm, ' ')
}

inlineResourcesForDirectory('./__gen_lib').then();
