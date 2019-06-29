const express =require('express');
const router = express.Router();
const Rental =require('../models/rental');
const User = require('../models/user')
const UserCtrl = require('../controllers/user')
const {normalizeErrors} =require('../helpers/mongoose');
router.get('/secret',UserCtrl.authMiddleware, function(req,res){
    res.json({"secret": true})
})

 
router.get('/manage',UserCtrl.authMiddleware,  function(req,res){
  const user = res.locals.user

  Rental
    .where({user})//user:user
    .populate('bookings')
    .exec(function(err,foundRentals){
      if(err){
        return res.status(422).send({errors:normalizeErrors(err.errors)}); 

      }
      return res.json(foundRentals)
    });
});

router.get('/:id',function(req, res){
  const rentalId = req.params.id;
  Rental.findById(rentalId)
        .populate('user','username -_id')
        .populate('bookings','startAt endAt -_id')
        .exec( function(err,foundRental)
        {
      if(err){
        return  res.status(422).send({errors:[{title: 'Rental Error', detail :'could not find Rental'}]});
      }
      return res.json(foundRental);
  });
});

router.delete('/:id',UserCtrl.authMiddleware,function(req,res){
  const user =res.locals.user

  Rental.findById(req.params.id)
        .populate('user','_id')
        .populate({
          path:'bookings',
          select:'startAt',
          match:{startAt:{ $gt : new Date()}}
        })
        .exec(function(err,foundRental){

          if(err){
            return res.status(422).send({errors:normalizeErrors(err.errors)}); 
          }
          if(user.id !==foundRental.user.id){
            return  res.status(422).send({errors:[{title: 'Invalid User', detail :'You are not Rental Owner'}]});

          }
          if(foundRental.bookings.length>0){
            return  res.status(422).send({errors:[{title: 'Active Booking', detail :'Cannot delete rental with active booking'}]});

          }
          foundRental.remove(function(err){
            if(err){
              return res.status(422).send({errors:normalizeErrors(err.errors)}); 

            }
            return res.json({'status':'Deleted'})
          });
        });

})






router.post('',UserCtrl.authMiddleware,function(req,res){
  const {title,city,street,category,image,shared,bedrooms,description,dailyRate}= req.body;
  const user =res.locals.user;
  const rental = new Rental({title,city,street,category,image,shared,bedrooms,description,dailyRate});
  rental.user =user
  Rental.create(rental,function(err,newRental){
    if(err){
      return res.status(422).send({errors:normalizeErrors(err.errors)}); 
    }
    User.update({_id :user.id},{$push :{rentals:newRental}},function(){})
    return res.json(newRental)
  })
})
router.get('',function(req, res){
  const city =req.query.city;
  if(city){
    Rental.find({city:city.toLowerCase()})
    .select('-bookings')
    .exec(function(err,filteredRentals){
      if(err){
        return res.status(422).send({errors:normalizeErrors(err.errors)});

      }
      if(filteredRentals.length===0){
        return  res.status(422).send({errors:[{title: 'Rental Error', detail :`There are no rentals for city ${city}`}]});  
      }
      return res.json(filteredRentals);
    })
  }else{
    Rental.find({})
    .select('-bookings')
    .exec(function(err,foundRentals){
  res.json(foundRentals);
})
  }
   
});


module.exports =router;