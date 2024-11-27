const express = require("express");
const connectDb = require("./config/dbConnection");
const cors = require("cors");
const dotenv = require("dotenv");
const errorHandler = require("./middlewares/errorHandler");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const session = require("express-session");
const productRoutes = require("./routes/productRoutes");
const bodyParser = require("body-parser");
const feedbackRoutes = require("./routes/feedbackRoutes");
const medController = require("./controllers/medController");
const bmiRoutes = require("./routes/bmiRoutes");

// Load environment variables
dotenv.config();
connectDb(); // Connect to MongoDB

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors({
    origin: "http://localhost:3000", // Allow requests from your frontend
}));

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Serve static files from the uploads directory
app.use("/uploads", express.static(uploadDir));

// Setup Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});
const upload = multer({ storage });

// File Management Endpoints
app.post("/upload", upload.single("file"), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "File upload failed" });
    }
    res.status(200).json({
        message: "File uploaded successfully",
        file: {
            originalname: req.file.originalname,
            filename: req.file.filename,
        },
    });
});

app.delete("/remove/:filename", (req, res) => {
    const filepath = path.join(uploadDir, req.params.filename);
    fs.unlink(filepath, (err) => {
        if (err) {
            return res.status(500).json({ error: "File not found" });
        }
        res.status(200).json({ message: "File deleted successfully" });
    });
});

app.get("/files", (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: "Failed to list files" });
        }
        res.status(200).json({ files });
    });
});

// Default Route
app.get("/", (req, res) => {
    res.send("Backend is working!");
});

// Routes
app.use("/api/person", require("./routes/loginRoute"));
app.use("/api/feedback", feedbackRoutes);
app.use("/api", productRoutes);
app.use("/api", bmiRoutes);
app.use("/medication", medController);

// Error Handling Middleware
app.use(errorHandler);

app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

