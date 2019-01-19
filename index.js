const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const mysql = require('mysql');
// var fs = require('fs');
// var { uploader } = require('./helpers/uploader')

// var port = 1997;
const PORT = process.env.PORT || 5000

// const conn = mysql.createConnection({
//     // host: 'localhost',
//     // user: 'wakdoyok',
//     // password: '12345',
//     // database: 'popokpedia',
//     // port: 3306
//     host: 'db4free.net',
//     user: 'budiyarto23',
//     password: 'budi_1996',
//     database: 'popokpediadeluxe',
//     port: 3306
// });

var app = express({defaultErrorHandler:false}); 
// var app = express()

app.use(cors())
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(express.static('public'))

app.get('/', (req,res) => {
    res.send('<h1>Selamat Datang di API!</h1>')
})

const {
    brandRouter
} = require('./routers')

app.use("/brand", brandRouter)

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

// app.get('/getlistbrand', (req,res) => {
//     var sql = 'SELECT * from brand;';
//     conn.query(sql, (err, results) => {
//         if(err) throw err;
//         // console.log(results);
        
//         res.send(results);
//     })   
// })

// app.post('/addbrand', (req,res) => {
//     try {
//         const path = '/brand/images'; //file save path
//         const upload = uploader(path, 'PRD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')

//         upload(req, res, (err) => {
//             if(err){
//                 return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
//             }

//             const { image } = req.files;
//             console.log(image)
//             const imagePath = image ? path + '/' + image[0].filename : null;
//             console.log(imagePath)

//             console.log(req.body.data)
//             const data = JSON.parse(req.body.data);
//             console.log(data)
//             data.image = imagePath;
            
//             var sql = 'INSERT INTO brand SET ?';
//             conn.query(sql, data, (err, results) => {
//                 if(err) {
//                     console.log(err.message)
//                     fs.unlinkSync('./public' + imagePath);
//                     return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
//                 }
               
//                 console.log(results);
//                 sql = 'SELECT * from brand;';
//                 conn.query(sql, (err, results) => {
//                     if(err) {
//                         console.log(err.message);
//                         return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
//                     }
//                     console.log(results);
                    
//                     res.send(results);
//                 })   
//             })    
//         })
//     } catch(err) {
//         return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
//     }
// })

// app.put('/editbrand/:id', (req,res) => {
//     var brandId = req.params.id;
//     var sql = `SELECT * from brand where id = ${brandId};`;
//     conn.query(sql, (err, results) => {
//         if(err) throw err;

//         if(results.length > 0) {
//             const path = '/brand/images'; //file save path
//             const upload = uploader(path, 'PRD').fields([{ name: 'image'}]); //uploader(path, 'default prefix')

//             upload(req, res, (err) => {
//                 if(err){
//                     return res.status(500).json({ message: 'Upload brand picture failed !', error: err.message });
//                 }

//                 const { image } = req.files;
//                 // console.log(image)
//                 const imagePath = image ? path + '/' + image[0].filename : null;
//                 const data = JSON.parse(req.body.data);
//                 data.image = imagePath;

//                 try {
//                     if(imagePath) {
//                         sql = `Update brand set ? where id = ${brandId};`
//                         conn.query(sql,data, (err1,results1) => {
//                             if(err1) {
//                                 fs.unlinkSync('./public' + imagePath);
//                                 return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
//                             }
//                             fs.unlinkSync('./public' + results[0].image);
//                             sql = `Select * from brand;`;
//                             conn.query(sql, (err2,results2) => {
//                                 if(err2) {
//                                     return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
//                                 }

//                                 res.send(results2);
//                             })
//                         })
//                     }
//                     else {
//                         sql = `Update brand set nama='${data.nama}' where id = ${brandId};`
//                         conn.query(sql, (err1,results1) => {
//                             if(err1) {
//                                 return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
//                             }
//                             sql = `Select * from brand;`;
//                             conn.query(sql, (err2,results2) => {
//                                 if(err2) {
//                                     return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
//                                 }

//                                 res.send(results2);
//                             })
//                         })
//                     }
//                 }
//                 catch(err){
//                     console.log(err.message)
//                     return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
//                 }
//             })
//         }
//     })
// })

// app.delete('/deletebrand/:id', (req,res) => {
//     var brandId = req.params.id;
//     var sql = `SELECT * from brand where id = ${brandId};`;
//     conn.query(sql, (err, results) => {
//         if(err) {
//             return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
//         }
        
//         if(results.length > 0) {
//             sql = `DELETE from brand where id = ${brandId};`
//             conn.query(sql, (err1,results1) => {
//                 if(err1) {
//                      return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err1.message });
//                 }

//                 fs.unlinkSync('./public' + results[0].image);
//                 sql = `SELECT * from brand;`;
//                 conn.query(sql, (err2,results2) => {
//                     if(err2) {
//                         return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err2.message });
//                     }

//                     res.send(results2);
//                 })
//             })
//         }
//     })   

// })

// app.listen(PORT, () => console.log(`Listening on ${ PORT }`))