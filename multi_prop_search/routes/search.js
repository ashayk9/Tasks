const router = require('express').Router();
const bodyParser = require('body-parser');
const Product = require('../models/product');

router.use(bodyParser.urlencoded({extended:true}));

router.get('/',(req,res)=>{
    Product.find({},(err,all_p)=>{
        if(err){
            res.send(err);
        }else{
            res.render('search',{specific_p:all_p});
        }
    })
    
})
router.post('/',(req,res)=>{
    var product=req.body;
    console.log(product);
    Product.find({})
    .then(all_p=>{

        var features = {}
        for(let key in product)
        {
            console.log(key);
            console.log(product[key]);
            if(product[key]!='')
            {
                console.log('hi');
                features[key]=product[key].toLowerCase();
                
            }
        }
        console.log(features);
        Product.find(features)
        .then(specific_p=>{
            res.render('search',{specific_p:specific_p});
        })
        
    })
    //console.log(ram);
    // Product.find({colour:product.colour} && {ram:product.ram})
    // .then(specific_p=>{
    //     res.render('search',{specific_p:specific_p})
    // })
    // function Exists(product_f,key) { 
    //     if(product_f.key == undefined)
    //         return false;
    //     else    
    //         return true;
    // }
  
    // all_p= all_p.filter(function(item) {
        //     for (var key in product) {
        //       if (item[key] === undefined || item[key] != product[key])
        //         return false;
        //     }
        //     return true;
        //   });
        //   console.log(all_p);
        //res.render('search',{specific_p:all_p});   
    
})

// app.post('/',(req,res)=>{
//     var s = req.body.search;
//     var search = [];
//     var word='';
//     for(let each in s){
//         {
//             console.log(s[each]);
//             if(s[each]!=' ')
//             {
//                 word = word + s[each];
//             }
//             else{
//                 console.log(word);
//                 search.push(word);
//                 word='';
//             }
            
//         }
//     }
    
//     res.send(search);
// })
module.exports = router;