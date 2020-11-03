import {Router} from 'express';
import {LayananClient} from '../database/layanan';
const layananClient = new LayananClient;

const layananRouter = Router();

//@nama_layanan
//@operator
//@jenis_layanan
//@kode_layanan
layananRouter.post('/add' , async (req, res, next)=>
{
const layanan = req.body;
try {
    await layananClient.addlayanan(layanan);

} catch (error) {
    throw error;
  }

  res.json({
    message: 'success'
  });
});

//@route    GET /fb/account
//@desc     Get all account data
layananRouter.get('/all', async (req, res, next) => {
    let layanan;
    try {
        layanan = await layananClient.getlayananAll();
    } catch(error) {
      return next(error);
    }
  
    res.json(layanan);
  });

  layananRouter.get('/:servicecode', async (req, res, next) => {
   const param =  req.params.servicecode;
   let layanan;
    try {
        layanan = await layananClient.getlayananByKode(param);
    } catch(error) {
      return next(error);
    }
  
    res.json(layanan);
  });

  layananRouter.put('/update/:id', async (req, res, next) => {
    const id =  req.params.id;
    const update = req.body
    let layanan;
    try {
        layanan = await layananClient.UpdateLayanan(id, update)
    } catch (error) {
      return next(error);
    }
  
    res.json(layanan);
  });

  layananRouter.delete('/delete/:id', async (req, res, next) => {
    const id =  req.params.id;
    try {
      await layananClient.deleteLayanan(id)
    } catch (error) {
      return next(error);
    }
  
    res.json({
      message: 'Data deleted',
    });
  });



  export default layananRouter;