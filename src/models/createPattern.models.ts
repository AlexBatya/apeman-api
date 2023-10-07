

class CreatePatternModules{
    public getPatternUp(db: any, data: any){
        return new Promise((res: any) => {
            db.execute(`SELECT * FROM pattern WHERE name = ?`, [data.name], (err: any, dataOut: any) => {
                if(err) res({
                    status: 404,
                    answer: 'Ошибка'
                })
                else{
                    if(typeof dataOut[0] != 'object'){
                        res({
                            status: 200, 
                            answer: dataOut[0]
                        })    
                    }
                    else{
                        res({
                            status: 203, 
                            answer: 'Такого файла нет в базе' 
                        })
                    } 
                } 
            })
        })
    } 

    public getPatternDown(db: any, data: any){
        return new Promise((res: any) => {
            db.execute(`SELECT * FROM pattern WHERE name = ?`, [data.name], (err: any, dataOut: any) => {
                if(err) res({
                    status: 404,
                    answer: 'Ошибка'
                })
                else{
                    if(typeof dataOut[0] == 'object'){
                        res({
                            status: 200, 
                            answer: dataOut[0]
                        })    
                    }
                    else{
                        res({
                            status: 203, 
                            answer: 'Такого файла нет в базе' 
                        })
                    } 
                } 
            })
        })
    }

    public getPatterns(db: any){
        return new Promise((res: any) => {
            db.query(`SELECT * FROM pattern`, (err: any, data: any) => {
                if(err) res({
                    status: 404,
                    answer: 'Неверные параметры запросса'
                })
                else res({
                    status: 200,
                    answer: data
                })
            })
        })
    }

    public createPattern(db: any, data: any){
        return new Promise((res: any) => {
            db.execute(`INSERT INTO pattern (name, link) VALUES (?, ?)`, [data.name, data.link], (err: any) => {
                if(err) res({
                    status: 404,
                    answer: 'Неверные параметры запросса'
                })
                else res({
                    status: 200, 
                    answer: 'Паттерн добавлен'
                })
            })
        })
    }

    public deletePattern(db: any, data: any){
        return new Promise((res: any) => {
            db.execute(`DELETE FROM pattern WHERE name = ?`, [data.name], (err: any) => {
                if(err) res({
                    status: 404,
                    answer: 'Неверные параметры запросса'
                })
                else res({
                    status: 200, 
                    answer: 'Паттерн удалён'
                })
            })
        })
    }

    public downloadPatten(db: any, data: any){
        return new Promise((res: any) => {
            db.execute(`SELECT * FROM pattern WHERE name = ?`, [data.name], (err: any, dataOUT: any) => {
                if(err) res({
                    status: 404, 
                    answer: 'Неверные параметры запросса'
                })
                else res({
                    status: 200, 
                    answer: dataOUT
                })
            }) 
        })
    }
}

export default new CreatePatternModules;