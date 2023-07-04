const { default: mongoose } = require('mongoose');
const campground = require('../models/campground');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');

const Campground = require('../models/campground');

mongoose.connect('mongodb://0.0.0.0:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
    console.log('Database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async() => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '63d1fe4aeaddcc851dec3f83',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)} `,
            image: "http://source.unsplash.com/collection/484351",
            descripition: '    Lorem ipsum dolor sit amet consectetur adipisicing elit. Cumque earum omnis aliquam expedita quas laudantium sapiente delectus sequi? Fuga suscipit sequi exercitationem accusamus, corrupti corporis ullam nisi! Ut, libero accusamus.',
            price
        })
        await camp.save()
    }
}
seedDB().then(() => {
    mongoose.connection.close()
})