# Simple Gallery

A lightweight gallery that displays a series of image elements in a
lightbox-style modal.

## Installation

The simplest way of using this library is to copy the dist folder to your
project and then reference the `gallery.css` and `gallery.js` files in your
html:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Simple Gallery Example</title>

  <link rel="stylesheet" href="/path/to/dist/gallery.css">

</head>

<body>

  <div id="gal1" class="gallery">
    <img src="./images/img1.jpg" alt="Malaga at Christmas">
    <img src="./images/img2.jpg" alt="Seagull">
    <img src="./images/img3.jpg" alt="Lorem ipsum">
    <img src="./images/img4.jpg" alt="At the carwash">
    <img src="./images/img5.jpg" alt="Shell Sculpture">
  </div>

  <script src="/path/to/dist/gallery.js"></script>
</body>
</html>

```

It doesn't provide styling for your images in the page but add `.gallery`
around a series of images and each image will get a click event handler that
will launch the gallery modal.

## Example Usage

See the demo folder for a working example:

[Working demo](https://mikeh74.github.io/simplegallery/demo/)

## Basic Usage

Wrap the images in a container with a class that can be passed to the script.
By default, this class is `gallery`, but it can be changed when initializing
the script.

Here is a simple setup:

```html
<div class="gallery">
  <div class="gallery-item">
    <img src="./images/img1.jpg" data-sg-desc="This is my description" alt="Malaga at Christmas">
  </div>
  <div class="gallery-item">
    <img src="./images/img2.jpg" data-sg-src="./images/img5.jpg" alt="Seagull">
  </div>
  <div class="gallery-item">
    <img src="./images/img3.jpg" alt="Southport at Sunset">
  </div>
</div>

<script src="./dist/gallery.js"></script>

```

## Data variables
The following data attributes can be used on the image elements to provide
additional functionality:

| Data Attribute     | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| `data-sg-desc`     | Adds a description to the image, displayed in the modal.                    |
| `data-sg-src`      | Specifies an alternate image source for the modal (e.g., higher resolution).|

Example:

```html
<img src="./images/img1.jpg" data-sg-desc="This is my description" alt="Malaga at Christmas">
<img src="./images/img2.jpg" data-sg-src="./images/img5.jpg" alt="Seagull">
```

## CSS Variables and styling

You will need to include the `style.css` file in your project. The easiest way 
is to copy the CSS file to your project.

If you are using a bundler, you might have an alternate workflow (see the 
webpack/rollup/parcel documentation for more on managing CSS files via
those options).

The following CSS variables are available:
 * --sg-modal-bg: Background color for the modal.
 * --sg-text-color: Text color used within the modal.
 * --sg-btn-bg: Background color for buttons within the modal.
 * --sg-modal-zindex: Z-index value for the modal to ensure it appears above other elements.
 * --sg-font-family: Font family used for text within the modal.

Add them to the :root element in your CSS to override these properties to
provide some basic theming to make the styling more in keeping with your
site.

If you want styling that is more bespoke then it is recommended that you
copy the style.css file from the dist folder and add it directly to your
project and update as necessary (the SCSS version can be found in the src
folder).
