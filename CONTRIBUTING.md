# Contributing to angular-pdf

:+1::tada: First off, thanks for taking the time to contribute! :tada::+1:

## for fixes

1. This is for a fix or a patch for a found bug
- Fork this project and install the packages with npm

  ```
  npm install
  ```
- Install peer dependencies with npm

  ```
  npm install angular pdfjs-dist
  ```
- Create a new patch branch
- Code code code and amend the file `src/angular-pdf.js`
- Run `npm run start` to start the `webpack-dev-server` and open `http://localhost:8080`
- Code code code
- Run `npm test` to ensure the [build](https://travis-ci.org/sayanee/angularjs-pdf) and the tests will pass
- update `readme.md` if required, especially the section on [Features](https://github.com/sayanee/angularjs-pdf#features)
- Ensure that you are not committing files contained in `dist` folder (builds are for mantainers' exclusive)
- Write a [good commit message](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)
- [Pull request](https://help.github.com/articles/using-pull-requests) using the new patch branch
- Ensure the [Travis build and tests](https://travis-ci.org/sayanee/angularjs-pdf) passes

## for new features

1. Search :mag_right: if the [feature already exists](https://github.com/sayanee/angularjs-pdf/blob/master/readme.md) or was discussed previously in [closed issues](https://github.com/sayanee/angularjs-pdf/issues?q=is%3Aissue+is%3Aclosed)
- Raise an issue to discuss :speech_balloon: , ask for feedback or help :thought_balloon:
- Ensure the pull request is accompanied by new feature code and specs / tests ( similar to [submitting fixes](https://github.com/sayanee/angularjs-pdf/blob/master/CONTRIBUTING.md#for-fixes) )

##Make a Release (for maintainers only)

1. run `npm run release patch`, `npm run release minor` or `npm run release major` according semantic version
- done :tada:

> `npm run release` also update `gh-pages` then you don't need to update manually

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
