import 'source-map-support/register'
import express from 'express';
import morgan from 'morgan';


import antrianRouter from './router/antrian';
import layananRouter from './router/layanan';


const PORT = process.env.PORT || 3000;

const app = express(); 

app.use (express.json());
app.use (morgan('dev'));
app.use ((err: Error, req: express.Request, res: express.Response, next: express.NextFunction)=>
{
    res.status(500).json({
        success : false,
        message : err.message
    });
});

app.get('/', async (req, res, next)=>{
    res.json({message: 'success'})
})

app.use('/quees', antrianRouter);
app.use('/services', layananRouter);
app.listen (PORT, ()=>{
    console.log(`app run in port ${PORT}`)
})