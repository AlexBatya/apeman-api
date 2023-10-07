import db from '../db'
import createPatternModules from '../models/createPattern.models'
import fs from 'fs';
import path from 'path'
// import zl from 'zip-lib';

const dir = path.join(__dirname, '../../', 'data', 'patterns');

class CreatePatternServices{
    public getPatterns(){
        return new Promise(async (res: any) => {
            const getpatterns: any = await createPatternModules.getPatterns(db);
            if(getpatterns.status == 200){
                if(typeof getpatterns.answer[0] == 'object'){
                    return res({
                        status: 200,
                        answer: getpatterns.answer.map((elem: any) => elem.name)
                    })
                } 
                else return res({
                    status: 203,
                    answer: 'Паттернов нет'
                }) 
            }
            else return res({
                status: getpatterns.status,
                answer: getpatterns.answer
            })
        })
    }

    public createPattern(data: any){
        return new Promise(async (res: any) => {
            const check: any = await createPatternModules.getPatternUp(db, data); 
            if(check.status == 203){
                return res({
                    status: check.status,
                    answer: 'Такой файл уже есть в базе'
                });
            }
            else if(check.status == 200){
                const writeStream = fs.createWriteStream(path.join(dir, data.name + '.zip'))
                writeStream.write(Buffer.from(data.object));
                await createPatternModules.createPattern(db, {name: data.name, link: path.join(dir, data.name + 'zip')});
                writeStream.destroy();
                return res({
                    status: 200,
                    answer: 'Файл создан'
                });
            }
            else if (check.status == 404) return res({
                status: check.status,
                answer: check.answer
            })
            
        })
    }

    public updatePattern(data: any){
        return new Promise(async (res: any) => {
            const check: any = await createPatternModules.getPatternDown(db, data); 
            if(check.status == 203){
                return res({
                    status: check.status,
                    answer: 'Такого файла нет в базе'
                });
            }
            else if(check.status == 200){
                const writeStream = fs.createWriteStream(path.join(dir, data.name + '.zip'))
                await new Promise((res: any) => {
                    writeStream.write(Buffer.from(data.object));
                    res();
                })
                writeStream.destroy();
                return res({
                    status: 200,
                    answer: 'Паттерн обновлён'
                });
            }
            else return res({
                status: check.status,
                answer: check.answer
            })
        })
    }

    public getPattern(data: any){
        return new Promise(async (res: any) => {
            const check: any = await createPatternModules.getPatternDown(db, data)
            if(check.status == 200){
                return res({
                    status: check.status,
                    answer: 'Паттенр есть'
                })
            }
            else if (check.status == 203){
                return res({
                    status: check.status,
                    answer: 'Такого паттерна нет'
                })
            }
            else return res({
                status: check.status,
                answer: check.answer
            })
            
        })
    }

    public deletePattern(data: any){
        return new Promise(async (res: any) => {
            const check: any = await createPatternModules.getPatternDown(db, data); 
            if(check.status == 203){
                return res({
                    status: check.status,
                    answer: check.answer
                })
            }
            else if(check.status == 200){
                // fs.unlinkSync(path.join(dir, data.name + '.zip'));
                fs.rmSync(path.join(dir, data.name + '.zip'), {force: true})
                await createPatternModules.deletePattern(db, data)
                return res({
                    status: 200,
                    answer: 'Паттерн удалён'
                })
            }
            else return res({
                status: check.status,
                answer: check.answer
            })
        })
    }

    public downloadPattern(data: any){
        return new Promise(async (res: any) => {

            const check: any = await createPatternModules.getPatternDown(db, data); 
            if(check.status == 200){
                const result: any = await createPatternModules.downloadPatten(db, check.answer);
                if(result.status == 200){
                    const readStream = fs.createReadStream(path.join(dir, result.answer[0].name + '.zip'))
                    const chunks: any[] = []
                    readStream.on('data', chunk => chunks.push(chunk));
                    readStream.on('end', () => {
                        return res({
                            status: 200,
                            name: data.name,
                            archiv: Buffer.concat(chunks),
                            answer: 'Данные переданны' 
                        })
                    })
                }
                else return res({
                    status: 404,
                    answer: 'Ошибка в скачивании'
                })
            }
            else return res({
                status: check.status,
                answer: check.answer
            })
        })
    }
}

export default new CreatePatternServices;