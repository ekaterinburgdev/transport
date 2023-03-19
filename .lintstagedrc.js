const path = require('path');

const buildClientEslintCommand = (filenames) =>
    `cd client && next lint --fix --file ${filenames
        .map((f) => path.relative(process.cwd(), f))
        .join(' --file ')}`;

const restEslintCommands = ['api', 'common', 'schedulers'].map(
    (package) => `cd ${package} && eslint --fix`,
);

module.exports = {
    '*.{js,jsx,ts,tsx}': ['prettier --write', buildClientEslintCommand, ...restEslintCommands],
};
