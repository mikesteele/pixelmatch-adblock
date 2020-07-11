const pixelmatch = require('pixelmatch');
const htmlToImage = require('html-to-image');

// Using webpack url-loader, we can load the reference image as a Base64 URI to re-create on the client
import fbSponsoredPostReference from './fb.png';

const htmlToCanvas = el => {
  return htmlToImage.toCanvas(el);
};

const doCanvasElementsMatch = (canvas1, canvas2) => {
  const width = canvas1.width;
  const height = canvas1.height;

  // Create diff canvas
  const canvas = document.createElement('canvas');
  const diffCtx = canvas.getContext('2d');
  const diff = diffCtx.createImageData(width, height);
  const image1 = canvas1.getContext('2d').getImageData(0, 0, width, height);
  const image2 = canvas2.getContext('2d').getImageData(0, 0, width, height);
  const mismatchedPixels = pixelmatch(image1.data, image2.data, diff.data, width, height, { threshold: 0.1 });
  diffCtx.putImageData(diff, 0, 0);
  document.body.appendChild(canvas);

  // This threshold could be even lower
  return mismatchedPixels < 50;
};

const createCanvasFromImageElement = image => {
  const width = image.naturalWidth;
  const height = image.naturalHeight;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0, width, height);

  return canvas;
};

const createFBReferenceImage = () => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = fbSponsoredPostReference;
  });
};

const createFBReferenceCanvas = () => {
  return new Promise(resolve => {
    createFBReferenceImage()
      .then(createCanvasFromImageElement)
      .then(resolve);
  });
}

const isFBSponsoredLink = el => {
  return new Promise(async resolve => {
    const fbReferenceCanvas = await createFBReferenceCanvas();
    const domCanvas = await htmlToCanvas(el);

    // For debugging, render the canvases to the screen
    document.body.appendChild(fbReferenceCanvas);
    document.body.appendChild(domCanvas);

    resolve(doCanvasElementsMatch(fbReferenceCanvas, domCanvas));
  });
};

window.pixelmatch_adblock = {
  isFBSponsoredLink,
};
