require("dotenv").config();
const app = require("./app");
const dbConnection = require("./utils/dbConnection");

process.on("uncaughtException", (err) => {
  console.log("UnCaught", err.name, err.message);
  process.exit(1);
});

dbConnection();
const server = app.listen(process.env.PORT || 7000, () =>
  console.log(`Server Running, port: ${process.env.PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`Unhandled Rejection Errors: ${err}, Message:${err.message}`);
  server.close(() => {
    console.error("Shutting down...");
    process.exit(1);
  });
});
