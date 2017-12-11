/*
Parses the entire code corpora and counts the number of occurrences of:
- character pairs
- alphanumeric character pairs
- words (alphanumeric sequences)
- punctuation sequences (non-alphanumeric sequences)

Writes results to several .md files in the ./results subfolder.

Usage:
node analyze.js

NOTE: code is ugly, blah blah
*/

const fs = require('fs')
const process = require('process')
const App = require('./lib/app.js')
const startedAt = new Date().getTime()

const languages = [
  'c',
  'cc',
  'java',
  'javascript',
  'objective-c',
  'php',
  'python',
  'ruby',
  'swift'
]

const app = new App('..')

languages.forEach(language => {
  app.loadLanguage(language)
})

app.writeResultsToDisk()
app.showStats()
process.exit()
