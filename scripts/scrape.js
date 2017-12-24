/*
NOTE: best not to use this yet

This file fetches HTML content from a set of websites, and tries to fetch
linked JS and CSS content separately.

Usage:
node scrape.js
*/

const fs = require('fs')
const https = require('https')
const { URL } = require('url')

const urls = [
  "https://en.wikipedia.org/wiki/Main_Page",
  "https://www.reddit.com/",
  "https://www.amazon.com/",
  "https://edition.cnn.com/",
  "https://nos.nl/",
  "https://www.nu.nl/"
]

urls.forEach(url => {
  saveURLContents(url, 'html')
})

function saveURLContents(url, type) {
  let slug = url.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  if (slug.length > 92) slug = slug.substring(0, 92)

  // try {
  https.get(url, (response) => {
    const { statusCode } = response
    if (statusCode !== 200) {
      console.error(statusCode, url)
      return
    }
    response.setEncoding('utf8')
    let rawData = ''
    response.on('data', chunk => { rawData += chunk })
    response.on('end', () => {
      console.log(type, slug, rawData.length)
      const filename = `../www/${type}/${slug}.txt`
      fs.writeFileSync(filename, rawData)
      if (type === 'html') {
        // if (url.substring(url.length - 1) === '/') url = url.substring(0, url.length - 1)
        // parseJSLinks(rawData, url)
        parseCSSLinks(rawData, url)
      }
    })
  })
  // } catch (exception) {
  //   // TODO ignore for now
  // }
}

function parseCSSLinks(data, baseURL) {
  const links = data.match(/<link[^>]*>/g)
  if (links) {
    links.forEach(link => {
      const rel = parseAttribute(link, 'rel')
      const href = parseAttribute(link, 'href')
      if (rel === 'stylesheet') {
        if (href) {
          let cssLink = new URL(href, baseURL)
          // cssLink.rejectUnauthorized = false
          saveURLContents(cssLink.href, 'css')
        }
      }
    })
  }
}

function parseJSLinks(data, baseURL) {
  const links = data.match(/<script[^>]*>/g)
  if (links) {
    links.forEach(link => {
      const src = parseAttribute(link, 'src')
      if (src) {
        jsLink = new URL(src, baseURL)
        // jsLink.rejectUnauthorized = false
        saveURLContents(jsLink.href, 'js')
      }
    })
  }
}

function parseAttribute(data, attribute) {
  let pattern = attribute + '='
  pattern += `(?:['"])`
  pattern += `([^'"]+)`
  pattern += `(?:['"])`
  const re = new RegExp(pattern)
  const result = data.match(re)
  if (result) {
    return result[1]
  }
  return false
}
