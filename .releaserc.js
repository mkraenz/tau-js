module.exports = {
  branches: ['main', 'next'],
  plugins: [
    '@semantic-release/commit-analyzer',
    '@semantic-release/release-notes-generator',
    [
      '@semantic-release/github',
      {
        assets: [
          { path: 'build/browser/index.js', label: 'JS Browser distribution', 'tau-js.browser.js' },
          { path: 'dist/main/**/*', label: 'NodeJS JS+TS distribution' },
        ],
      },
    ],
  ],
};
