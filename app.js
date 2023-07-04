if (process.env.NODE_ENV !== "production") {
    require('dotenv').config()
}

console.log(process.env.solo)

const express = require('express');
const { default: mongoose } = require('mongoose');

const flash = require('connect-flash');
const session = require('express-session');

const ejsMate = require('ejs-mate');
const path = require('path');
const app = express();

const passport = require('passport');
const LocalStrategy = require('passport-local');

const { campgroundSchema, reviewSchema } = require('./schemas');

const catchAsync = require('./utils/catchAsync');
const ExpressError = require('./utils/ExpressError');


const Campground = require('./models/campground');
const Review = require('./models/review.js');
const User = require('./models/user');

const methodOverride = require('method-override');

const campgroundRoutes = require('./routes/campgrounds');
const reviewRoutes = require('./routes/reviews.js');
const userRoutes = require('./routes/users');

mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp');
const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log('Database connected')
});

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const sessionConfig = {
    secret: 'Thisisourfirstsecret',
    resave: false,
    saveUninitialized: true,
    cookies: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    console.log(req.session)
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/fakeUser', async(req, res) => {
    const user = new User({ email: 'elishab@gmail.com', username: 'Elish' });
    const newUser = await User.register(user, 'lamp');
    res.send(newUser);
});

// This are functions that made us to  use routes...we access our #review and #campground routes through them
app.use('/campgrounds', campgroundRoutes);
app.use('/campgrounds/:id/reviews', reviewRoutes);
app.use('/', userRoutes);


app.get('/', (req, res) => {
    res.render('home')
});




// The next two are our error teller routes(functions)
app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404));
});

app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'oh no, something went wrong';
    res.status(statusCode).render('error', { err });
})


app.listen(3000, () => {
    console.log('listening on port 3000');
});