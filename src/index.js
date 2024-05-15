// Copyright 2024 Launch Quest Ltd - All Rights Reserved
// Use of this source code is governed by the LQL-1.0
// license that can be found in the LICENSE file.

import chalk from 'chalk'
import moment from 'moment'

class Log {
  constructor(options = {}) {
    this.name = options.name || ''
    this.timestamp = options.timestamp !== undefined ? options.timestamp : 'HH:mm:ss.SSS'
    this.logLevel = options.logLevel || 'info'
    this.exitOnFatal = options.exitOnFatal !== undefined ? options.exitOnFatal : true
    this.levels = ['trace', 'debug', 'info', 'warn', 'error', 'fatal']
    this.labels = {
      trace: 'TRC',
      debug: 'DBG',
      info: 'INF',
      warn: 'WRN',
      error: 'ERR',
      fatal: 'FTL'
    }
    this.labelColors = {
      trace: chalk.bgGray.black,
      debug: chalk.bgWhite.black,
      info: chalk.bgBlue.black,
      warn: chalk.bgYellow.black,
      error: chalk.bgRed.black,
      fatal: chalk.bgRed.black
    }
    this.nameColors = {
      trace: chalk.gray,
      debug: chalk.white,
      info: chalk.blue,
      warn: chalk.yellow,
      error: chalk.red,
      fatal: chalk.red.bold
    }
    this.textColors = {
      trace: chalk.gray,
      debug: chalk.white,
      info: chalk.white,
      warn: chalk.yellow,
      error: chalk.red,
      fatal: chalk.red.bold
    }
  }

  log(level, ...args) {
    if (this.levels.indexOf(level) < this.levels.indexOf(this.logLevel)) {
      return
    }
    const timestamp = chalk.gray(this.timestamp ? moment().format(`${this.timestamp} `) : '')
    const namePrefix = this.name ? this.nameColors[level](` [${this.name}]`) : ''
    const logPrefix = this.labelColors[level](` ${this.labels[level]} `)
    const logMessage = `${timestamp}${logPrefix}${namePrefix}`
    console.log(logMessage, ...args)

    if (level === 'fatal' && this.exitOnFatal) {
      process.exit(1)
    }
  }

  trace(...args) {
    this.log('trace', ...args)
  }

  debug(...args) {
    this.log('debug', ...args)
  }

  info(...args) {
    this.log('info', ...args)
  }

  warn(...args) {
    this.log('warn', ...args)
  }

  error(...args) {
    this.log('error', ...args)
  }

  fatal(...args) {
    this.log('fatal', ...args)
  }

  extend(name) {
    return new Log({
      name: this.name ? `${this.name}:${name}` : name,
      timestamps: this.timestamps,
      logLevel: this.logLevel,
      exitOnFatal: this.exitOnFatal
    })
  }
}

export { Log }
