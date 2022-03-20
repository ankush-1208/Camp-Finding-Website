const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 500; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new Campground({
            author: '61a1c87e802ab71680639566',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            price: Math.floor(Math.random() * 60) + 1,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dxib1qogr/image/upload/v1638258699/YelpCamp/lx7qlfrvm26lypwjupal.png',
                    filename: 'YelpCamp/lx7qlfrvm26lypwjupal',
                }
            ],
            description:
                "Lorem, ipsum dolor sit amet consectetur adipisicing elit. At voluptates dolorum modi quaerat, aut ratione optio dolores enim blanditiis  ",
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
