### @launchquest/log

[![License: LQL 1.0](https://img.shields.io/badge/License-LQL%201.0-brightgreen)](https://github.com/launchquest/license/blob/master/README.md) ![NPM Version](https://img.shields.io/npm/v/@launchquest/log) ![NPM Downloads](https://img.shields.io/npm/d18m/@launchquest/log)

`@launchquest/log` is a customizable logging library for Node.js, designed to provide a structured, colorful, and configurable logging experience. It supports multiple log levels and customizable options to fit various logging needs.

![Preview](https://i.imgur.com/WQJhjCs.png)

This project is brought to you by [Launch Quest](https://launchquest.co).

#### Installation

To install `@launchquest/log`, run:

```bash
npm install @launchquest/log
```

#### Basic Usage

To use `@launchquest/log`, first import it into your project:

```js
import { @launchquest/log } from '@launchquest/log'

const log = new @launchquest/log()
log.info('This is an informational message')
log.warn('This is a warning message')
log.error('This is an error message')
```

#### Log Levels

`@launchquest/log` supports six log levels, each with its own label and color:

- `trace`: TRC (gray background)
- `debug`: DBG (white background)
- `info`: INF (blue background)
- `warn`: WRN (yellow background)
- `error`: ERR (red background)
- `fatal`: FTL (red background, bold text, triggers `process.exit` by default)

```js
log.trace('This is a trace message')
log.debug('This is a debug message')
log.info('This is an informational message')
log.warn('This is a warning message')
log.error('This is an error message')
log.fatal('This is a fatal error message')
```

#### Customization Options

When creating a new `@launchquest/log` instance, you can customize various options:

- `name`: A name to prefix all log messages (default: `''`)
- `timestamp`: The timestamp format (default: `'HH:mm:ss.SSS'`)
- `logLevel`: The minimum log level to display (default: `'info'`)
- `exitOnFatal`: Whether to exit the process on a fatal error (default: `true`)

```js
const log = new @launchquest/log({
  name: 'myApp',
  timestamp: 'YYYY-MM-DD HH:mm:ss',
  logLevel: 'debug',
  exitOnFatal: false
})

log.info('This is an informational message with custom settings')
```

#### Named Loggers

You can create named child loggers using the `extend` method:

```js
const log = new @launchquest/log({ name: 'app' })
const dbLog = log.extend('database')

dbLog.info('Database connected')
log.info('App started')
```

Output:

```
09:44:32.010 INF [app:database] Database connected
09:44:32.010 INF [app] App started
```

#### Full Example

Here’s a complete example showcasing various features:

```js
import { @launchquest/log } from '@launchquest/log'

const log = new @launchquest/log({
  name: 'myService',
  timestamp: 'HH:mm:ss.SSS',
  logLevel: 'trace',
  exitOnFatal: true
})

log.trace('Initialized')

log.info('This is a string test', 'Hello, world!')
log.info('This is a number test', 42)
log.info('This is a boolean test', true)
log.info('This is a null test', null)
log.info('This is an undefined test', undefined)
log.info('This is a function test', () => {})
log.info('This is an array test', [1, 2, 3])
log.info('This is an object test', { a: 1, b: 'two', c: [3, 4, 5], d: { e: 6, f: 7 } })

const authLog = log.extend('auth')
authLog.debug('User login attempt')

const dbLog = log.extend('database')
dbLog.info('Database connected')
```

This will output:

```
10:07:09.766 TRC [myService] Initialized
10:07:09.767 INF [myService] This is a string test Hello, world!
10:07:09.767 INF [myService] This is a number test 42
10:07:09.767 INF [myService] This is a boolean test true
10:07:09.767 INF [myService] This is a null test null
10:07:09.767 INF [myService] This is an undefined test undefined
10:07:09.767 INF [myService] This is a function test [Function (anonymous)]
10:07:09.768 INF [myService] This is an array test [ 1, 2, 3 ]
10:07:09.768 INF [myService] This is an object test { a: 1, b: 'two', c: [ 3, 4, 5 ], d: { e: 6, f: 7 } }
10:07:09.768 DBG [myService:auth] User login attempt
10:07:09.768 INF [myService:database] Database connected
10:07:09.768 WRN [myService] uh oh
10:07:09.768 ERR [myService] aaahhh
10:07:09.768 FTL [myService] goodbye cruel world

```

### License

This project is licensed under the LQL-1.0 License. See the LICENSE file for details.
