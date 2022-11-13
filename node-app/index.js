const express = require('express')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
}

const mysql = require('mysql2');

const sqlInsert = `INSERT INTO people (name) VALUES ('Osmar')`;
makeQuery(sqlInsert);



function createDatabaseConection(){
    return mysql.createConnection(config);
}

function makeQuery(query){
    const conections = createDatabaseConection();
    const data = conections.query(query);
    conections.end;
    return data;
}

app.get( '/' , async (req , res) => {

    const conections = createDatabaseConection();
    
    conections.query(`SELECT * FROM people`, (err, rows, _) => {
        if (err) throw err
        let allRows = '';

        rows.forEach(element => {
            allRows += '<tr style="text-align: center;">' + '<td>'+ element.id +'</td>' + '<td>'+ element.name +'</td>' + '</tr>'
        });
        res.send('<h1> Full cycle Rocks!!</h1> <table style="width:100%"><tr><th>id</th><th>nome</th></tr>' + 
        allRows + '</table>');
        conections.end;
      })    

})

app.listen(port, () => {
    console.log('Rodando na porta: 3000')
})