import {randomUUID} from 'node:crypto'
import { Database } from './database.js';
import path from 'node:path';
import { buildRoutePath } from './utils/build-route-path.js';
import { write } from 'node:fs';

const database = new Database()

export const routes = [

    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
          const { search } = req.query
    
          const users = database.select('users', search ? {
            name: search,
            email: search
          } : null)

        // const users = database.select('users')
    
          return res.end(JSON.stringify(users))
        }
      },


    {
        method: 'POST',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            // const users = database.select('users')

        const { name, email } = req.body
        
                const users = {
                    id:randomUUID(),
                    name,
                    email,
                }

                database.insert('users', users)
                return res.writeHead(201).end()
            return res.end(JSON.stringify(users))
        }
    },

    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler:(req, res) =>{
            const { id } = req.params
            const {name, email} = req.body
 
            database.update('users', id, {
                name,
                email,
            })

            return res.writeHead(204).end()
        }
    },

    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler:(req, res) =>{

            const {id} = req.params
 
            database.delete('users', id)

            return res.writeHead(204).end()
        },
    }

]