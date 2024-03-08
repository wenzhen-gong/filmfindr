const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.createSession = async (req, res, next) => {
    try {
        console.log('------> sessionController START');
        const { ssid } = req.cookies;
        if(!ssid) throw new Error('No ssid cookie found');
        
        Session.create({ cookieId: ssid })
            .then(() => {
                console.log('------> Session created');
                console.log('------> sessionController END');
                return next();
            });
    } catch (err) {
        return next({
            log: `sessionController.createSession - error creating session; ERROR: ${err}`,
            status: 400,
            message: { err: 'Error in sessionController.createSession; Check server logs' }
        });
    }
}

sessionController.isSignedIn = async (req, res, next) => {
    try {
        console.log('-------> sessionController.isSignedIn:');
        const { ssid } = req.cookies;
        console.log('SSID cookie: ', ssid);

        const foundDoc = await Session.findOne( { cookieId: req.cookies.ssid } );
        if (!foundDoc) {
            console.log('--------> Must sign up or sign in! sessionController.isLoggedIn: No session doc found');
            res.locals.userStatus = { signedIn: false };
            console.log('res.locals: ', res.locals);
            return next();
        }

        console.log('------> sessionController.isSignedIn: session found; User is signed in');
        return next();
    } catch (err) {
        return next({
            log: 'Error occured in sessionController.isSignedIn',
            status: 400,
            message: { err: 'sessionController.isSignedIn: Check server logs' }
        });
    }
}

sessionController.deleteSession = async (req, res, next) => {
    try {
        const { ssid } = req.cookies;
        console.log('------> sessionController.deleteSession START');
        console.log('SSID cookie: ', ssid);
        
        res.clearCookie('ssid');
        res.clearCookie('u');

        Session.deleteOne({ cookieId: ssid })
        .then(() => {
            res.locals.userStatus = { signedIn: false };
            console.log('------> sessionController.deleteSession END');
            return next();
        })
        .catch((err) => {throw new Error(err);});
    }
    catch (err) {
        return next({
            log: `sessionController.deleteSession - error deleting session; ERROR: ${err}`,
            status: 400,
            message: { err: 'Error in sessionController.deleteSession; Check server logs' }
        });
    }
  };

module.exports = sessionController;