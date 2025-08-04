const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
require("dotenv").config()

const app = express()

// define cors
const allowedOrigins = [
    process.env.API_URL,
    process.env.FRONT_URL
];

//set ว่าใครเข้าได้บ้าง
const corsOptions = {
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            callback(null, true);
        }else{
            callback(new Error("Not allowed by CORS"));
        }
        
    }
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true} ));

app.use("/assets/uploads", express.static(path.join(__dirname, 'app/assets/uploads')));

app.get("/", (req,res)=>{
    res.send({message: "Hello, Feed API is working."});
});

// comment ไว้ เพราะอัพลง git ไม่ได้

// require("./app/config/db.config")
// require("./app/routes/feed.route")(app);

app.use((err, req, res, next)=>{
    console.error(err.stack)
    res.status(500).send({message: "Something broke",error: err.message});
});

app.use((req,res,next)=>{
    res.status(400).send({message: "Route not found"});
});

const PORT = process.env.PORT || 4000 //เลขอะไรก็ได้
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
});
