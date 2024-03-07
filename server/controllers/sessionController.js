const Session = require('../models/sessionModel');

const sessionController = {};

sessionController.createSession = async (req, res, next) => {
    try {
        console.log('------> sessionController START');



        console.log('------> sessionController END');
    } catch (err) {
        return next({
            log: `sessionController.createSession - error creating session; ERROR: ${err}`,
            status: 400,
            message: { err: 'Error in sessionController.createSession; Check server logs' }
          });
    }
}

module.exports = sessionController;