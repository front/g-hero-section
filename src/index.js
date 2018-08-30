
import { blocks } from '@frontkom/gutenberg-js';
const { registerBlockType } = blocks;

import * as hero from './hero-section';


// Export register block functionality
export function registerBlocks (category) {
  registerBlockType(`${category}/${hero.name}`, { category, ...hero.settings });
}
