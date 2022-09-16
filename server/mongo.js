const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password>"
  );
  process.exit(1);
}

const password = process.argv[2];

const url = `mongodb://callmemg:<password>@ac-tv3cm0w-shard-00-00.achzpyv.mongodb.net:27017,ac-tv3cm0w-shard-00-01.achzpyv.mongodb.net:27017,ac-tv3cm0w-shard-00-02.achzpyv.mongodb.net:27017/?ssl=true&replicaSet=atlas-4d25xk-shard-0&authSource=admin&retryWrites=true&w=majority`;

const noteSchema = new mongoose.Schema({
  content: String,
  date: Date,
  important: Boolean,
});

const Note = mongoose.model("Note", noteSchema);

mongoose
  .connect(url)
  .then((result) => {
    console.log("connected");

    const note = new Note({
      content: "HTML is Easy",
      date: new Date(),
      important: true,
    });

    return note.save();
  })
  .then(() => {
    console.log("note saved!");
    return mongoose.connection.close();
  })
  .catch((err) => console.log(err));
