const express = require('express');
const path = require('path');
var cors = require('cors');

const app = express();
const PORT = 3000;

const apiController = require('./controllers/apiController')

app.use(cors())
app.use(express.json());

app.use('/', express.static(path.resolve(__dirname, '../dist')));


app.get('/',
(req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../../dist/index.html'));
}
);

app.post('/signup', 
  //insert middleware here
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.post('/signin', 
  //insert middleware here
  (req, res) => {
    return res.status(200).json(res.locals);
  }
);

app.post('/recommendation', apiController.callGemini, apiController.callTMDB, (req, res) =>{
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