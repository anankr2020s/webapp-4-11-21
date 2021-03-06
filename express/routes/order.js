const expressFunction = require('express');
const mongoose = require('mongoose');
var expressApp = expressFunction();

const router = expressFunction.Router();
var Schema = require('mongoose').Schema;

const orderSchema = Schema({
    order:String,
},{
    collection: 'orders'
})

let Order
try {
    Order = mongoose.model('orders')
} catch(err) {
    Order = mongoose.model('orders', orderSchema);
}


const addProducts = (productData) =>{
    return new Promise ((resolve, reject) => {
        var new_product = new Order(
             productData
        );
        new_product.save(
            (err, data)=>{
                if(err){
                    reject(new Error('Cannot insert order to DB'));
                }else{
                    resolve({message: 'Order added successfully'});
                }
            }
        );
    });
}

const getOrder = ()=> {
    return new Promise (
        (resolve, reject)=>{
            Order.find({}, (err, data)=> {if(err){
                reject(new Error('Cannot get products!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot get products!'))
                }
            }})
        }
    );
}

const deleteOrder = (orderID) =>{
    return new Promise ((resolve, reject) => {
        var new_product = new Order(
            orderID
        );
        new_product.deleteOne(orderID, (err, data)=>{

            if(err){
                reject(new Error('Cannot delete products!'));
            }else{
                if(data){
                    resolve(data)
                }else{
                    reject(new Error('Cannot delete products!'))
                }
            }
        }
        );
    });
}



router.route('/deleteorder').post((req,res)=>{
    console.log("express delete order");
    console.log(req.body._id);

    deleteOrder({_id:req.body._id}).then( result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})

router.route('/getorder').get((req,res)=>{
    console.log('get');
    getOrder().then( result => {
        //console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})


router.route('/addorder').post((req, res)=>{
    console.log('addorder');
    addProducts(req.body)
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch( err => {
        console.log(err);
    })
})

module.exports = router