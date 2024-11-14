import fs from "fs";
import { exec } from "child_process";
import path from "path";

const libreOfficePath = process.argv[2];
const inputPath = process.argv[3];
const outputDir = "output/";

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

async function convertDocxToPdf(libreOfficePath, inputPath, outputDir) {
  const outputFilePath = path.join(
    outputDir,
    `${path.basename(inputPath, path.extname(inputPath))}.pdf`
  );

  const command = `"${libreOfficePath}" --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error converting file: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }
    console.log(`File converted to PDF: ${outputFilePath}`);
  });
}

convertDocxToPdf(libreOfficePath, inputPath, outputDir).catch(console.error);
