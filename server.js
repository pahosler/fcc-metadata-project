'use strict';

var express = require('express');
var cors = require('cors');
const multer = require('multer')

// require and use "multer"...

var app = express();

app.use(cors());
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.post('/api/fileanalyse',upload.single('upfile'),(req,res)=>{
  res.json({
    'name' : req.file.originalname,
    'type' : req.file.mimetype,
    'size' : req.file.size
   })
})

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

// 404-NOT FOUND
 app.use(function(req, res, next){
   res.status(404);
   res.type('txt').send('Not found');
 })

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});
