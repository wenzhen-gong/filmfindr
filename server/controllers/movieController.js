const supabase = require('../db.js');

const movieController = {};

movieController.fetchMovies = async (req, res, next) => {
    try {
        console.log('------> movieControllers.fetchMovies START');
        // const { userId } = req.body;
        const userId = 78;

        if (!userId) throw new Error('ERROR: No userId from req.body to query DB with');

        let { data, error } = await supabase
            .from('Movies')
            .select()
            .eq('UserID', userId)

        if (error) {
            next({
                log: `movieController.fetchMovies - Supabase query/create error; ERROR: ${error}`,
                message: {
                    err: 'Error in movieController.fetchMovies; Check server logs'
                }
            })
        }

        console.log('Query Data: ', data);
        res.locals.movies = data;
        console.log('------> movieControllers.fetchMovies END');
        return next();
    } catch (err) {
        return next({
            log: `movieController.fetchMovies - querying database for movies error; ERROR: ${err}`,
            message: {
              err: 'Error in movieController.fetchMovies; Check server logs',
            },
        });
    }
}

movieController.saveMovie = async (req, res, next) => {
    try {
        console.log('------> movieController.saveMovie START');
        // const { userId, email, movieTitle } = req.body;
        const userId = 78;
        const email = 'email1';
        const movieTitle = 'FakeMovie 1231231231';

        if (!email || !movieTitle) throw new Error('ERROR: No email, movieTitle, or userId from req.body to query DB with');

        //check to see if user has already saved movie
        let { data, error } = await supabase
            .from('Users')
            .select()
            .eq('Email', email)

        const userData = data[0]
        const userMovies = userData.MyMovies;

        async function helperFuncSaveMovie(userId, movieTitle) {
            //write to Movies table to save movie
            data = await supabase
                .from('Movies')
                .insert([ { MovieTitle: movieTitle, UserID: userId } ])
                .select();
    
            console.log('returned saved movie', data.data[0]);
            res.locals.savedMovie = data.data[0]
        }

        //if userMovies is null (user has no movies saved), save movie
        if (userMovies === null || userMovies.length === 0) {
            // console.log('------>NULL MOVIES CONDITIONAL');
            //declare newMoviesArr to update column, since null is in place (can't push to null)
            let newMoviesArr = [];
            newMoviesArr.push(movieTitle);
            data = await supabase
                .from('Users')
                .update([ { MyMovies: newMoviesArr } ])
                .eq('Email', email)
                .select();

            console.log('New Data after update movies array (NULL conditional)', data.data[0]);
            await helperFuncSaveMovie(userId, movieTitle);
            console.log('------> movieController.saveMovie END');
            return next();
        }
        
        //parse userMovies and check for movie, if found/saved, return error/notify
        for (let i = 0; i < userMovies.length; i++) {
            if (userMovies[i] === movieTitle) {
                console.log('------> movieController.saveMovie END');
                return next({
                    log: `movieController.saveMovie - user already saved movie`,
                    message: {
                        err: 'Error in movieController.saveMovie; Check server logs'
                    }
                })
            }
        }

        //if movie isn't saved, save movie
        userMovies.push(movieTitle);
        data = await supabase
            .from('Users')
            .update([ { MyMovies: userMovies } ])
            .eq('Email', email)
            .select();

        // console.log(data.data[0]);
        console.log('New Data after update movies array', data.data[0]);

        helperFuncSaveMovie(userId, movieTitle);
        console.log('------> movieController.saveMovie END');
        return next();
    } catch (err) {
        return next({
            log: `movieController.saveMovie - writing to database for movies error; ERROR: ${err}`,
            message: {
              err: 'Error in movieController.saveMovie; Check server logs',
            },
        });
    }
}

module.exports = movieController;