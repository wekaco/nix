import copy from 'rollup-plugin-copy';

export default [
  {
    input: 'nix.js',
    output: {
      file: 'dist/nix.js',
      format: 'iife'
    }
  },
  {
    input: 'nix-background.js',
    output: {
      file: 'dist/nix-background.js',
      format: 'iife'
    },
    plugins: [
      copy({
        targets: [ 'index.html' ],
        outputFolder: 'dist'
      })
    ]
  },
];
