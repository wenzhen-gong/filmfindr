const supabase = require('../db.js');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const authController = {};

authController.createUser = async (req, res, next) => {
    try {
        console.log('------> authController.createUser START');
        // const { username, password } = req.body;
        const username = 'user';
        const password = '123';


        if (!username || !password) {
            next({
                log: `authController.createUser - missing input fields;`,
                message: {
                    err: 'Error in authController.createUser; Check server logs'
                }
            })
        }

        //query DB to check if user already exists
        const { data, err } = await supabase
            .from('Users')
            .select()
            .eq('UserName', username)

        if (err) {
            next({
                log: `authController.createUser - Supabase query/create error; ERROR: ${err}`,
                message: {
                    err: 'Error in authController.createUser; Check server logs'
                }
            })
        }

        //if data array is empty (no entries found/user doesn't exist)
        if (data.length === 0) {
            //bcrypt pass, then create user
            bcrypt.hash(password, SALT_WORK_FACTOR, async (err, hash) => {
                if (err) {
                    return next({
                        log: `authController.createUser - bcrypt error; ERROR: ${err}`,
                        message: {
                            err: 'Error in authController.createUser; Check server logs'
                        }
                    })
                }
                //create user
                await supabase
                    .from('Users')
                    .insert([ { UserName: username, Password: hash } ])
                console.log('------> User successfully created... Maybe');
            });
        } else {
            console.log('------> User already exists in database:', data);
            next({
                log: `authController.createUser - User already exists;`,
                message: {
                    err: 'Error in authController.createUser; Check server logs'
                }
            })
        }

        console.log('------> authController.createUser END')
        return next();
    } catch (err) {
        return next({
            log: `authController.createUser - querying database for users error; ERROR: ${err}`,
            message: {
              err: 'Error in authController.createUser; Check server logs',
            },
        });
    }
}

authController.verifyUser = async (req, res, next) => {
    try {
        console.log('------> authController.verifyUser START');
        // const { username, password } = req.body;
        const username = 'user';
        const password = '123';

        if (!username || !password) {
            next({
                log: `authController.verifyUser - missing input fields;`,
                message: {
                    err: 'Error in authController.verifyUser; Check server logs'
                }
            })
        }

        //query DB to check if user exists
        const { data, err } = await supabase
            .from('Users')
            .select()
            .eq('UserName', username)

        if (err) {
            next({
                log: `authController.verifyUser - Supabase query error; ERROR: ${err}`,
                message: {
                    err: 'Error in authController.verifyUser; Check server logs'
                }
            })
        }

        //if user is found, bcrypt compare and verify
        if (data.length > 0) {
            const passwordMatch = await bcrypt.compare(password, data[0].Password);
            if (!passwordMatch) {
                res.status(401).send('Sign in failed; Incorrect username or password');
                next({
                    log: `authController.verifyUser - Sign in failed; Incorrect username or password`,
                    message: {
                        err: 'Error in authController.verifyUser; Check server logs'
                    }
                })
            } else {
                console.log('------> authController.verifyUser - user VERIFIED');
                console.log('------> authController.verifyUser END');
                return next();
            }
        }

        console.log('------> authController.verifyUser - user NOT VERIFIED');
        console.log('------> authController.verifyUser END');
        next({
            log: `authController.verifyUser - Sign in failed; Incorrect username or password`,
            message: {
                err: 'Error in authController.verifyUser; Check server logs'
            }
        })
    } catch (err) {
        return next({
            log: `authController.verifyUser - querying database for users error; ERROR: ${err}`,
            message: {
              err: 'Error in authController.verifyUser; Check server logs',
            },
        });
    }
}

module.exports = authController;