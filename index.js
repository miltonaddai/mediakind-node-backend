import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import postRoutes from './routes/posts.js'
import dotenv from 'dotenv';
// import schedule from 'node-schedule'



const app = express();
dotenv.config();


app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.use('/mk', postRoutes);

app.get('/', (req, res) => {
    res.send('API is running');
});



//everyminute job
// schedule.scheduleJob('* * * * *', () => {
//     setCDN();
//     console.log("cdn set")
// })


mongoose.Promise = global.Promise;

//production
const PORT = process.env.PORT 

//localhost
//const PORT = process.env.PORT || 8082;

mongoose.connect(process.env.mongoUri, {useMongoClient: true, useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> app.listen(PORT,()=> console.log(`Server running on port:${PORT}`)))
.catch((error) => console.log(error.message));

mongoose.set('useFindAndModify', false); 