# example

## _Backend with Node.js_

After cloning the project, follow the steps to work on your local machine.

- Create a file named 'config.env' under config folder
- Get the all .env file from developers
- npm run prepare
- Add pre-commit file under .husky (if not exists)
- npm install --save
- npm start
- ✨ Now see magic ✨


## Don't know how to install husky?

This project requires [Node.js](https://nodejs.org/) version 14+ to run.

Install the dependencies and devDependencies then follow the steps for this project

### _For Mac & Linux users..._

```sh
npm run prepare
npx husky add .husky/pre-commit "npx lint-staged"
```

### _For Windows users..._

```sh
npm run prepare
```

now create a file named 'pre-commit' under .husky & add this code

```sh
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx lint-staged
```

## License

[MIT](https://opensource.org/licenses/MIT)
