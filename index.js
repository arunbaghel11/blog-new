// Importing necessary modules
const express = require('express'); // Importing Express.js framework
const mongoose = require('mongoose'); // Importing Mongoose library for MongoDB integration
const Article = require('./models/article'); // Importing Article model
const articleRouter = require('./routes/articles'); // Importing article router
const methodOverride = require('method-override'); // Importing method-override middleware for HTTP method overriding
const cors=require('cors');

// Creating Express application instance
const app = express();

// Defining the port number for the server
const PORT = process.env.PORT || 5000; // Defaulting to port 5000 if no port is provided in environment variables

// Connecting to MongoDB database
// Connecting to MongoDB database
mongoose.connect('mongodb+srv://arunbaghe192004:QqTM1ogh0x4j6sNR@cluster0.tmyydom.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
app.use(cors({
    origin:["https://deploy-mern-1whq.vercel.app"]
        method:["POST" ,"GET"],
    credentials:true
}
  ));           


// Setting view engine to EJS (Embedded JavaScript)
app.set('view engine', 'ejs');

// Parsing incoming request bodies
app.use(express.urlencoded({ extended: false }));

// Using method-override middleware for HTTP method overriding
app.use(methodOverride('_method'));

// Handling GET request to the root URL ('/')
app.get('/', async (req, res) => {
  // Retrieving articles from the database sorted by creation date in descending order
  const articles = await Article.find().sort({ createdAt: 'desc' });

  // Rendering the 'index' view with the retrieved articles data
  res.render('articles/index', { articles: articles });
});

// Using the article router for handling requests starting with '/articles'
app.use('/articles', articleRouter);


// Starting the server and listening on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
