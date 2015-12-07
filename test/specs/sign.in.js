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
        .pause(500) // page render time
        // complete Daily Cards
        .waitForVisible('#Card1 #card-checkitout')
        .click('#Card1 #card-checkitout')
        .waitForVisible('#card-gotit')
        .click('#card-gotit')
        .pause(1200) // animation time
        .waitForVisible('#Card2 #card-checkitout')
        .click('#Card2 #card-checkitout')
        .waitForEnabled('#card-gotit')
        .execute("$('div.buttons-container .btn-card:last').click()")
        .pause(400) // animation time
        .waitForVisible('#nav-home')
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
        // go to Healthy Habits
        .waitForVisible('#navbar-top > div > ul > li:nth-child(3) > div > div.header-nav-title.title-item.nv-scope.ng-scope')
        .click('#navbar-top > div > ul > li:nth-child(3) > div > div.header-nav-title.title-item.nv-scope.ng-scope')
        .waitForEnabled('#nav-healthyhabits')
        .execute("$('#nav-healthyhabits').click()")
        // click Habits
        .waitForVisible('#page-wrapper > div > div > div > div.row > div > div.my-trackers.ui-droppable > div.ng-pristine.ng-untouched.ng-valid.ui-sortable > div:nth-child(1) > div > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope')
        .execute("$('#page-wrapper > div > div > div > div.row > div > div.my-trackers.ui-droppable > div.ng-pristine.ng-untouched.ng-valid.ui-sortable > div:nth-child(1) > div > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope').click()")
        .execute("$('#page-wrapper > div > div > div > div.row > div > div.my-trackers.ui-droppable > div.ng-pristine.ng-untouched.ng-valid.ui-sortable > div:nth-child(2) > div > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope').click()")
        .execute("$('#page-wrapper > div > div > div > div.row > div > div.my-trackers.ui-droppable > div.ng-pristine.ng-untouched.ng-valid.ui-sortable > div:nth-child(3) > div > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope').click()")
        .pause(200) // javascript buffer time
        .execute("$('#page-wrapper > div > div > div > div.row > div > div.my-trackers.ui-droppable > div.ng-pristine.ng-untouched.ng-valid.ui-sortable > div:nth-child(4) > div > div > div.title.col-md-4 > div > form > div > div.row > div > div > button.btn-choice-yes.ng-scope').click()")
        .pause(200) // animation time
        .scroll(0, 250)
        .pause(200) // scroll time
        .saveScreenshot('./habits.png');
    });
});
