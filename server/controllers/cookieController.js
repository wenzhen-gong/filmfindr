const supabase = require('../db.js');

const cookieController = {};

cookieController.setSSIDCookie = async (req, res, next) => {
    try {
        console.log('------> cookieController.setSSIDCookie START');
        // const { email, password } = req.body;
        const email = 'email1';
        const password = '123';
        if (!email || !password ) throw new Error('ERROR: No email or password input');

        //check if user exists in DB and to get unique UserID/UserName
        let { data, error } = await supabase
            .from('Users')
            .select()
            .eq('Email', email)

        if (error) {
            next({
                log: `cookieController.setSSIDCookie - Supabase query/create error; ERROR: ${error}`,
                message: {
                    err: 'Error in cookieController.setSSIDCookie; Check server logs'
                }
            })
        }

        const userID = data[0].UserID;
        const userN = data[0].UserName;
        await res.cookie('ssid', userID, {httpOnly: true});
        await res.cookie('u', userN, {httpOnly: true});
        req.cookies.ssid = userID;
        console.log('------> SSID cookie set! Cookie:', userID);
        console.log('------> U cookie set! Cookie:', userN);
        // console.log('------> res.cookie', res.cookies);
        console.log('------> cookieController.setSSIDCookie END');
        return next();
    } catch (err) {
        return next({
            log: `cookieController.setSSIDCookie - error setting cookie; ERROR: ${err}`,
            status: 400,
            message: { err: 'Error in cookieController.setSSIDCookie. Check server logs' }
          });
    }
}

module.exports = cookieController;