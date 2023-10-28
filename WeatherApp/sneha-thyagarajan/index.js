import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.render("home.ejs");
});

app.post("/search", async(req, res) => {
   
    try{
        const query = req.body.search;
        const apikey='8271023a2bd335144f2c2160049b438d'
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apikey}&units=metric`);
        res.render("forecast.ejs", {
            data: response.data,
        });

    }
    catch(error){
        console.error("Failed to make request:", error.message);
        res.render("forecast.ejs", {
            error: error.message,
        });
    }
});


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});