const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.createSession = async (req, res, next) => {
    try {
        console.log('------> sessionController START');
        const { ssid } = req.cookies;
        if(!ssid) throw new Error('No ssid cookie found');

        //check if session already exists
        const foundDoc = await Session.findOne( { cookieId: req.cookies.ssid } );
        if (foundDoc) {
            console.log('--------> Found existing session');
            res.locals.userStatus = { signedIn: true };
            
            return next({
                log: `sessionController.createSession - error creating session; ERROR: Session already found`,
                status: 400,
                message: { err: 'Error in sessionController.createSession; Check server logs' }
            });
        }
        
        //if no session found, create
        Session.create({ cookieId: ssid })
            .then(() => {
                console.log('------> Session created');
                res.locals.userStatus = { signedIn: true };
                console.log('SESSION controller - res.locals', res.locals);
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
            log: `sessionController.isSignedIn - error finding session; ERROR: ${err}`,
            status: 400,
            message: { err: 'sessionController.isSignedIn: Check server logs' }
        });
    }
}

sessionController.deleteSession = async (req, res, next) => {
    try {
        console.log('------> sessionController.deleteSession START');
        const { ssid } = req.cookies;
        console.log('SSID cookie: ', ssid);
        if (!ssid) {
            return next({
                log: `sessionController.deleteSession - error deleting session; ERROR: No SSID cookie found. User has not signed up or signed in to set cookie`,
                status: 400,
                message: { err: 'Error in sessionController.deleteSession; Check server logs' }
            });
        }

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