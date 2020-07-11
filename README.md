# pixelmatch-adblock
An adblocker based on how ads look

# Intro

Some sites get around adblockers by obscuring their DOM. They add additional hidden elements inbetween "Sponsored" labels, randomly generate class names, etc. But what they can't get around is how the final DOM looks. If we can compare the DOM's look to a reference image, we can adblock. 

This is a WIP. It bundles reference photos as data to be recreated on the client. It will use https://github.com/bubkoo/html-to-image to transform DOM into a canvas and https://github.com/mapbox/pixelmatch to compare it to the reference.

# Example

What I see:

<img src="https://github.com/mikesteele/pixelmatch-adblock/raw/master/readme-1.png">

What's in the DOM:

<img src="https://github.com/mikesteele/pixelmatch-adblock/raw/master/readme-2.png">
