# pixelmatch-adblock

An adblocker based on how ads look.

This is a proof of concept for a single website (FB) and is not meant for production use.

# Intro

Some sites get around adblockers by obscuring their DOM. They add additional hidden elements in between "Sponsored" labels, randomly generate class names, etc. (See https://github.com/mikesteele/pixelmatch-adblock/raw/master/readme-1.png and https://github.com/mikesteele/pixelmatch-adblock/raw/master/readme-2.png)

But they can't get around is how the final DOM looks. If we can compare the DOM's look to a reference image, we can adblock.

This is only a proof of concept. It can detect a sponsored link, but doesn't include removing it from the DOM. It bundles reference photos as data URI to be recreated on the client. It uses https://github.com/bubkoo/html-to-image to transform DOM into a canvas and https://github.com/mapbox/pixelmatch to compare it to the reference.

# Pixel matching results

In the screenshots below, the top image is the reference image bundled into the script, the second is the image constructed from the DOM, and the third is the diff.

<img src="https://github.com/mikesteele/pixelmatch-adblock/raw/master/result-1.png">

<img src="https://github.com/mikesteele/pixelmatch-adblock/raw/master/result-2.png">

# Install & build

```
yarn
yarn build
```

Run `dist/index.js` on FB, then you can find all sponsored posts on the page:

```
pixelmatch_adblock.blockAllFBSponsoredPosts();
```

To run with debug mode, run:

```
pixelmatch_adblock.setDebugMode(true);
pixelmatch_adblock.blockAllFBSponsoredPosts();
```

Debug mode will render the reference, DOM, and diff canvases at the bottom of the document body.
