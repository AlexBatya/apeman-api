import express from 'express';
import createPatternControllers from '../controllers/createPattern.controllers';
const router = express.Router();

router.use(async (req: any, res: any, next: any) => {
    if(req.status != 500){
        next();
    }
    else{
        res
            .status(500)
            .send('Сервер не знает как обработать этот запрос')
    }
})

router
    .route('/checkAll')
    .get(createPatternControllers.getPatterns)

router
    .route('/check')
    .post(createPatternControllers.getPattern)

router
    .route('/add')
    .post(createPatternControllers.createPattern)

router
    .route('/delete')
    .delete(createPatternControllers.deletePattern)

router
    .route('/download')
    .post(createPatternControllers.downloadPattern)

router
    .route('/update')
    .post(createPatternControllers.updatePattern)

export default router;