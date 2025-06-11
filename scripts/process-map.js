const sharp = require("sharp");
const path = require("path");
const { exec } = require("child_process");

// GET FILENAME FROM COMMAND LINE
const inputFileName = process.argv[2];

if (!inputFileName) {
  console.error("❌ Please provide a filename. Example: node process-map.js tea-vs-cha.png");
  process.exit(1);
}

const baseDir = path.join(__dirname, "..", "assets");
const inputMap = path.join(baseDir, "maps", inputFileName);
const watermarkPath = path.join(baseDir, "logos", "know globe puff logo 400x63.png");

const baseName = inputFileName.replace(/\.[^/.]+$/, ""); // strip extension
const outputMap = path.join(baseDir, "maps-processed", `${baseName}.webp`);
const outputThumb = path.join(baseDir, "thumbs", `${baseName}-thumb.webp`);

async function processMap() {
  try {
    const base = sharp(inputMap);
    const { width } = await base.metadata();

    const watermark = await sharp(watermarkPath)
      .resize({ width: Math.floor(width * 0.2) })
      .png()
      .toBuffer();

    await base
      .composite([{ input: watermark, gravity: "southeast", blend: "atop" }])
      .toFormat("webp")
      .toFile(outputMap);

    console.log("✅ Watermarked image saved:", outputMap);

    await sharp(outputMap)
      .resize({ width: 480 })
      .toFormat("webp")
      .toFile(outputThumb);

    console.log("✅ Thumbnail saved:", outputThumb);

    exec(`exiftool -overwrite_original \
      -Copyright="© 2025 KnowGlobe.io – All rights reserved." \
      -Author="KnowGlobe.io" \
      -URL="https://knowglobe.io" \
      -Description="Custom educational map from KnowGlobe.io" \
      ${outputMap}`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`❌ Metadata error: ${error.message}`);
        } else {
          console.log("✅ Metadata embedded into watermarked map.");
        }
      });

  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

processMap();
