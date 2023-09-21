const express=require('express')

const port =8000;
const userRoutes=require('../first-project/controllers/userRoutes')
const cors=require('cors')
const bodyParser=require('body-parser')

const app = express()

app.use(bodyParser.json());
app.use(cors());
app.use('/user',userRoutes);

app.listen(port,()=>{
    console.log(`listening on ${port}`)
})