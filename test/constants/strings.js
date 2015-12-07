class LocalizedStrings {

    constructor (properties) {
        this.properties = properties;
    }

    getStringsByLocale(locale) {
        var key = locale.toLowerCase().replace('-', '_');

        return (() => {
            let p = this.properties;
            for(var k in p) {
                if(p.hasOwnProperty(k) && k == key) {
                    return p[k];
                }
            }
            return p.en_us;
        })();
    }
}

var _strings = new LocalizedStrings({
    en_us : {
        HEADER : 'Sign in',
        USER_ID : 'Email or user ID',
        PASSWORD : 'Password',
        REMEMBER_ME : 'Remember me',
        SIGN_IN_BTN : 'Sign In',
        AR_LINK : 'I forgot my user ID or password'
    },
    fr_ca : {
        HEADER : 'Ouvrir une session',
        USER_ID : 'Adresse courriel ou Nom d’utilisateur',
        PASSWORD : 'Mot de passe',
        REMEMBER_ME : 'Se souvenir de moi',
        SIGN_IN_BTN : 'Ouvrir la session',
        AR_LINK : 'J’ai oublié mon nom d’utilisateur ou mon mot de passe'
    }
});



//turbotax : {
//    HEADER : 'Sign In',
//    USER_ID : 'User ID'
//}

module.exports = _strings;