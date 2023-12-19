const sharp = require("sharp");
const path = require("path");
const fs = require("fs");
const inputFolder = "./images";
const outputFolder = "./outputs";

async function resizeImages(inputFolder, outputFolder) {
  fs.readdir(inputFolder, (err, files) => {
    if (err) {
      console.error("Error reading folder:", err);
      return;
    }

    files.forEach((file) => {
      const extension = path.extname(file);
      const basename = path.basename(file, extension);
      sharp(path.join(inputFolder, file))
        .resize(300, 200)
        .toFile(
          path.join(outputFolder, basename + "_resized" + extension),
          function (err) {
            // output.jpg is a 300 pixels wide and 200 pixels high image
            // containing a scaled and cropped version of input.jpg
          }
        );
    });
  });
}

resizeImages(inputFolder, outputFolder);
