require("dotenv").config();

const mongoose = require("mongoose");
const validator = require("validator");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((m) => {
    console.log("Connected to DB");
    return m.connection.getClient();
  });

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
  createdAt: { type: Date, default: Date.now },
});

let Person = mongoose.model("Person", personSchema);

const createAndSavePerson = (done) => {
  Person.create(
    {
      name: "John",
      age: 30,
      favoriteFoods: ["Pizza"],
    },
    (err, data) => {
      if (err) return console.log(err);
      done(null, data);
      return data;
    }
  );
};

let arrayOfPeople = [
  {
    name: "John",
    age: 30,
    favoriteFoods: ["Pizza"],
  },
  {
    name: "Carlos",
    age: 16,
    favoriteFoods: ["Chicken Nuggets", "Tacos", "Mac n Cheese"],
  },
  {
    name: "Abby",
    age: 17,
    favoriteFoods: ["Chicken Nuggets", "Steak", "Mac n Cheese"],
  },
  {
    name: "Vale",
    age: 16,
    favoriteFoods: ["Tacos", "Strawberries"],
  },
];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
    return data;
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
    console.log(data);
    return data;
   })
};

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => { 
    if (err) return done(err)
    done(null, data)
    console.log(data)
    return data
  })
};

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => { 
    if (err) return done(err)
    done(null, data)
    console.log(data)
    return data
  })
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => { 
    if (err) return done(err)

    person.favoriteFoods.push(foodToAdd)
    person.save((err, data) => {
      if (err) return done(err)
      done(null, data)
      console.log(data)
      return data
     })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true })
  .then(data => {
    console.log(data)
    done(null, data)
    return data
  })
    .catch(err => done(err))

};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId)
    .then(res => {
      console.log(res)
      done(null, res)
      return res
     })
    .catch(err => done(err))
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove })
    .then(res => { 
      done(null, res)
      console.log(res)
      return res
    })
    .catch(err => done(err))
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
