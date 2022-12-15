const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../helper/auth.config");
const db = require("../helper/db");

module.exports = {
    signin
};

async function signin(params,res) {

  const {email, password } = params;
  try{
      await db.Users.findOne({where: {email: email }})
        .then(user =>{
        
        if(!user) 
        { 
          console.log("Sorry Account " + email + " not found !"); 
        } else {

            const isSame = bcrypt.compareSync(password, user.password);

            if (isSame) {

              var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
              }); 
            }  else {
              console.log("🌕🌕 Sorry password is incorrect ! 🌕🌕"); 
            }
            
          }
          console.log('🔥🔥 Welcome ' + user.username + ' you are connected ! 🔥🔥');
          return {
            ...user.toJSON(),
            token
          }
        })

    } catch (err)
    {
        console.log(err.message);
    }
}
