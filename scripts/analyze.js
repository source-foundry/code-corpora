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
const startedAt = new Date().getTime()

// objective-c is disabled, because the corpus folder contains subfolder,
// and it is a Sunday, which makes me too lazy to consider adding things
// such as recursion.
const languages = [
  'c',
  'cc',
  'java',
  'javascript',
  // 'objective-c',
  'php',
  'python',
  'ruby',
  'swift'
]

const pairs = []
const allWords = []
const allPunctuation = []

languages.forEach(language => {
  const languagePath = '../' + language
  const projects = fs.readdirSync(languagePath)
  projects.forEach(project => {
    const projectPath = languagePath + '/' + project
    const files = fs.readdirSync(projectPath)
    files.forEach(file => {
      const filePath = projectPath + '/' + file
      const lines = fs.readFileSync(filePath, { encoding: 'utf8' }).split('\n')
      lines.forEach(line => {
        // Compact and replace all whitespace into regular, single spaces
        line = line.replace(/\s+/g, ' ')

        words = line.split(' ')

        words.forEach(word => {
          const foundWords = word.match(/[A-Za-z0-9]+/g)
          if (foundWords) {
            foundWords.forEach(_word => {
              if (allWords[_word] === undefined) allWords[_word] = { key: _word, value: 0 }
              allWords[_word]["value"]++
            })
          }

          const foundPunctuation = word.match(/[^A-Za-z0-9]+/g)
          if (foundPunctuation) {
            foundPunctuation.forEach(_punctuation => {
              if (allPunctuation[_punctuation] === undefined) allPunctuation[_punctuation] = { key: _punctuation, value: 0 }
              allPunctuation[_punctuation]["value"]++
            })
          }

          const numberOfPairs = word.length - 1
          for (let position = 0; position < numberOfPairs; position++) {
            const pair = String(word.substring(position, position + 2))
            if (pairs[pair] === undefined) {
              pairs[pair] = { key: pair, value: 0 }
            }
            pairs[pair]["value"]++
          }
        })
      })
    })
  })
  console.log(`Finished analyzing '${language}'...`)
})

let fileData

const allPairs = []
const alphanumericPairs = []

for (const key in pairs) {
  const pair = pairs[key]
  const value = pairs[key].value
  if (value > 10) {
    allPairs.push(pair)
    if (key.match(/^[a-zA-Z0-9]+$/)) {
      alphanumericPairs.push(pair)
    }
  }
}

allPairs.sort(function(a, b) {
  return b.value - a.value
})
fileData = '| Pair | Count |\n| ---- | ----- |\n'
allPairs.forEach(pair => {
  fileData += '| ' + pair.key  + ' | ' + pair.value + ' |\n'
})
fs.writeFile('./results/all_pairs.md', fileData, onFileWriteErrorHandler)

alphanumericPairs.sort(function(a, b) {
  return b.value - a.value
})
fileData = '| Pair | Count |\n| ---- | ----- |\n'
alphanumericPairs.forEach(pair => {
  fileData += '| ' + pair.key  + ' | ' + pair.value + ' |\n'
})
fs.writeFile('./results/alphanumeric_pairs.md', fileData, onFileWriteErrorHandler)

//

const all_words = []
for (const key in allWords) {
  all_words.push(allWords[key])
}

all_words.sort(function(a, b) {
  return b.value - a.value
})
fileData = '| Word | Count |\n| ---- | ----- |\n'
all_words.forEach(word => {
  fileData += '| ' + word.key  + ' | ' + word.value + ' |\n'
})
fs.writeFile('./results/all_words.md', fileData, onFileWriteErrorHandler)

//

const punctuations = []
for (const key in allPunctuation) {
  punctuations.push(allPunctuation[key])
}

punctuations.sort(function(a, b) {
  return b.value - a.value
})
fileData = '| Punctuation | Count |\n| ---- | ----- |\n'
punctuations.forEach(punctuation => {
  fileData += '| ' + punctuation.key  + ' | ' + punctuation.value + ' |\n'
})
fs.writeFile('./results/all_punctuation.md', fileData, onFileWriteErrorHandler)

const timeElapsed = Math.round((new Date().getTime() - startedAt) / 100) / 10
console.log(timeElapsed + ' seconds')

function onFileWriteErrorHandler(error) {
  // Do nothing...
  // This is just here to suppress the silly deprecation warning.
}
