import createPatternServices from "../services/createPattern.services";
import color from 'colors';
import fs from 'fs';

const fileToken: any = fs.readFileSync('./config/localhost.json');
const token: any = JSON.parse(fileToken).authorization_token;

class CreatePatternControllers{

    public async getPattern(req: any, res: any){
        if(req.headers.authorization == token){
            const answerService: any = await createPatternServices.getPattern(req.body)
            return res 
                .status(answerService.status)
                .send(answerService.answer)
        }
        else return res
            .status(403)
            .send(color.red('Нет доступа'))
    }

    public async getPatterns(req: any, res: any){
        if(req.headers.authorization == token){
            const answerService: any = await createPatternServices.getPatterns()
            return res 
                .status(answerService.status)
                .send(answerService.answer)
        }
        else return res
            .status(403)
            .send(color.red('Нет доступа'))
    }

    public async createPattern(req: any, res: any){
        if(req.headers.authorization == token){
            if(req.body){
                const answerService: any = await createPatternServices.createPattern(req.body);
                return res 
                    .status(answerService.status)
                    .send(answerService.answer)
                
            }
            else return res
                .status(404)
                .send(color.red('Неверные параметры запросса'))
        }
        else return res
            .status(403)
            .send(color.red('Нет доступа'))
    }

    public async updatePattern(req: any, res: any){
        if(req.headers.authorization == token){
            if(req.body){
                const answerService: any = await createPatternServices.updatePattern(req.body);
                return res
                    .status(answerService.status)
                    .send(answerService.answer)
                
            }
            else return res
                .status(404)
                .send(color.red('Неверные параметры запросса'))
        }
        else return res
            .status(403)
            .send(color.red('Нет доступа'))
    }

    public async deletePattern(req: any, res: any){
        if(req.headers.authorization == token){
            if(req.body){
                const answerService: any = await createPatternServices.deletePattern(req.body);
                return res
                    .status(answerService.status)
                    .send(answerService.answer)
            }
            else return res
                .status(404)
                .send(color.red('Неверные параметры запросса'))
        }
        else return res
            .status(403)
            .send(color.red('Нет доступа'))
    }

    public async downloadPattern(req: any, res: any){
        if(req.headers.authorization == token){
            if(req.body){
                const answerService: any = await createPatternServices.downloadPattern(req.body);
                if(answerService.status == 203){
                    return res
                        .status(203)
                        .send(color.gray(answerService.answer))
                }
                else{
                    return res
                        .status(200)
                        .send(answerService)
                }
            }
            else res
                .status(404)
                .send(color.red('Неверные параметры запросса'))
        }
        else res
            .status(403)
            .send(color.red('Нет доступа'))
    }
}

export default new CreatePatternControllers;