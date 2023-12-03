/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs/promises')
const resolveRoot = require('../resolveRoot')
const createModel = require('./createModel')
const createUI = require('./createUI')
const createPublicApi = require('./createPublicApi')

module.exports = async (layer, sliceName) => {
  try {
    // создаем папку для слайса в указанном слое (layer)
    await fs.mkdir(resolveRoot('src', layer, sliceName))
  } catch (e) {
    console.log(`не удалось создать директорию для слайса${sliceName}`)
  }
  // последовательно создаем внутри слайса папки model, ui, index.ts
  await createModel(layer, sliceName)
  await createUI(layer, sliceName)
  await createPublicApi(layer, sliceName)
}
