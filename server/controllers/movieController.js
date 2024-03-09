const supabase = require('../db.js');

const movieController = {};

movieController.fetchMovies = async (req, res, next) => {
    try {
        console.log('------> movieControllers.fetchMovies START');
        // const { UserID } = req.params;
        // const UserID = 86;
        const {UserID} = req.body;

        if (!UserID) throw new Error('ERROR: No UserID from req.body to query DB with');

        let { data, error } = await supabase
            .from('Movies')
            .select()
            .eq('UserID', UserID)

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
        const { UserID } = req.body;
        console.log(req.body);
        const newMovie = { MovieTitle: req.body.title, Picture: req.body.picture, Overview: req.body.overview, Year: req.body.year, UserID: UserID }

      
        // const UserID = 86;
        // const movie = {
        //     MovieTitle: 'FakeMovie3',
        //     Stars: 2,
        //     Review: 'This movie was trash!'
        // }

        if (!UserID) throw new Error('ERROR: No UserID from req.body to query DB with');

        // //check to see if user has already saved movie
        // let { data, error } = await supabase
        //     .from('Users')
        //     .select()
        //     .eq('Email', email)

        //check to see if movie has been saved by this specific user
        // let { data, error } = await supabase
        //     .from('Movies')
        //     .select()
        //     .match({ MovieTitle: movie.MovieTitle, UserID: UserID, })

        // if (error) {
        //     next({
        //         log: `movieController.saveMovie - Supabase query/create error; ERROR: ${error}`,
        //         message: {
        //             err: 'Error in movieController.saveMovie; Check server logs'
        //         }
        //     })
        // }

        // const userData = data[0]
        // const userMovies = userData.MyMovies;

        // async function helperFuncSaveMovie(UserID, movie) {
        //     const newMovie = { MovieTitle: movie.MovieTitle, Stars: movie.Stars, Review: movie.Review, UserID: UserID }
        
        //     //write to Movies table to save movie
        //     let data = await supabase
        //         .from('Movies')
        //         .insert([ newMovie ])
        //         .select();
    
        //     console.log('returned saved movie', data.data[0]);
        //     res.locals.savedMovie = data.data[0]
        //     console.log('New Data after update movies array', data.data[0]);
        // }

        // //if userMovies is null (user has no movies saved), save movie
        // if (userMovies === null || userMovies.length === 0) {
        //     // console.log('------>NULL MOVIES CONDITIONAL');
        //     //declare newMoviesArr to update column, since null is in place (can't push to null)
        //     let newMoviesArr = [];
        //     newMoviesArr.push(movieTitle);
        //     data = await supabase
        //         .from('Users')
        //         .update([ { MyMovies: newMoviesArr } ])
        //         .eq('Email', email)
        //         .select();

        //     console.log('New Data after update movies array (NULL conditional)', data.data[0]);
        //     await helperFuncSaveMovie(userId, movieTitle);
        //     console.log('------> movieController.saveMovie END');
        //     return next();
        // }
        
        // //parse userMovies and check for movie, if found/saved, return error/notify
        // for (let i = 0; i < userMovies.length; i++) {
        //     if (userMovies[i] === movieTitle) {
        //         console.log('------> movieController.saveMovie END');
        //         return next({
        //             log: `movieController.saveMovie - user already saved movie`,
        //             message: {
        //                 err: 'Error in movieController.saveMovie; Check server logs'
        //             }
        //         })
        //     }
        // }

        // //if movie isn't saved, save movie
        // userMovies.push(movieTitle);
        // data = await supabase
        //     .from('Users')
        //     .update([ { MyMovies: userMovies } ])
        //     .eq('Email', email)
        //     .select();

        // console.log(data.data[0]);
        // console.log('New Data after update movies array', data.data[0]);


        // helperFuncSaveMovie(UserID, movie);


        //write to Movies table to save movie
        let data = await supabase
            .from('Movies')
            .insert([ newMovie ])
            .select();

        console.log('returned saved movie', data.data[0]);
        res.locals.savedMovie = data.data[0]
        console.log('New Data after update movies array', data.data[0]);
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

movieController.updateMovie = async (req, res, next) => {
    try {
        console.log('------> movieController.updateMovie START');
        // const { userId, movieTitle, stars, review } = req.body;
        const userId = 78;
        const movieTitle = 'FakeMovie 2';
        const stars = 3;
        const review = 'This was trash';

        if (!userId || !movieTitle) throw new Error('ERROR: movieTitle, or userId from req.body to query DB with');

        let {data, error} = await supabase
            .from('Movies')
            .update({ Stars: stars, Review: review})
            .match({ MovieTitle: movieTitle, UserID: userId, })
            .select();

        if (error) {
            next({
                log: `movieController.updateMovie - Supabase query/create error; ERROR: ${error}`,
                message: {
                    err: 'Error in movieController.updateMovie; Check server logs'
                }
            })
        }

        console.log('updated movie data with review/rating: ',data[0]);
        res.locals.updatedMovie = data[0];
        console.log('------> movieController.updateMovie END');
        return next();
    } catch (err) {
        return next({
            log: `movieController.updateMovie - writing to database for movies error; ERROR: ${err}`,
            message: {
              err: 'Error in movieController.updateMovie; Check server logs',
            },
        });
    }
}

movieController.deleteMovie = async (req, res, next) => {
    try {
        console.log('------> movieController.deleteMovie START');
        const {movieId, UserID} = req.params;
        // const movieId = 35;
        console.log('------> req.query: ',req.query);

        if (!movieId) throw new Error('ERROR: movieId from req.params to query DB with');

        // //check to see if user has already saved movie

        // let { data, error } = await supabase
        //     .from('Users')
        //     .select()
        //     .eq('Email', email)

        // if (error) {
        //     next({
        //         log: `movieController.deleteMovie - Supabase query/create error; ERROR: ${error}`,
        //         message: {
        //             err: 'Error in movieController.deleteMovie; Check server logs'
        //         }
        //     })
        // }

        // const userData = data[0]
        // const userMovies = userData.MyMovies;

        // async function helperFuncDeleteMovie(userId, movieTitle) {
        //     //write to Movies table to save movie
        //     await supabase
        //         .from('Movies')
        //         .delete()
        //         .match({ MovieTitle: movieTitle, UserID: userId });
        // }

        // //if userMovies is null (user has no movies saved)
        // if (userMovies === null || userMovies.length === 0) {
        //     console.log('User has not saved movie to delete');
        //     console.log('------> movieController.deleteMovie END');
        //     return next();
        // }
        
        // const newMoviesArr = [];
        // //parse userMovies and check for movie, if found/saved, return error/notify
        // for (let i = 0; i < userMovies.length; i++) {
        //     if (userMovies[i] === movieTitle) {
        //         continue;
        //     }
        //     newMoviesArr.push(userMovies[i]);
        // }

        // data = await supabase
        //     .from('Users')
        //     .update([ { MyMovies: newMoviesArr } ])
        //     .eq('Email', email)
        //     .select();

        // // console.log(data.data[0]);
        // console.log('New Data after delete movies array', data.data[0]);

        // helperFuncDeleteMovie(userId, movieTitle);
        
        //delete movie from DB
        await supabase
            .from('Movies')
            .delete()
            .match({ movieId: movieId, UserID: UserID });

        console.log('------> movieController.deleteMovie END');
        return next();
    } catch (err) {
        return next({
            log: `movieController.deleteMovie - writing to database for movies error; ERROR: ${err}`,
            message: {
              err: 'Error in movieController.deleteMovie; Check server logs',
            },
        });
    }
}

module.exports = movieController;