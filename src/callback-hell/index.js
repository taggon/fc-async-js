const fs = require("fs");
const path = require("path");
const gm = require("gm");

const source = path.join(__dirname, "assets");
const dest = path.join(__dirname, "resized");
const widths = [320, 640, 1024];

fs.readdir(source, function (err, files) {
  if (err) {
    console.log("Error finding files: " + err);
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename);
      if (!filename.startsWith('.')) {
        gm(path.join(source, filename)).size(function (err, values) {
          if (err) {
            console.log("Error identifying file size: " + err);
          } else {
            console.log(filename + " : " + values);
            aspect = values.width / values.height;
            widths.forEach(
              function (width, widthIndex) {
                height = Math.round(width / aspect);
                console.log(
                  "resizing " + filename + " to " + height + "x" + height
                );
                this.resize(width, height).write(
                  path.join(dest, "w" + width + "_" + filename),
                  function (err) {
                    if (err) console.log("Error writing file: " + err);
                  }
                );
              }.bind(this)
            );
          }
        });
      }
    });
  }
});
