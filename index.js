const pixelmatch = require('pixelmatch');
const htmlToImage = require('html-to-image');

// Using webpack url-loader, we can load the reference image as a Base64 URI to re-create on the client
import fbSponsoredPostReference from './fb.png';

const htmlToImageElement = el => {
  return new Promise(resolve => {
    htmlToImage.toPng(node)
      .then(dataUrl => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = dataUrl;
      });
  });
};

const doImageElementsMatch = (image1, image2) => {
  // TODO - pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});
};

const createFacebookReferenceImage = () => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = fbSponsoredPostReference;
  });
};

const isFacebookSponsoredLink = el => {
  return new Promise(resolve => {
    const createFacebookReferenceImagePromise = createFacebookReferenceImage();
    const htmlToImageElementPromise = htmlToImageElement(el);
    Promise.all([createFacebookReferenceImagePromise, htmlToImageElementPromise])
      .then(images => {
        resolve(doImageElementsMatch(images[1], images[2]));
      });
  });
};

window.pixelmatch_adblock = {
  isFacebookSponsoredLink,
};
