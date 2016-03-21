# Contributing

**Working on your first Pull Request?** You can learn how from this *free* series
[How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github)

## Project setup

1. Fork and clone the repo
2. `$ npm install` to install dependencies
3. `$ npm run validate` to validate you've got it working
4. Create a branch for your PR

## Contributing validators

Validator code lives in the `src/validators` directory. Each validator should have its own
directory with a sensible name. See the
[configuration-validator](https://github.com/kentcdodds/configuration-validator)
documentation for information on what you need to create a validator.

### Testing workflow
- Use `npm run watch:test` for watching unit tests during development. For faster reload
you can also run `npm run watch:test src/validators/<your-validator>/*.test.js` to only
run the tests currently relevant to you.
- To integration-test that your changes don't break existing valid configs in
`tests/passing-configs/*.js`, run `npm run test:configs`.
- To check both unit and integration tests, run `npm run test:all`.
- To only check a config you are currently testing against, temporarily edit
`tests/specific-config.js` and run `npm run test:specific:config`

All mentioned `test:...` commands are also available in a `watch:test:...` version.

### Warning message conventions
Warning messages emitted by validators should
- start with uppercase
- don't end with a period
- be separated by " - " if they contain multiple warnings. (Example: a recursive validator
  produces multiple warnings. They shouldn't be on seperate lines as this will break the output
  look and feel.)

## Contributing configs

If you'd like to add your webpack configuration to make sure we can validate it (and not break
in the future), that's great! Simply add a file in the `tests/passing-configs` directory with
your config in it. It will magically be added to the test suite.

## Committing and Pushing changes

This project uses (or soon will) [`semantic-release`](http://npm.im/semantic-release)
to do automatic releases and generate a changelog based on the commit history. So we
follow [a convention](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md)
for commit messages. Please follow this convention for your commit messages.

You can use `commitizen` to help you to follow [the convention](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md)

Once you are ready to commit the changes, please use the below commands

1. `git add <files to be comitted>`
2. `$ npm run commit`

... and follow the instruction of the interactive prompt.
