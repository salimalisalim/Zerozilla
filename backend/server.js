const app = require("./app");
const dotenv = require("dotenv");
const connectDatabase = require("./config/database");
const { errorHandler, notFound } = require("./middleware/errorMiddleware");

// Config
dotenv.config({ path: "backend/config/config.env" });

// Database 
connectDatabase();

app.use(notFound)
app.use(errorHandler)

app.listen(process.env.PORT, () => {
    console.log(`Server is runing on port: ${process.env.PORT}`);
})