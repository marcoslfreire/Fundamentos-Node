import { time } from 'node:console'
import fs from 'node:fs/promises'
import { json } from 'node:stream/consumers'

const databasePath = new URL('../db.json', import.meta.url )

console.log(databasePath)

export class Database {
    #database ={}

    constructor(){
        fs.readFile(databasePath, 'utf8').then(data => {
            this.#database = JSON.parse(data)
        })

        .catch(()=>{
            this.#persist
        })
    }

    #persist(){
        fs.writeFile(databasePath, JSON.stringify(this.#database))
    }

    select(table,search){
        let data = this.#database[table] ?? []

    if (search) {
      data = data.filter(row => {
        return Object.entries(search).some(([key, value]) => {
          return row[key].toLowerCase().includes(value.toLowerCase())
        })
      })
    }
        return data
    }

    insert(table, data){
        if( Array.isArray(this.#database[table])){
            this.#database[table].push(data)
        }else{
            this.#database[table] = [data]
        }

        this.#persist();
        return data
    }

    update(table, id, data) {
    
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
    
        if (rowIndex > -1) {
            this.#database[table][rowIndex] = { id, ...data }
            this.#persist();
        }
    }


    delete(table, id) {
        // if (!Array.isArray(this.#database[table])) {
        //     throw new Error(`Tabela "${table}" não encontrada no banco de dados.`);
        // }
    
        const rowIndex = this.#database[table].findIndex(row => row.id === id);
    
        if (rowIndex > -1) {
            this.#database[table].splice(rowIndex, 1);
            this.#persist();
        }
    }
}
