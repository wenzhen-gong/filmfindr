const express = require('express');
const path = require('path');
// const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
var cors = require('cors');

const app = express();
const PORT = 3000;

const authController = require('./controllers/authController.js');
const cookieController = require('./controllers/cookieController.js');
// const sessionController = require('./controllers/sessionController.js');
const movieController = require('./controllers/movieController.js');
const apiController = require('./controllers/apiController.js')

// const MONGO_URI = 'mongodb+srv://jaycruz2905:codesmith@reinforcement.vyfuoyn.mongodb.net/?retryWrites=true&w=majority&appName=Reinforcement';

// mongoose.connect(MONGO_URI, {
//   dbName: 'Reinforcement',
// })
//   .then(() => console.log('------> Connected to Mongo DB.'))
//   .catch(err => console.log(err));


app.use(cookieParser());
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/statics')));
app.use('/', express.static(path.resolve(__dirname, '../dist')));


app.get('/',
  (req, res) => {
    return res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
  }
);

app.post('/signup', 
  authController.createUser,
  cookieController.setSSIDCookie,
  // sessionController.createSession,
  (req, res) => {
    return res.status(200).json(res.locals.userData);
  }
);

app.get('/signin/:email/:password', 
  authController.verifyUser,
  cookieController.setSSIDCookie,
  // sessionController.createSession,
  (req, res) => {
    return res.status(200).json(res.locals.userData);
  }
);

app.delete('/signout', 
// sessionController.deleteSession,
  cookieController.deleteCookie,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.post('/mymovies2',
  movieController.fetchMovies,
  (req, res) => {
    return res.status(200).json(res.locals.movies);
  }
);

app.post('/mymovies',
  movieController.saveMovie,
  (req, res) => {
    return res.status(200).json(res.locals.savedMovie);
  }
);

// app.put('/mymovies',
//   movieController.updateMovie,
//   (req, res) => {
//     return res.status(200).json(res.locals);
//   }
// );

app.delete('/deleteMovies/:MovieId/:UserId',
  movieController.deleteMovie,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.post('/recommendation', /*movieController.fetchMovies,*/ apiController.callGemini, apiController.callTMDB, (req, res) =>{
  const recsArr = res.locals.recsArr;
  
  return res.status(200).json(recsArr);
});


app.use((err, req, res, next) => {
    const defaultErr = {
      log: "Express error handler caught unknown middleware error",
      status: 500,
      message: { err: "An error occurred" },
    };
    const errorObj = Object.assign({}, defaultErr, err);
    console.log(errorObj.log);
    return res.status(errorObj.status).json(errorObj.message);
  });

  app.listen(PORT, () => {
    console.log(`...listening on port ${PORT}`);
  });