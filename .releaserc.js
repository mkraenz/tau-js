module.exports = {
  branches: ['main', 'next'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        assets: [
          {
            path: 'build/browser/index.js',
            label: 'tau-js.browser.js',
            name: 'tau-js.browser.js',
          },
          {
            path: 'build/main/**/*.{js,ts}',
            label: 'NodeJS JS+TS distribution',
          },
        ],
      },
    ],
  ],
};
