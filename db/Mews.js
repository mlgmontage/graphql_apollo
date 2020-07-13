const DataStore = require('nedb-promise')

const Mews = DataStore({
  filename: 'data/Mews.json',
  autoload: true,
})

module.exports = Mews
