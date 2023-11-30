const Express = require("express");
const app = Express();
const cors = require("cors");
const morgan = require("morgan");
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const PORT = process.env.PORT || port;

// Express Routes Import
const AuthorizationRoutes = require("./authorization/routes");
const UserRoutes = require("./users/routes");
const MeetupRoutes = require("./meetups/routes");

// Sequelize model imports
const UserModel = require("./common/models/User");
const MeetupModel = require("./common/models/Meetup");

app.use(morgan("tiny"));
app.use(cors());

// Middleware that parses the body payloads as JSON to be consumed next set
// of middlewares and controllers.
app.use(Express.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./storage/data.db", // Path to the file that will store the SQLite DB.
  logging: true,
});

// Initialising the Model on sequelize
UserModel.initialise(sequelize);
MeetupModel.initialise(sequelize);

// Syncing the models that are defined on sequelize with the tables that already exist
// in the database. It creates models as tables that do not exist in the DB.
sequelize
  .sync()
  .then(() => {
    console.log("Sequelize Initialised!!");

    // Attaching the Authentication and User Routes to the app.
    app.use("/", AuthorizationRoutes);
    app.use("/user", UserRoutes);
    app.use("/meetup", MeetupRoutes);

    // Route to reset the database (drop tables and re-create)
    app.delete("/reset-db", async (req, res) => {
      try {
        await sequelize.drop();
        await sequelize.sync({ force: true });
        res.status(200).json({ message: "Database reset successful" });
      } catch (error) {
        console.error("Database reset error:", error);
        res.status(500).json({ message: "Database reset failed", error });
      }
    });

    app.listen(PORT, () => {
      console.log("Server Listening on PORT:", port);
    });
  })
  .catch((err) => {
    console.error("Sequelize Initialisation threw an error:", err);
  });
