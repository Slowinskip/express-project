const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');
const multer = require('multer');


const app = express();

app.engine('.hbs', hbs());
app.set('view engine', '.hbs');

// app.use((req, res, next) => {
//     res.show = (name) => {
//       res.sendFile(path.join(__dirname, `/views/${name}`));
//     };
//     next();
//   });

app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
  });

  const upload = multer({ storage: storage });
app.use(express.static(path.join(__dirname, '/public')));

app.get('/style.css', (req, res) => {
    res.sendFile(path.join(__dirname, `/style.css`));
  });

app.post('/contact/send-message', upload.single('image'), (req, res) => {

  const { author, sender, title, message, file} = req.body;

  if(author && sender && title && message && req.file) {
  res.render('contact', { isSent: true, fileName: req.file.originalname});
  }
  else {
  res.render('contact', { isError: true });
  }

});

app.use('/user', (req, res) => {
    res.render('login');  
})
  
app.get(['/','/home'], (req, res) => {
    res.render('index');  

});
app.get('/hello/:name', (req, res) => {
    res.render('hello', {name: req.params.name });  
});

app.get('/about', (req, res) => {
    res.render('about', { layout: 'dark' });  
});

app.get('/contact', (req, res) => {
    res.render('contact');  
});

app.get('/info', (req, res) => {
    res.render('info');  
});

app.get('/history', (req, res) => {
    res.render('history');  
});

app.use((req, res) => {
    res.status(404).show('notFound.html');
})



app.listen(8000, () => {
console.log('Server is running on port: 8000');
});