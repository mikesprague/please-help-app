import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import tailwindcss from 'tailwindcss';

const cssSafelistClassArray = [];

export default {
  plugins: [
    autoprefixer,
    tailwindcss,
    cssnano({
      preset: 'default',
    }),
    purgeCSSPlugin({
      content: [
        './src/index.html',
        './src/index.js',
        './src/components/**/*.jsx',
      ],
      fontFace: false,
      safelist: cssSafelistClassArray,
    }),
  ],
};
