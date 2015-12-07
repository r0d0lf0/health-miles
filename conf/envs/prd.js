var baseUrl = 'https://member.virginpulse.com';

var env = {
    baseUrl : baseUrl,
    signInUrl : baseUrl + '/login.aspx',
    healthyHabitsUrl : baseUrl + '/#/healthyhabits',
    // get credentials from environment variables
    email: process.env.VIRGIN_EMAIL,
    password: process.env.VIRGIN_PASSWORD
};

module.exports = env;
