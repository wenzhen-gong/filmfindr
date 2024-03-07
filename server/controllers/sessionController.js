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

    } catch (err) {
        return next({
            log: 'Error occured in sessionController.isSignedIn',
            status: 400,
            message: { err: 'sessionController.isSignedIn: Something went wrong!' }
        });
    }
}

module.exports = sessionController;