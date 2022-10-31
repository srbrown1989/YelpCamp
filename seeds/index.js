const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors, images } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "634e53252ae9115aeaf446f3",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris finibus nec erat id sollicitudin. Sed feugiat ex sit amet sapien euismod, ac convallis nunc pulvinar. Mauris vitae volutpat augue. Mauris tempus tincidunt magna, vitae viverra turpis lacinia eu. Aenean luctus, ex a posuere dignissim, ex sapien ornare mauris, non commodo arcu purus quis sem. Nam dapibus nisi venenatis diam blandit elementum. Vivamus eget dolor sodales, convallis nisl nec, egestas ex. Donec aliquet quam finibus justo convallis euismod. Vivamus in consectetur.",
      price,
      geometry: {
          type:"Point",
          coordinates: [-113.1331, 47.0202]},
      images: [
        {
          url: "https://res.cloudinary.com/dty73z3dd/image/upload/v1666966965/YelpCamp/qs1evydnnprugwxpimeo.jpg",
          filename: "YelpCamp/qs1evydnnprugwxpimeo",
        },
        {
          url: "https://res.cloudinary.com/dty73z3dd/image/upload/v1666966973/YelpCamp/t6kq3h7xsp0zhkrqqg5t.jpg",
          filename: "YelpCamp/t6kq3h7xsp0zhkrqqg5t",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
