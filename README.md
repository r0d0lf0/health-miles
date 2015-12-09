
![WebdriverIO](http://www.christian-bromann.com/wdio.png)
===========
# Health Miles
### Getting Started
Make sure you have Node installed v4.2.0+ or greater.

	METHOD #1 - Best way for learning (options are '--on local' or '--on phantom')
	
	  npm install
	  ./start-selenium.sh
      gulp test --on local
      ./stop-selenium.sh
    
    METHOD #2 - Runs the npm way, using whichever option is pre-configured in run.sh
   
      npm install
      npm test
    
    METHOD #3 - Runs headless with '--on phantom' option
   
      ./run.sh
    
    Method 2 and 3 requires you to download the platform specific version of phantomjs and save it in the base directory
    
#### Important Points
 * There are two modes of running the first is running locally on chrome or locally headlessly with phantomjs; the second is running on a travis ci machine headlessly with phantomjs.
 * This project does not work out of the box for you locally because it was made specifically to be ran on travis ci.
 * To run locally make sure to download phantomjs first and put it in the base directory. 
 * To log into your health miles account your credentials should be stored in VIRGIN_HEALTH and VIRGIN_PASSWORD environment variables.
 * To get email notifications make sure your gmail credentials are stored in EMAIL and EMAIL_PASS environment variables.
 

#### Additional Information
 
 * 'npm install' will install node modules specified in the package.json
 * 'gulp test' builds the application and runs tests.
 * './start-selenium.sh' and './stop-selenium.sh' are needed to start and stop selenium before running.
 * 'gulp test --on local' is meant to be a short concise human readable way to invoke tests where:
 *  --on arguments can be one of the following [local, phantom] 
   
    
#### Overview

This project was created originally to test out webdriverio. It quickly grew into a full fledge Javascript based test framework. Please be advised that most of this is learning in progress. I have basically zero experience in most of the technologies here. Note you will need selenium standalone to run locally.


#### Technology and Fundamentals

How would one get started with **webdriverio** from scratch? <http://webdriver.io/guide/testrunner/gettingstarted.html>

 1. Installed webdriverio via npm <http://webdriver.io/guide/getstarted/install.html>
 2. Download the latest selenium standalone jar
 3. Download the latest chromedriver in order to run chrome
 4. Run 'wdio config' to create a webdriverio configuration file 
        On my local machine
        mocha
        .test/specs/**/*.js
        dot reporter
        silent verbosity
        ./errorShots/
        http://localhost
     This will created a corresponding wdio.conf.js file
  5. Create the directory .test/specs
  6. Create a test/test-file in .test/specs 
  7. The sample test file uses 'should' so we need to do a npm install should
  8. To run it start the standalone selenium driver then run 'wdio wdio.conf.js'
  9. BAM! You did it! You have the beginnings of webdriverio setup!         

How to start and stop a **standalone selenium server**?

  1. Run 'java -jar /your/download/directory/selenium-server-standalone-2.42.2.jar'
  2. Alternatively you run the script './start-selenium.sh'
  3. To stop the server you have several options depending on your needs:
  4. ctrl-c
  5. kill $(ps aux | grep 'selenium-server-standalone' | awk '{print $2}')
  6. wget http://localhost:4444/selenium-server/driver/?cmd=shutDownSeleniumServer

What browsers do the **standalone selenium server support**?

  1. The standalone server comes with some integrated drivers for Firefox, Opera and Safari.
  2. To use Chrome you will need the binary

What are the different type of **reporters**?

  1. http://webdriver.io/guide/testrunner/reporters.html
  2. Dot reporter reports pass fail with dots and F, yellow is slow, red is fail and green is pass.

What is **Mocha**?

  1. Mocha ia a test framework
      https://mochajs.org/
  2. It allows us to run and write tests in a variety of ways (TDD/BDD styles)

What is **Chai**?

  1. Chai is a assertion library.
      http://chaijs.com/
  2. It allows us to make assertions using should, expect and assert methods.

What is **Chai as promised**?

  1. Chai as promised is a extension of Chai which uses promises.
  2. Chai as Promised is only compatible with modern browsers (IE ≥9, Safari ≥6, no PhantomJS).

What is **Babel**?

  1. Babel is a Javascript compiler 
      https://babeljs.io/
  2. It allows us to use the latest and greatest Ecmascript standards

What are the key steps to get **Babel** working? 

  1. npm install babel-core --save-dev
  2. include the babel-core/register in the mocha options 
      // Options to be passed to Mocha.
      // See the full list at http://mochajs.org/
      mochaOpts: {
        ui: 'bdd',
        compilers: ['js:babel-core/register']
      },
  3. create a .babelrc file with the following content
      {
        "blacklist": ["regenerator"]
      }

What is **PhantomJS**?

  1. Simply put phantomjs is a browser that runs headless (has no UI).
  2. It runs faster and lets you run tests on systems without a UI such as a Redhat Linux build machine (Jenkins).
  3. It acts like a real browser only the screen isn't drawn out, but you can still take screenshots.
  4. Make sure you get the right binary depending on you platform, there is a known issue on OSX.

How to run **headless**?

  1. npm install phantomjs --save-dev
  2. download phantomjs binary, note that if you get the binary and run ./phantomjs --version and get KILLED: 9 then you need to get the fixed version
     https://github.com/eugene1g/phantomjs/releases (solution)
     https://github.com/ariya/phantomjs/issues/12928 (original-issue)
  3. start your standalone selenium server
  4. make sure your wdio.conf.phantom.js configuration file is properly configured
      capabilities: [{
         browserName: 'phantomjs'
      }
      
How to adjust **timeout** values?

  1. For selenium wait timeouts modify the 'waitforTimeout: 10500,' in wdio.conf.js 
  2. For test timeouts modify the 'mochaOpts: {
        ui: 'bdd',
        compilers: ['js:babel-core/register'],
        timeout: 15100
    },' in the wdio.conf.js
  3. All timeout values are in milliseconds.
  4. Set test timeouts to '0' when debugging if you don't want it to timeout.
  5. Use 'un-pretty' timeout numbers such as 18392 to help find timeout values when debugging. 
      
	 

---
#### History

10/6/15

  - Installed wdio got it working with mocha, need to use chai, need to use gulp, need to integrate with saucelabs/tep. 

10/7/15

  - Installed gulp and got jshint working with {esnext: true} option turned on to support ES6 features (see gulpfile). 
  - Installed chai assertion library it comes in three flavors, expect, should and assert, let's go with expect because should has compatibility issues. I really like how the 'should' assertion style looks, we might have to compromise.
  - Created a gulp task to transpile specs to ES6. 

10/8/15

  - Created the wdio.conf.js file that configures the babel/register as the compiler. 
  - Created a gulp task to run tests using the wdio.conf.js, worked around an issues which requires explicit path to wdio binary.
  - Created wdio.conf.browserstack.js file that is configured to work with Browserstack.

10/13/15

  - Integegrate with PhantomJS.
  - Updated gulp test to use arguments with yargs plugin.

10/16/15

  - Add --in to the gulp test task, so tests can be ran in a specified environment. For example 'gulp test --on local --in e2e' will run tests on localhost in e2e. One of the hurdles is passing the flag into gulp, then as an argument into the webdriverio, then finally propogating the flag into the test runner. The solution I came up with was to save it on the process.env and propogate it using the onPrepare and before hooks provided by webdriverio. This choice came from unsuccessfully exploring various ways to get the process.argv to propogate the flag.

12/6/15

  - Rewrite selenium-start.sh and selenium-stop.sh scripts and add run.sh. The selenium standalone server now runs in the background, this makes it easier to run everything with one command namely the run.sh which will start selenium run tests and then stop selenium. This use to be separate steps now they are combined for ease of use.

12/7/15

  - Setup TravisCI for continuous integration. A few tricks to get this started was to remove the local instance of phantomjs and replace it with the operating system appropriate version. Someone had emailed Travis CI support and found thir Ubuntu 12.04 machines kept phantomjs in /usr/local/phantomjs/bin/phantomjs. See integration URLS: <https://travis-ci.org/r0d0lf0/health-miles> and <https://github.com/r0d0lf0/health-miles>
  
12/8/15
  - Create mail.js to send an email notification with screenshots after a build is done.


[^1]: Credit to Peter M. for sharing his info on webdriverio helping me understand some of the details.
