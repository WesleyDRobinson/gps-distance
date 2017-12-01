# Get Invitees Challenge

### Overview
Write a program that will read a text file containing
a list of JSON-encoded customers, one per line,
and output the names and user ids of customers
within 100 km of Intercom's Dublin office
(GPS coordinates 53.3381985, -6.2592576),
sorted by user id (ascending)

> [link to the challenge](https://gist.github.com/javi7/a0c48a1a11820326cf94dcfdff1f664e)

## Usage

function signature: `getInvitees( [filename], [radius])`

Include as a module, see example.js:

```
const getInvitees = require('./lib')

getInvitees('./customers.txt')
    .then(invitees => {
        // do something with the invitees list
    })
```

Or use straight from the command line to generate two `.txt` files containing raw and formatted invitees information

```
node lib/index.js 'path/to/file'
```

For an example, invoke `yarn run cli:example`

## Running Tests

[Why Ava?](https://github.com/avajs/ava#why-ava)
I appreciate the clean documentation and simple interface.

```
yarn install
yarn run test
```

## Notes/ next steps

* More helpful usage and error messages would be nice.
* Refactor and increase test coverage.
* Build considerations for reading much larger .txt files (fs.readFile may require too much memory, use fs.read and handle chunks manually)
* Nicer standalone module packaging using `browserify` or `webpack` and ship to `npm`
