const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const showdown  = require('showdown');
const converter = new showdown.Converter();
const exec = require('@actions/exec');

try {
    // Set the input directory to the root of the repository
    const inputDirectory = '.';
    const cssFile = 'default.css';
    const htmlFile = 'default.html';
    const jsFile = 'default.js';

    // Get all markdown files
    const getMarkdownFiles = function(dir, fileList) {
        const files = fs.readdirSync(dir);
        fileList = fileList || [];
        files.forEach(function(file) {
            if (fs.statSync(path.join(dir, file)).isDirectory()) {
                fileList = getMarkdownFiles(path.join(dir, file), fileList);
            }
            else {
                fileList.push(path.join(dir, file));
            }
        });
        return fileList;
    };

    const markdownFiles = getMarkdownFiles(inputDirectory).filter(file => path.extname(file) === '.md');

    // Convert each markdown file to HTML and apply the CSS
    markdownFiles.forEach(file => {
        const markdown = fs.readFileSync(file, 'utf8');
        const html = converter.makeHtml(markdown);
        const css = fs.readFileSync(cssFile, 'utf8');
        const js = fs.readFileSync(jsFile, 'utf8');
        const output = `<style>${css}</style><div id="content">${html}</div><script>${js}</script>`;
        fs.writeFileSync(file.replace('.md', '.html'), output);
    });

    // Build the application
    exec.exec('npm run build');

    // Deploy the application to the user's repository
    exec.exec('npm run deploy');

} catch (error) {
    core.setFailed(error.message);
}