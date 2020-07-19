const pixelmatch = require('pixelmatch');
const htmlToImage = require('html-to-image');
const fastdom = require('fastdom');

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
  //document.body.appendChild(canvas);

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

const isFBSponsoredLink = (el, fbReferenceCanvas) => {
  return new Promise(async resolve => {
    // The actual height of the element in the DOM is half
    // of the height it becomes when transformed into a canvas
    // via htmlToCanvas().
    // I'm not sure why this is, may be a coincedence.
    const adjustedReferenceHeight = fbReferenceCanvas.height / 2;

    fastdom.measure(async () => {
      const elHeight = el.clientHeight;
      // This is for performance.
      // It's very slow to transform every element on the page into a canvas.
      // So we transform those elements who match the same height.
      // We're using height instead of width because FB post width changes
      // based on screen-size, but height doesn't.
      if (elHeight === adjustedReferenceHeight) {
        const domCanvas = await htmlToCanvas(el);
        // For debugging, render the canvases to the screen
        // document.body.appendChild(fbReferenceCanvas);
        // document.body.appendChild(domCanvas);
        resolve(doCanvasElementsMatch(fbReferenceCanvas, domCanvas));
      } else {
        resolve(false);
      }
    });
  });
};

const findAllFBSponsoredPosts = async () => {
  const fbReferenceCanvas = await createFBReferenceCanvas();
  const allNodes = [...document.body.getElementsByTagName('*')];
  console.log(fbReferenceCanvas.height)
  // Run in parallel
  allNodes.forEach(async node => {
    const isSponsored = await isFBSponsoredLink(node, fbReferenceCanvas);
    if (isSponsored) {
      console.log('Found sponsored link:');
      console.log(node);
      node.style.outline = '5px solid red';
    }
  });
};

window.pixelmatch_adblock = {
  findAllFBSponsoredPosts,
};
