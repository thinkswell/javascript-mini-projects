#!/usr/bin/env node
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

const Fibonacci = require('./fibonacci')

const { n } = yargs(hideBin(process.argv)).argv

if (!n) {
  console.error('Input "-n" to receive a fibonacci number')
  console.log('example: "node src/index.js -n 5"')
} else {
    console.log(`Fibonacci of number: ${n}`)
    const fibonacci = new Fibonacci();
    const [...result]= fibonacci.execute(n)
    console.log(result)
}
