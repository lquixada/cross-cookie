cross-cookie
[![Build Status](https://travis-ci.org/lquixada/cross-cookie.svg?branch=master)](https://travis-ci.org/lquixada/cross-cookie)
[![NPM Version](https://img.shields.io/npm/v/cross-cookie.svg?branch=master)](https://www.npmjs.com/package/cross-cookie)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
================

Universal cookie for browsers and React Native. The scenario that cross-cookie really shines is when the same javascript codebase needs to run on different platforms.

- **Platform agnostic**: browsers or React Native
- **Simple interface**: no instantiation, no configuration and no extra dependency

* * *

## Table of Contents

-   [Install](#install)
-   [Usage](#usage)
-   [Supported environments](#supported-environments)
-   [License](#license)
-   [Author](#author)

* * *

## Install

```sh
npm install --save cross-cookie
```

```javascript
// Using ES6 modules
import cookie from 'cross-cookie';

// Using CommonJS modules
const cookie = require('cross-cookie');
```

* * *

## Usage

The code below works the same way be it on React Native or in a browser.

```javascript
const cookie = require('cross-cookie');

// Store current user
cookie.set('user', { name: 'Marcus' })
  .then(() => console.log('cookie set!'));

// Store multiple users
cookie.set({
    user1: { name: 'Marcus' },
    user2: { name: 'John' }
  })
  .then(() => console.log('cookies set!'));

// Get current user
cookie.get('user');
  .then(value => console.log(value));

// Get multiple users
cookie.getAll()
  .then(cookies => {
    console.log(cookies.user);
    console.log(cookies.user1);
    console.log(cookies.user2);
  });

// Remove current user
cookie.remove('user');
  .then(() => console.log('cookie removed!'));

// Clear all keys
cookie.clearAll()
  .then(() => console.log('all cookies removed!'));
```

> ⚠️ **Warning**: If you're in an environment that doesn't support Promises such as Internet Explorer, you must install an ES6 Promise compatible polyfill. [es6-promise](https://github.com/jakearchibald/es6-promise) is suggested.


## Supported environments

* React-Native
* Browsers
  - Chrome
  - Firefox
  - Safari 6.1+
  - Internet Explorer 10+


## License

cross-cookie is licenced under the [MIT license](https://github.com/lquixada/cross-cookie/blob/master/LICENSE) © [Leonardo Quixadá](https://twitter.com/lquixada/)


## Author

|[![@lquixada](https://avatars0.githubusercontent.com/u/195494?v=4&s=96)](https://github.com/lquixada)|
|:---:|
|[@lquixada](http://www.github.com/lquixada)|
