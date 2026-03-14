module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*)\s*(?:\((.*)\))?: (.*)$/,
    },
  },
  rules: {
    'subject-case': [1, 'always', ['lower-case']],
    'header-max-length': [1, 'always', 72],
  },
};
