# g-hero-section

This project is both a Proof of Concept and Boilerplate for blocks meant to be used with the [GutenbergJS](https://github.com/front/gutenberg-js) editor. 

A demo is available on [Storypage](https://storypage.devz.no/).


# Installation

Install from npm: 

```
$ npm install @frontkom/g-hero-section
```

Then load the block module and css on the editor:

```
import { registerBlocks } from '@frontkom/g-hero-section';
import '@frontkom/g-hero-section/build/style.css';
...

// Somewhere on the editor initialization
registerBlocks();

...
```

This is create a new block category called "**Gutenberg-Cloud Blocks**" containing the "**Hero Section**" block.


Check the Storypage example here: [https://github.com/front/storypage/blob/develop/src/blocks/external.js](https://github.com/front/storypage/blob/develop/src/blocks/external.js)


## Project Structure
TBA


## Development
TBA


## Gutenberg Cloud
TBA