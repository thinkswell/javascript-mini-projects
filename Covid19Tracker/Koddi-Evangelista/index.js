#!/usr/bin/env node
const figlet = require('figlet')
const clear = require('clear')
const inquirer = require('inquirer')
const chalk = require('chalk')
const CLI = require('clui')
const fetch = require('node-fetch')
const { table } = require('table')

const Spinner = CLI.Spinner
const spinner = new Spinner('fetching datas ...', [
  '⣾',
  '⣽',
  '⣻',
  '⢿',
  '⡿',
  '⣟',
  '⣯',
  '⣷'
])

const welcomeLogo = (appName, appDescription) => {
  clear()
  console.log(
    chalk.yellow(
      figlet.textSync(`\n${appName}`, {
        font: 'ANSI Shadow',
        width: 80,
        whitespaceBreak: true
      })
    )
  )
  console.log(`${appDescription}\n`)
}
welcomeLogo('covid19 cli', 'covid-19 cases worldwide!!! 🌍 🌎 🌏')
const exitMessage = () => {
  clear()
  console.log(
    chalk.yellow(
      figlet.textSync('bye!!', {
        font: 'ANSI Shadow',
        horizontalLayout: 'full'
      })
    )
  )
}
let index = 0
const heading = chalk.yellow
const countriesKeyValuePair = []
const countries = []
const tableTemplate = [
  [
    heading('country'),
    heading('confirmed'),
    heading('active'),
    heading('dead'),
    heading('recovered')
  ]
]
const displayTopFiveCountries = () => {
  return new Promise((resolve, reject) => {
    spinner.start()
    fetch('https://www.trackcorona.live/api/countries')
      .then(res => res.json())
      .then(data => {
        const countriesDescendingOrder = data.data.sort((x, y) => {
          return y.confirmed - x.confirmed
        })
        data.data.forEach(el => {
          countriesKeyValuePair.push({
            code: el.country_code,
            location: el.location
          })
          countries.push(el.location)
        })
        const topFiveCountries = countriesDescendingOrder.slice(0, 5)
        topFiveCountries.forEach(country => {
          tableTemplate.push([
            country.location,
            chalk.cyan(country.confirmed),
            chalk.red(country.confirmed - (country.dead + country.recovered)),
            chalk.magenta(country.dead),
            chalk.green(country.recovered)
          ])
        })
        spinner.stop()
        console.log(table(tableTemplate))
        resolve()
      })
      .catch(err => {
        console.log(err)
        reject(err)
      })
  })
}
const getSpecificCountry = () => {
  inquirer
    .prompt([
      {
        name: 'nextAction',
        type: 'confirm',
        message:
          index === 0
            ? chalk.red.bold('See specific country ?')
            : chalk.red.bold('See another country ?')
      }
    ])
    .then(ans => {
      index++
      if (ans.nextAction) {
        inquirer
          .prompt([
            {
              name: 'location',
              type: 'list',
              message: chalk.red.bold('choose country: '),
              choices: countries.sort()
            }
          ])
          .then(ans => {
            const code = countriesKeyValuePair.find(
              el => el.location === ans.location
            )
            spinner.start()
            fetch(`https://www.trackcorona.live/api/countries/${code.code}`)
              .then(res => res.json())
              .then(data => {
                const item = data.data[0]
                tableTemplate.splice(1)
                tableTemplate.push([
                  item.location,
                  chalk.cyan(item.confirmed),
                  chalk.red(item.confirmed - (item.dead + item.recovered)),
                  chalk.magenta(item.dead),
                  chalk.green(item.recovered)
                ])
                spinner.stop()
                console.log(table(tableTemplate))
                getSpecificCountry()
              })
          })
      } else {
        exitMessage()
      }
    })
}
displayTopFiveCountries().then(() => {
  getSpecificCountry()
})
