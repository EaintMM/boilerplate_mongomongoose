require('dotenv').config();
let mongoose = require("mongoose");
// Connect to mongo db
//mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect(process.env.MONGO_URI);
// Person Schema
let personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

let Person;
// Creating person model
Person = mongoose.model('Person', personSchema);

const createAndSavePerson = (done) => {
  var person = new Person({
    name: "JiSun",
    age: 23,
    favoriteFoods: ["salad", "fruits"]
  }); 
  person.save().then(function(data){
    //console.log(data);
    done(null, data);
  }).catch(function (err){
    console.log(err);
    done(err);
  });
};

var arrayOfPeople = [
  {name: "Billy", age: "30", favoriteFoods: ["wine", "fruits"]},
  {name: "Justin", age: "28", favoriteFoods: ["pork", "ramyeon"]},
  {name: "Nelly", age: "28", favoriteFoods: ["gopchae", "crab"]},
];

const createManyPeople =  (arrayOfPeople, done) => {
  
  //Person.create(arrayOfPeople);
  //done(null, arrayOfPeople);
  Person.create(arrayOfPeople).then(
    function (people){
      done(null, people);
    }
  ).catch(
    function (err){
      console.log(err);
    }
  );
  
};
    
  

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}).then(
    function (personFound){
      done(null, personFound);
    }
  ).catch(
    function (err){
      return console.log(err);
    }
  );
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}).then(
    function (foundPerson){
      console.log(foundPerson);
      done(null, foundPerson);
    }
  ).catch(
    function (err){
      return console.log(err);
    }
  );
  
};

const findPersonById = (personId, done) => {
  Person.findById(personId).then(
    function (foundPerson){
      console.log(foundPerson);
      done(null, foundPerson);
    }
  ).catch(
    function (err){
      return console.log(err);
    }
  );
  
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId).then(
    function (foundPerson){
      console.log(foundPerson);
      foundPerson.favoriteFoods.push(foodToAdd);
      foundPerson.save().then(
        function (updatedPerson){
          done(null, updatedPerson);
        }
      ).catch(
        function (err){
          return console.log(err);
        }
      );
      
    }
  ).catch(
    function (err){
      return console.log(err);
    }
  );

  
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate( {name: personName}, {age: ageToSet}, {new: true}).then(
    function (updatedDoc){
      done(null, updatedDoc);
    }
  ).catch(
    function (err){
      return console.log(err);
    }
  );

  
};

const removeById = (personId, done) => {
  Person.findByIdAndDelete(personId).then(
    function (removedDoc){
      console.log("Delete here");
      console.log(removedDoc);
      done(null, removedDoc);
    }
  ).catch(
    function (err){
      return console.log(err);
    }
  );
  
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
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
