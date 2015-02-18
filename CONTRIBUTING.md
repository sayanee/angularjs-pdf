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
- Run `grunt check` to ensure the [build](https://travis-ci.org/sayanee/angularjs-pdf) will pass
- Write a [good commit message](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
- [Pull request](https://help.github.com/articles/using-pull-requests) using the new feature/patch branch
- Ensure the [Travis build](https://travis-ci.org/webuildsg/webuild) passes

##to create a release (for maintainers only)

1. commit your code (steps 1 - 7)
- run `grunt bump` according semantic version
- copy the `example` folder
- change to branch `gh-pages`
- copy the `example` folder from `master` branch
- commit code in `gh-pages` and `git push origin gh-pages` to publish the [examples page](http://sayan.ee/angularjs-pdf/)