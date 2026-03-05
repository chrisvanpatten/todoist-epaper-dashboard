import {chromium} from 'playwright';
import {Jimp} from 'jimp';
import looksSame from 'looks-same';
import {decode, encode} from 'bmp-ts';
import fs from 'fs';

function getFilePaths(filename) {
  return {
    draftImagePath: `public/${filename}.draft.png`,
    outputImagePath: `public/${filename}.png`,
  };
}

async function screenshot(url, filename) {
  const browser = await chromium.launch();
  try {
    const page = await browser.newPage();

    const response = await page.goto(url);

    if (!response.ok()) {
      console.log(`${url} returned ${response.status()}`);
      return;
    }

    await page.screenshot({
      clip: {x: 0, y: 0, width: 800, height: 480},
      path: `public/${filename}.draft.png`,
    });
  } finally {
    await browser.close();
  }
}

async function imageHasChanged(filename) {
  const {draftImagePath, outputImagePath} = getFilePaths(filename);

  // If the output image doesn't exist, that means it has changed!
  if (!fs.existsSync(outputImagePath)) {
    console.log(`${outputImagePath} does not exist`);
    return true;
  }

  const {equal} = await looksSame(draftImagePath, outputImagePath);

  return !equal;
}

async function prepareAndMaybeWrite(filename) {
  const {draftImagePath, outputImagePath} = getFilePaths(filename);

  // Modify the draft image in place.
  const draftImage = await Jimp.read(draftImagePath);
  await draftImage
    .greyscale()
    .quantize({
      colors: 2,
      colorDistanceFormula: 'pngquant',
      imageQuantization: 'floyd-steinberg',
      paletteQuantization: 'wuquant',
    })
    .write(draftImagePath);

  const hasChanged = await imageHasChanged(filename);

  // Compare the draft to the current image.
  if (!hasChanged) {
    console.log(
      `${draftImagePath} is equal to ${outputImagePath}; skipping write`
    );

    return;
  }

  /**
   * Write the draft image to the current image path if it is different from
   * the current image.
   */
  console.log(`Writing ${draftImagePath} to ${outputImagePath}`);
  await draftImage.write(outputImagePath);
}

(async () => {
  await screenshot('http://localhost:3000/todo', 'todo');
  await screenshot('http://localhost:3000/home', 'home');

  await prepareAndMaybeWrite('todo');
  await prepareAndMaybeWrite('home');
})();
