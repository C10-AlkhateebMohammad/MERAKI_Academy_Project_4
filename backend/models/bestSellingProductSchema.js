const mongoose = require('mongoose');

const bestSellingProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   
    price: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
      },
    images:{
     type:   [String]
    },
    brand : {
        type :String,
       

    }
});

module.exports = mongoose.model('BestSellingProduct', bestSellingProductSchema);