# pixelmatch-adblock
An adblocker based on how ads look

# Intro

Some sites get around adblockers by obscuring their DOM. They add additional hidden elements in between "Sponsored" labels, randomly generate class names, etc. (See https://github.com/mikesteele/pixelmatch-adblock/raw/master/readme-1.png and https://github.com/mikesteele/pixelmatch-adblock/raw/master/readme-2.png)

But they can't get around is how the final DOM looks. If we can compare the DOM's look to a reference image, we can adblock.

This is a WIP. It bundles reference photos as data to be recreated on the client. It will use https://github.com/bubkoo/html-to-image to transform DOM into a canvas and https://github.com/mapbox/pixelmatch to compare it to the reference.

# Results

In the screenshots below, the top image is the reference image bundled into the script, the second is the image constructed from the DOM, and the third is the diff.

<img src="https://github.com/mikesteele/pixelmatch-adblock/raw/master/result-1.png">

<img src="https://github.com/mikesteele/pixelmatch-adblock/raw/master/result-2.png">

# Install & build

```
yarn
yarn build
```

Run `dist/index.js` on FB, then you can try to detect a sponsored link:

```
pixelmatch_adblock.isFacebookSponsoredLink(document.getElementById('feedlabel_263;1098900509;10223658229339304;10223658229339304;1594478623:1347754931747571503:5:0'));
```
