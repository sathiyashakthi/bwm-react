
const User =require('../models/user');
const {normalizeErrors} =require('../helpers/mongoose')
const jwt =require('jsonwebtoken');
const  config =require('../config/dev')
exports.auth =function(req, res){
    const  {email,password}= req.body
     
 if(!password ||!email){
    return res.status(422).send({errors:[{title:'Datamissing',detail:'Provide email and password'}]})
    
}
User.findOne({email},function(err,user){
    if(err){
        return res.status(422).send({errors:normalizeErrors(err.errors)});

    }
    if(!user){
        return res.status(422).send({errors:[{title:'Invalid User',detail:'User does not exists'}]});
     
    }
    if(user.hasSamePassword(password)){
    
        const token=  jwt.sign({
                // data: 'foobar'
                userId : user.id,
                username :user.username
                }, config.SECRET, { expiresIn: '1h' });
                return res.json({token});
    }else{
        return res.status(422).send({errors:[{title:'Wrong Data ',detail:'Wrong email or password'}]})
    
    }
});

}

exports.register =function(req, res){
   /*const username =req.body.username;
   const email =req.body.email;
   const password =req.body.password;
   const passwordConfirmation =req.body.passwordConfirmation;
  */
 const  {username,email,password,passwordConfirmation}= req.body
  
 if(!password ||!email){
     return res.status(422).send({errors:[{title:'Datamissing',detail:'Provide email and password'}]})
     
 }
 if(password !=passwordConfirmation){
    return res.status(422).send({errors:[{title:'Invalid Password',detail:'Password is not same as confirmation'}]})
    
}
User.findOne({email},function(err,existingUser){
    if(err){
       return res.status(422).send({errors:normalizeErrors(err.errors)});

    }
    if(existingUser){
        return res.status(422).send({errors:[{title:'Invalid email',detail:'User with email already exists'}]})
    }
    const user =new User({
        username,
        email,
        password
    });
    user.save(function(err){
        if(err){
            return res.status(422).send({errors:normalizeErrors(err.errors)});

        }
        return res.json({'registered':true})
    })
})


 //res.json({username,email});

}
exports.authMiddleware =function(req,res,next){
    const token =req.headers.authorization;
    if(token){
        const user = parseToken(token)
        User.findById(user.userId,function(err, user){
            if(err){
                return res.status(422).send({errors:normalizeErrors(err.errors)});

            }
            if(user){
                res.locals.user =user;
                next();
            }else{
                return res.status(401).send({errors:[{title:'Not Authorized',detail:'You need to login to get access'}]});

            }
        })
    }else{
        return res.status(401).send({errors:[{title:'Not Authorized',detail:'You need to login to get access'}]});

    }
}
function parseToken(token){
    
    return  jwt.verify(token.split(' ')[1], config.SECRET);
    //console.log(decoded.foo) // bar
}