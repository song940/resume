#!/usr/bin/env node

const fs = require('fs');
const marked = require('marked');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const markdown = promisify(marked.parse);
const writeFile = promisify(fs.writeFile);

const createRender = async (filename, encoding = 'utf8') => {
  const template = await readFile(filename, encoding);
  return data => template.replace(/#{(\w+)}/g, (_, name) => data[name] || '');
};

(async () => {

  const source = await readFile(__dirname + '/resume.md', 'utf8');
  const render = await createRender(__dirname + '/resume.tpl');
  const content = await markdown(source);
  await writeFile(__dirname + '/resume.html', render({ content }));

})();