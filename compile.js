const fs = require("fs");
var fjsparse = require("@ferrugemjs/compile/parse/parse");

const filePath = "test/app/main-app.html";

// console.log(fjsparse.default('<test><test>', {}));

fs.readFile(filePath, function (err, buf) {
    const compiledStr = fjsparse.default(buf.toString(), {
        templateExtension: ".html",
        viewModel: "main-app",
        env: "production" // default is "development"
    })

    fs.writeFile(`${filePath}.js`, compiledStr, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
});

