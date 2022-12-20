const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../helper/auth.config");
const db = require("../helper/db");

module.exports = {
    signin
};

async function signin(params) {
  let userData = {};
  const {email, password } = params;
  try{
    await db.Users.findOne({where: {email: email}})
        .then(async user => {
            if(user) 
            { 
              const isSame = bcrypt.compareSync(password, user.password);

                  if (isSame) {
                    var token = jwt.sign({ id: user.id }, config.secret, {
                      expiresIn: 86400 // 24 hours,
                    }); 
                  }  else {
                  console.log("🌕🌕 Sorry password is incorrect ! 🌕🌕"); 
                }    
              //save token in db
              user.update({access_token: token});

              await user.save(); 
              return userData = {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                access_token: token
              }

            } else {
            console.log("Sorry Account " + email + " not found !"); 
            //retourner un message d'erreur et un code d'erreur
          }
          console.log('🔥🔥 Welcome ' + user.username + ' you are connected ! 🔥🔥');
          return JSON.stringify({userData: user} , {access_token: token});
    })
        
      } catch (err)
      {
        console.log(err.message);
      }

      return userData;
}