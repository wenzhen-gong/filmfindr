const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const authController = require('./controllers/authController.js');
const cookieController = require('./controllers/cookieController.js');
const sessionController = require('./controllers/sessionController.js');

const MONGO_URI = 'mongodb+srv://jaycruz2905:codesmith@reinforcement.vyfuoyn.mongodb.net/?retryWrites=true&w=majority&appName=Reinforcement';

mongoose.connect(MONGO_URI, {
  dbName: 'Reinforcement',
})
  .then(() => console.log('------> Connected to Mongo DB.'))
  .catch(err => console.log(err));


app.use(cookieParser());
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../dist')));


app.get('/',
(req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
}
);

app.post('/signup', 
  authController.createUser,
  cookieController.setSSIDCookie,
  sessionController.createSession,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.post('/signin', 
  authController.verifyUser,
  cookieController.setSSIDCookie,
  sessionController.createSession,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.delete('/signout', 
sessionController.deleteSession,
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);


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