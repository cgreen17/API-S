const con = require('../../app/config/dbconfig')

const daoCommon = require('../daoCommon')

const directorDao = {
    
    ...daoCommon,
    // findAll and findById

    table: 'director',

    create: (req, res) => {
        if( Object.keys(req.body).length === 0) {
            res.json({
                "error": true,
                "message": "No fields to create"
            })
        } else if (!req.body.title) {
            res.json({
                "error": true,
                "message": "Must include a title"
            })
        } else {
            const fields = Object.keys(req.body)
            const values = Object.values(req.body)

            con.query(
                `INSERT INTO director SET ${fields.join(' = ?, ')} = ?`,
                values,
                (error, dbres)=> {
                    if(!error) {
                        res.json({Last_id: dbres.insertId})
                    } else {
                        console.log(' DAO ERROR', error)
                    }
                }
            )

        }
    },

    update: (req, res)=> {
        const fields = Object.keys(req.body)
        const values = Object.values(req.body)
        con.query(`UPDATE director SET ${fields.join(' = ?, ')} = ?`,
        values,
        (error, dbres)=> {
            if(!error) {
                res.send(`Changed ${dbres.changedRows} row(s)`)
            } else {
                console.log(' DAO ERROR', error)
                res.send('Error updating record')
            }
        }
        )
    }
}

module.exports = directorDao
    