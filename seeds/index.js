const mongoose = require("mongoose");
const Campground = require('../models/campground');
const cities = require("./cities")
const { places, descriptors } = require("./seedHelpers")


mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}
)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => {
    console.log("Database connected")
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 230; i++) {
        const random1000 = Math.floor(Math.random() * 1000)
        const price =  Math.floor(Math.random()*20)+10
        const camp = new Campground({
            author:"600eb28a00511a24c4fd4ac1",
            location: `${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images:[
                {
                  
                  url: 'https://res.cloudinary.com/dzjshwzf3/image/upload/v1611944718/YelpCamp/ufnv6olelhtfeumhmjnz.jpg',
                  filename: 'YelpCamp/iyrv2zwoll9yetsojwr7'
                },
                {
                  
                  url: 'https://res.cloudinary.com/dzjshwzf3/image/upload/v1611744659/YelpCamp/uujfk5gnpkrcelhyzrx7.jpg',
                  filename: 'YelpCamp/uujfk5gnpkrcelhyzrx7'
                }
              ],
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit veniam voluptas quod est voluptatem debitis neque odit. Inventore esse adipisci sed corporis dignissimos, nihil quam facilis tempore libero rerum laboriosam!",
            price : `${price}`,
            geometry: { 
                type: 'Point', 
                coordinates: [ cities[random1000].longitude,
                            cities[random1000].latitude, ] 
            }
        })
        await camp.save();
    }

}

seedDB().then(() => {
    mongoose.connection.close();
})
