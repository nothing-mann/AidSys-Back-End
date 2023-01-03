const mongoose = require("mongoose");
const { Assets } = require("./modules/Asset");
const { College } = require("./modules/College");
const { User } = require("./modules/User");

mongoose.set("strictQuery", true);

/*Connecting to database*/
mongoose
  .connect("mongodb://localhost/aidsys")
  .then(() => console.log("Successfully connect to mongodb"))
  .catch((err) => console.error("Connection err", err));

/*User Details*/
const userData = [
  {
    username: "susheelthapa",
    password: "susheelthapa",
    email: "077bct090.susheel@pcampus.edu.np",
    password: "+9770000000000",
  },
  {
    username: "neekamaharjan",
    password: "neekamaharjan",
    email: "077bct050.neeka@pcampus.edu.np",
    password: "+9770000000000",
  },
  {
    username: "ujjwaljha",
    password: "ujjwaljha",
    email: "077bct092.ujjwal@pcampus.edu.np",
    password: "+9770000000000",
  },
  {
    username: "rounakjha",
    password: "rounakjha",
    email: "077bct071.rounak@pcampus.edu.np",
    password: "+9770000000000",
  },
];

/*Assets Details*/
const assetData = [
  {
    name: "Football Ground",
    quantities: 1,
  },
  {
    name: "Cricket Ground",
    quantities: 1,
  },
  {
    name: "Volleyball Ground",
    quantities: 1,
  },
  {
    name: "Basketball Court",
    quantities: 1,
  },
  {
    name: "Library Hall",
    quantities: 1,
  },
  {
    name: "Table Tennis Board",
    quantities: 3,
  },
  {
    name: "Badminton Court",
    quantities: 2,
  },
];

/*College Details*/
const collegeData = [{ name: "Pulchowk Campus", address: "Lalitpur" }];

const populate = async () => {
  /*Remvoing all the college, assets and user detail if available*/
  await College.deleteMany({});
  await User.deleteMany({});
  await Assets.deleteMany({});

  /*Creating user, assets and college details*/
  const susheel = new User(userData[0]);
  const neeka = new User(userData[1]);
  const ujjwal = new User(userData[2]);
  const rounak = new User(userData[3]);

  const football = new Assets(assetData[0]);
  const cricket = new Assets(assetData[1]);
  const volleyball = new Assets(assetData[2]);
  const basketball = new Assets(assetData[3]);
  const libraryHall = new Assets(assetData[4]);
  const tabletennis = new Assets(assetData[5]);
  const badminton = new Assets(assetData[6]);

  const pulchowk = new College(collegeData[0]);

  /*Saving into the database*/
  susheel.save();
  neeka.save();
  ujjwal.save();
  rounak.save();

  football.save();
  cricket.save();
  volleyball.save();
  basketball.save();
  libraryHall.save();
  tabletennis.save();
  badminton.save();

  pulchowk.save();

  /*Creating relationship*/

  susheel.college = pulchowk._id;
  neeka.college = pulchowk._id;
  rounak.college = pulchowk._id;
  ujjwal.college = pulchowk._id;

  pulchowk.assets = [
    football._id,
    cricket._id,
    volleyball._id,
    basketball._id,
    libraryHall._id,
    tabletennis._id,
    badminton._id,
  ];

  susheel.bookedAssets = [
    { _id: football._id, bookedQuantities: 1 },
    { _id: basketball._id, bookedQuantities: 1 },
  ];
  football.bookedBy = [susheel._id];
  basketball.bookedBy = [susheel._id];

  neeka.bookedAssets = [
    { _id: badminton._id, bookedQuantities: 1 },
    { _id: tabletennis._id, bookedQuantities: 1 },
  ];
  football.bookedBy = [neeka._id];
  basketball.bookedBy = [neeka._id];

  ujjwal.bookedAssets = [
    { _id: cricket._id, bookedQuantities: 1 },
    { _id: volleyball._id, bookedQuantities: 1 },
  ];
  cricket.bookedBy = [ujjwal._id];
  volleyball.bookedBy = [ujjwal._id];

  rounak.bookedAssets = [
    { _id: libraryHall._id, bookedQuantities: 1 },
    { _id: tabletennis._id, bookedQuantities: 1 },
  ];
  libraryHall.bookedBy = [rounak._id];
  tabletennis.bookedBy = [rounak._id];

  console.log("Done");
};

populate();
