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

I recommend that you run `npm run watch:test:all` while developing your validator (and your
validator's test) to make sure you're writing the validator to cover the use cases of the
configs we have in the project.

## Contributing configs

If you'd like to add your webpack configuration to make sure we can validate it (and not break
in the future), that's great! Simply add a file in the `tests/passing-configs` directory with
your config in it. It will magically be added to the test suite.

## Committing and Pushing changes

This project uses (or soon will) [`semantic-release`](http://npm.im/semantic-release)
to do automatic releases and generate a changelog based on the commit history. So we
follow [a convention](https://github.com/stevemao/conventional-changelog-angular/blob/master/convention.md)
for commit messages. Please follow this convention for your commit messages.



