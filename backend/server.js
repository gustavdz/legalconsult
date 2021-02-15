const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const products = require("./data/products");

const http = require("http");
const socketIo = require("socket.io");

const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const questionRoutes = require("./routes/questionRoutes");

dotenv.config();

connectDB();
const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS", "HEAD"],
  },
});

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

//CORS
//permitir el acceso o llamadas ajax al api desde cualquier frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //cualquier frente puede hacer peticiones ajax
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  res.header("Allow", "*");
  next();
});

app.use(express.json());

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/upload", uploadRoutes);

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

//const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.emit("identification", socket.id);
  socket.on("test", (body) => {
    // sending to all clients except sender
    socket.broadcast.emit("test-response", { body, from: socket.id.slice(8) });
  });
});
