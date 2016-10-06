let chai = require('chai');
let expect = chai.expect;
let env = require('../../conf/envs/prd');

// Make sure environment variables VIRGIN_EMAIL and VIRGIN_PASSWORD are set.
describe('sign in and complete virgin health tasks', function() {

    it('should login successfully and complete two daily cards', function*() {
      yield browser.url(env.signInUrl)
        // login
        .execute("$('#oPwdID').show();")
        .waitForVisible('#oUserID')
        .setValue('#oUserID', env.email)
        .waitForVisible('#oPwdID')
        .setValue('#oPwdID', env.password)
        .waitForVisible('#oLogon')
        .click('#oLogon')
        .pause(1000) // page render time
        // complete Daily Cards
        .waitForVisible('#triggerCloseCurtain')
        .execute("$('#triggerCloseCurtain').click()")
        .pause(1200) // animation time
        // click the second card
        .waitForVisible('#triggerCloseCurtain')
        .click('#triggerCloseCurtain')
        .pause(1200) // animation time
        .waitForVisible('#profile-dd > img')
        .saveScreenshot('./cards.png');
    });

    it('should login and complete healthy habits', function*() {
      yield browser.url(env.signInUrl)
        // login
        .execute("$('#oPwdID').show();")
        .waitForVisible('#oUserID')
        .setValue('#oUserID', env.email)
        .waitForVisible('#oPwdID')
        .setValue('#oPwdID', env.password)
        .waitForVisible('#oLogon')
        .click('#oLogon')
        .pause(1000) // page render time
        // go to Healthy Habits
        .waitForVisible('#core-menuitem-tracking')
        .click('#core-menuitem-tracking')
        // click Habits
        .waitForVisible('#page-wrapper > div > div > div > div.healthy-habits-body-wrapper > my-healthy-habits > div > div.my-trackers > div:nth-child(4) > div > div:nth-child(1) > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope')
        .execute("$('#page-wrapper > div > div > div > div.healthy-habits-body-wrapper > my-healthy-habits > div > div.my-trackers > div:nth-child(4) > div > div:nth-child(1) > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope').click()")
        .execute("$('#page-wrapper > div > div > div > div.healthy-habits-body-wrapper > my-healthy-habits > div > div.my-trackers > div:nth-child(4) > div > div:nth-child(2) > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope').click()")
        .execute("$('#page-wrapper > div > div > div > div.healthy-habits-body-wrapper > my-healthy-habits > div > div.my-trackers > div:nth-child(4) > div > div:nth-child(3) > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope').click()")
        .pause(500) // javascript buffer time
        .execute("$('#page-wrapper > div > div > div > div.healthy-habits-body-wrapper > my-healthy-habits > div > div.my-trackers > div:nth-child(4) > div > div:nth-child(4) > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope').click()")
        .pause(500) // animation time
        .scroll(0, 250)
        .pause(500) // scroll time
        .saveScreenshot('./habits.png');
    });
});
