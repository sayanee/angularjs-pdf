#Contribute and share

1. Fork this project and install the packages

	```
	bower install
	npm install
	```
- Create a new feature/patch branch
- Code code code and amend the `example` folder especially the file `example/js/directives/angular-pdf.js`
- Run `grunt` to create the build files in folder `dist`
- Code code code
- Run `npm test` to ensure the [build](https://travis-ci.org/sayanee/angularjs-pdf) will pass
- Write a [good commit message](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#commit-message-format)
- [Pull request](https://help.github.com/articles/using-pull-requests) using the new feature/patch branch
- Ensure the [Travis build](https://travis-ci.org/sayanee/angularjs-pdf) passes

##Make a Release (for maintainers only)

1. commit your code (steps 1 - 7)
- check for outdated dependencies with `npm outdated` and `bower list`
  1. amend version number of packages in `package.json` and `bower.json`
  - install various packages `npm i` and `bower i`
  - run `grunt` to build all files
  - commit your code
- update `readme.md` if required, especially the section on [Features](https://github.com/sayanee/angularjs-pdf#features)
- run `grunt bump`, `grunt bump:minor` or `grunt bump:major` according semantic version
- copy the `example` folder
- change to branch `gh-pages`
- copy the `example` folder from `master` branch
- commit code in `gh-pages` and `git push origin gh-pages` to publish the [examples page](http://sayan.ee/angularjs-pdf/)

##Angular-PDF is an OPEN Open Source Project

> Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. This project is more like an open wiki than a standard guarded open source project.

### Rules

There are a few basic ground-rules for contributors:

1. **No `--force` pushes** or modifying the Git history in any way.
- **External API changes and significant modifications** should be subject to a **pull request** to solicit feedback from other contributors.
- Pull requests to solicit feedback are *encouraged* for any other non-trivial contribution but left to the discretion of the contributor.
- Use a non-`master` branch for ongoing work.
- Contributors should attempt to adhere to the prevailing code style.
- Run `npm test` locally before submitting your PR to catch easy-to-miss style & testing issues
