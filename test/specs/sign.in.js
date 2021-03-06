let chai = require('chai');
let expect = chai.expect;
let env = require('../../conf/envs/prd');

// Make sure environment variables VIRGIN_EMAIL and VIRGIN_PASSWORD are set.
describe('sign in and complete virgin health tasks', function() {

    it('should login successfully and complete two daily cards', function*() {
      yield browser.url(env.signInUrl)
        // login
        .pause(6000) // page render time
        .execute("$('#oPwdID').show();")
        .waitForVisible('#oUserID')
        .execute("$('#oUserID').val( '" + env.email + "');")
        .waitForVisible('#oPwdID')
        .execute("$('#oPwdID').val( '" + env.password + "');")
        .waitForVisible('#oLogon')
        .click('#oLogon')
        .pause(5000) // page render time
        // complete Daily Cards
        .waitForVisible('#triggerCloseCurtain')
        .execute("$('#triggerCloseCurtain').click()")
        .execute("$('#triggerCloseCurtain').attr('id','DONE')") // mark it as done
        .pause(1200) // animation time
        // click the second card
        .waitForVisible('#triggerCloseCurtain')
        .execute("$('#triggerCloseCurtain').click()")
        .pause(2000) // animation time
        .saveScreenshot('./cards.png');
    });

    it('should login and complete healthy habits', function*() {
      yield browser.url(env.signInUrl)
        // login
        .execute("$('#oPwdID').show();")
        .waitForVisible('#oUserID')
        .execute("$('#oUserID').val( '" + env.email + "');")
        .waitForVisible('#oPwdID')
        .execute("$('#oPwdID').val( '" + env.password + "');")
        .waitForVisible('#oLogon')
        .click('#oLogon')
        .pause(5000) // page render time
        // go to Healthy Habits
        .waitForVisible('#core-menuitem-tracking')
        .click('#core-menuitem-tracking')
        // click Habits
        .waitForVisible('#tracker_646 > div > div.title.col-md-4 > div > form > div > div.row > div > div > #track-yes')
        .execute("$('#tracker_646 > div > div.title.col-md-4 > div > form > div > div.row > div > div > #track-yes').click()")
        .execute("$('#tracker_689 > div > div.title.col-md-4 > div > form > div > div.row > div > div > #track-yes').click()")
        .execute("$('#tracker_635 > div > div.title.col-md-4 > div > form > div > div.row > div > div > #track-yes').click()")
        .execute("$('#tracker_44 > div > div.title.col-md-4 > div > form > div > div.row > div > div > #track-yes').click()") // temp: walk & talk challenge
        .pause(500) // javascript buffer time
        .execute("$('#tracker_58 > div > div.title.col-md-4 > div > form > div > div.row > div > div > #track-yes').click()")
        .scroll(0, 250)
        .pause(500) // scroll time
        .saveScreenshot('./habits.png');
    });
});
