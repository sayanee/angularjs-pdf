# Contributing to angular-pdf

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

## for fixes

1. This is for a fix or a patch for a found bug
- Fork this project and install the packages with npm and bower

  ```
  bower i && npm i
  ```
- Create a new patch branch
- Code code code and amend the file `dist/angular-pdf.js`
- Run `npm run build` to create the build minified and example files
- Code code code
- Run `npm test` to ensure the [build](https://travis-ci.org/sayanee/angularjs-pdf) and the tests will pass
- Write a [good commit message](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)
- [Pull request](https://help.github.com/articles/using-pull-requests) using the new patch branch
- Ensure the [Travis build and tests](https://travis-ci.org/sayanee/angularjs-pdf) passes

## for new features

1. Search :mag_right: if the [feature already exists](https://github.com/sayanee/angularjs-pdf/blob/master/readme.md) or was discussed previously in [closed issues](https://github.com/sayanee/angularjs-pdf/issues?q=is%3Aissue+is%3Aclosed)
- Raise an issue to discuss :speech_balloon: , ask for feedback or help :thought_balloon:
- Ensure the pull request is accompanied by new feature code and specs / tests ( similar to [submitting fixes](https://github.com/sayanee/angularjs-pdf/blob/master/CONTRIBUTING.md#for-fixes) )

##Make a Release (for maintainers only)

1. commit your code (steps 1 - 7)
- check for outdated dependencies with `npm outdated` and `bower list`
  1. amend version number of packages in `package.json` and `bower.json`
  - install various packages `npm i` and `bower i`
  - run `npm run build` to build all files
  - commit your code
- update `readme.md` if required, especially the section on [Features](https://github.com/sayanee/angularjs-pdf#features)
- run `grunt bump`, `grunt bump:minor` or `grunt bump:major` according semantic version
- copy the `example` folder
- change to branch `gh-pages`
- copy the `example` folder from `master` branch
- commit code in `gh-pages` and `git push origin gh-pages` to publish the [examples page](http://sayan.ee/angularjs-pdf/)

##Angular-PDF is an OPEN Open Source Project

:sunny: [Read more about the OPEN Open Source Project](http://openopensource.org/) :sunny:

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

### Rules

There are a few basic ground-rules for contributors:

1. **No `--force` pushes** or modifying the Git history in any way.
1. **Non-master branches** ought to be used for ongoing work.
1. **External API changes and significant modifications** ought to be subject to an **internal pull-request** to solicit feedback from other contributors.
1. Internal pull-requests to solicit feedback are *encouraged* for any other non-trivial contribution but left to the discretion of the contributor.
1. Contributors should attempt to adhere to the prevailing code-style.

### Releases

Declaring formal releases remains the prerogative of the project maintainer.
