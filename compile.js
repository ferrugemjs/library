const fs = require("fs");
const fjsparse = require("@ferrugemjs/compile/parse/parse");

const compile = (filedir) => (filename) => {
    const replaceFrom = 'test';
    const replaceTo = 'test';
    const filePath = `${filedir}/${filename}`;
    fs.readFile(filePath, function (err, buf) {
        const compiledStr = fjsparse.default(buf.toString(), {
            templateExtension: ".html",
            viewModel: filename.replace('.html', ''),
            env: "production" // default is "development"
        });
        fs.writeFile(`${filePath.replace(replaceFrom, replaceTo)}.js`, compiledStr, (err) => {
            if (err) console.log(err);
            console.log("Successfully Written to File.");
        });
    });
}

const build = (dirname) => {
    fs.readdir(dirname, function (err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames
            .filter(filename => filename.match(/.html$/gm))
            .forEach(compile(dirname));
    });
}

build('test/app');

