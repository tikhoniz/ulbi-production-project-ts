/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

// выходим  на верхний уровень проекта
module.exports = (...segments) =>
  path.resolve(__dirname, '..', '..', ...segments)
