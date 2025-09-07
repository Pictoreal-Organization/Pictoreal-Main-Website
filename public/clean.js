const fs = require("fs");
const path = require("path");

const folderPath = "./gallery"; // change this to your folder path

fs.readdir(folderPath, (err, files) => {
  if (err) {
    console.error("Error reading folder:", err);
    return;
  }

  files.forEach((file) => {
    const ext = path.extname(file);
    const base = path.basename(file, ext);

    if (ext === ".JPG") {
      const oldPath = path.join(folderPath, file);
      const newPath = path.join(folderPath, base + ".jpg");

      // Skip if .jpg file already exists
    //   if (fs.existsSync(newPath)) {
    //     console.log(`Skipped (already exists): ${newPath}`);
    //     return;
    //   }

      fs.rename(oldPath, newPath, (err) => {
        if (err) {
          console.error("Error renaming file:", err);
        } else {
          console.log(`Renamed: ${file} -> ${base}.jpg`);
        }
      });
    }
  });
});
