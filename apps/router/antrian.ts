import {Router} from 'express';
import {AntrianClient} from '../database/antrian';
const antrianClient = new AntrianClient;

const antrianRouter = Router();



// kode_layanan: string;
// Nomer_antrian: number;
// Status: boolean;
// kode_status : string;


antrianRouter.post('/add' , async (req, res, next)=>
{
  let antrian;
const codeservice =req.body.kode_layanan;

try {
  await antrianClient.addAntrian(codeservice);
  antrian = await antrianClient.PrintLastTicket();
} catch (error) {
    throw error;
  }
  
  res.status(201).json(antrian);
});


antrianRouter.get('/all', async (req, res, next) => {
    let antrian;
    try {
        antrian = await antrianClient.getAntrianALL();
    } catch(error) {
      return next(error);
    }
  
    res.status(200).json(antrian);
  });


  antrianRouter.get('/nextnumber', async (req, res, next) => {
    let antrian;
    try {
        antrian = await antrianClient.getticketnumber();
    } catch(error) {
      return next(error);
    }
  
    res.status(200).json(antrian);
  });

  antrianRouter.put('/closed/:id', async (req, res, next) => {
    const id =  req.params.id;
    const layanan =  req.body.kode_layanan;
    //console.log('test : ' + id,layanan)
    let antrian;
    try {
        antrian = await antrianClient.updateStatusAntrian(id,layanan)
    } catch (error) {
      return next(error);
    }
    res.status(200).json(antrian);
  });

  antrianRouter.delete('/reset', async (req, res, next) => {
    try {
      await antrianClient.ResetAntrian();
    } catch (error) {
      return next(error);
    }

    
    res.status(200).json({
      message: 'queees cleared',
    });
  })


  antrianRouter.get('/:service', async (req, res, next) => {
  const param =  req.params.service;
  let antrian;
    try {
        antrian = await antrianClient.getAntrianByLayanan(param);
    } catch(error) {
      return next(error);
    }
     
  
    res.status(200).json(antrian);
  });;

  antrianRouter.get('/:service/:status', async (req, res, next) => {
    const param = req.params.service+'_'+req.params.status;
    let antrian;
      try {
          antrian = await antrianClient.getbystatusservice(param);
      } catch(error) {
        return next(error);
      }
       
      res.status(200).json(antrian);
    });;




    //masih bug 
    // antrianRouter.get('/allbystatus', async (req, res, next) => {
    //   const param = req.body.Status;
    //   console.log(param);
    //   let antrian;
    //     try {
    //         antrian = await antrianClient.getAntrianByStatus(param);
    //     } catch(error) {
    //       return next(error);
    //     }
         
    //     res.status(200).json(antrian);
    //   });;





export default antrianRouter;