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

let numberOfCharacters = 0
let numberOfLines = 0
let numberOfWords = 0

const pairs = []
const allWords = []
const allPunctuation = []
const allCharacters = []

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
        numberOfLines++

        // Compact and replace all whitespace into regular, single spaces
        line = line.replace(/\s+/g, ' ')

        line.split('').forEach(character => {
          if (allCharacters[character] === undefined) allCharacters[character] = { key: character, value: 0 }
          allCharacters[character]["value"]++
          numberOfCharacters++
        })

        words = line.split(' ')

        words.forEach(word => {
          numberOfWords++

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

          const _numberOfPairs = word.length - 1
          for (let position = 0; position < _numberOfPairs; position++) {
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
  console.log(`Finished analyzing '${language}'`)
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
console.log(`All pairs counted, ${allPairs.length} found`);

alphanumericPairs.sort(function(a, b) {
  return b.value - a.value
})
fileData = '| Pair | Count |\n| ---- | ----- |\n'
alphanumericPairs.forEach(pair => {
  fileData += '| ' + pair.key  + ' | ' + pair.value + ' |\n'
})
fs.writeFile('./results/alphanumeric_pairs.md', fileData, onFileWriteErrorHandler)
console.log(`All alphanumeric pairs counted, ${alphanumericPairs.length} found`);

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
console.log(`All words counted, ${numberOfWords} found`);

//

const punctuations = []
for (const key in allPunctuation) {
  punctuations.push(allPunctuation[key])
}

punctuations.sort(function(a, b) {
  return b.value - a.value
})
fileData = '| Punctuation | Count |\n| ----------- | ----- |\n'
punctuations.forEach(punctuation => {
  fileData += '| ' + punctuation.key  + ' | ' + punctuation.value + ' |\n'
})
fs.writeFile('./results/all_punctuation.md', fileData, onFileWriteErrorHandler)
console.log(`All punctuation counted, ${punctuations.length} found`);

const characters = []
for (const key in allCharacters) {
  characters.push(allCharacters[key])
}
characters.sort(function(a, b) {
  return b.value - a.value
})
fileData = '| Character | Count |\n| --------- | ----- |\n'
characters.forEach(character => {
  fileData += '| ' + character.key  + ' | ' + character.value + ' |\n'
})
fs.writeFile('./results/all_characters.md', fileData, onFileWriteErrorHandler)
console.log(`All characters counted, ${numberOfCharacters} found`);

const timeElapsed = Math.round((new Date().getTime() - startedAt) / 100) / 10
console.log(`${numberOfLines} lines parsed in ${timeElapsed} seconds`);

function onFileWriteErrorHandler(error) {
  // Do nothing...
  // This is just here to suppress the silly deprecation warning.
}
