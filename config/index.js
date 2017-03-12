// config/index.js
// VRO Web
// 
// Initially created by Leonard Pauli, okt 2016

const path = require('path')
const rootDir = path.join(__dirname, '..')

// Gets overwritten by specific env file
const defaults = {
  root: rootDir,
  staticDir: path.join(rootDir, 'static'),
  viewTemplates: path.join(rootDir, 'source/templates'),
  fromEmail: 'odenplanselevkar@vrg.se',//'Odenplans Elevkår <odenplanselevkar@vrg.se>',
  isDev: false,
  expressPort: 3000,
  catcher: require('./catcher'),
  usingCRLF:true

}


module.exports = {
  dev:  Object.assign({}, defaults, require('./dev'))
  // test: 
  // prod: 
}[process.env.NODE_ENV || 'dev']