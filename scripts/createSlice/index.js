/* eslint-disable @typescript-eslint/no-var-requires */
const createTemplate = require('./templates/createTemplate')

/* из аргументов строки node .\scripts\createSlice\index.js features testFeatures
  достаем слой (features или entities или pages)
*/
const layer = process.argv[2]
/* достаем название слайса */
const sliceName = process.argv[3]

// указываем в массиве какие папки могут быть
const layers = ['features', 'entities', 'pages']
// проверка указана ли папка и есть ли такая папка в массиве
if (!layer || !layers.includes(layer)) {
  throw new Error(`Укажите слой ${layers.join(' или ')}`)
}
// проверка указано ли название слоя
if (!sliceName) {
  throw new Error('Укажите название слайса')
}

// вызываем функцию createTemplate /scripts/createSlice/templates/createTemplate.js
createTemplate(layer, sliceName)
