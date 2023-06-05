import express from 'express';
import mysql from 'mysql';
import cors from 'cors'



const server = express();
server.use(express.json());

server.use(cors())

server.listen (4700, function(){
    console.log('Server is running on port 4700')
});

const db = mysql.createConnection({
    host: 'localhost',
    port: 8889,
    user: 'root',
    password: 'root',
    database: 'alais',
    
})

db.connect(function(error){
    if(error){
        console.log('Connection to SQL failed', error);

    } else{
        console.log('Successfully connected to MySQL');
    }
})

// GET 
server.get('/products', function(req, res){
    let SQLQuery = 'CALL `getAllProducts`()';
    db.query(SQLQuery, function(error, data){
        if(error){
            res.json({error_message: error});

        } else {
            res.json({products:data});
        }
    })
});

// POST

server.post('/addnewproduct', function(req, res){
    let SQLQuery = 'CALL `addNewProducts`(?, ?, ?, ?, ?, ?)';
    db.query(SQLQuery, [req.body.name, req.body.description, req.body.price, req.body.inventory, req.body.image, req.body.online], function(error, data){
        if(error){
            res.json({error_message: error});

        } else {
            res.json({message: "Successfully added new product"});
        }
    })
});

// Update by price

server.put('/updateprice', function(req,res){
    let SQLQuery = "CALL `updatePrice`(?, ?)";
    db.query(SQLQuery, [req.body.id, req.body.price], function(error, data){
        if(error){
            res.json({error_message: error});
        } else {
            res.json({message: "Successfully updated price"});
        }
    })
});

// Update by all product

server.put('/updateproducts', function(req, res){
    let SQLQuery = "CALL `updateProduct`(?, ?, ?, ?, ?, ?, ?)";
    db.query(SQLQuery, [req.body.id, req.body.name, req.body.description, req.body.price, req.body.inventory, req.body.image, req.body.online], function(error, data){
        if(error){
            res.json({error_message:error});
            
        } else {
            res.json({message: "Successfully updated"})
        }
    })
})

// Delete

server.delete('/deleteproduct', function (req, res) {
    let SQLQuery = 'CALL `deleteProduct`(?)';
    db.query(SQLQuery, [req.body.id], function (error, data) {
      if (error) {
        res.json({ error_message: error });
      } else {
        res.json({ message: 'Successfully deleted product' });
      }
    });
  });
  

// Login
server.post('/validateuser', (req, res) => {
    let SQLQuery = "CALL `validateUser`(?, ?)";
    db.query(SQLQuery, [req.body.email, req.body.password], (error, data) => {
        if(error){
            res.json({error_message: error});

        }
        else {
            if(data[0].length > 0){
                res.json(true);
            }
            else{
                res.json(false);
            }
        }
    })
})

// Online Status

server.put('/setstatus/:id', (req, res) => {
    let SQLQuery = "CALL `setLiveStatus`(?, ?)";
    db.query(SQLQuery, [req.params.id, req.body.status], (error,data) =>{
        if(error){
            res.json(error)
        }
        else{
            res.json(req.body.status)
        }
    })
})

