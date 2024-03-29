const User = require("../models/user");
// const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")

exports.register = async (req, res) => {
  // const errors = validationResult(req);
  // if (!errors.isEmpty()) {
  //   const error = new Error('Validation failed.');
  //   error.statusCode = 422;
  //   error.data = errors.array();
  //   throw error;
  // }

  try {
    const username = req.body.username;
    const password = req.body.password;
  
    const checkedUser = await User.find({username: username});
    if(checkedUser.length > 0) {
      console.log(checkedUser)
      throw new Error('Username already exists')
    }
    

    const hashedPw = await bcrypt.hash(password, 12);
  
    const user = new User({
      username: username,
      password: hashedPw,
      theme: "light",
      lists: []
    });
  
    const savedUser = await user.save();
  
    res.status(201).json({ message: 'User created!', userId: savedUser._id });
    
  } catch (err) {
    console.log(err)
    res.status(422).json({message: err.message})
  }


  

  // bcrypt
  //   .hash(password, 12)
  //   .then(hashedPw => {
  //     const user = new User({
  //       username: username,
  //       password: hashedPw,
  //       theme: "light",
  //       lists: []
  //     });
  //     return user.save();
  //   })
  //   .then(result => {
  //     res.status(201).json({ message: 'User created!', userId: result._id });
  //     console.log("User created!")
  //   })
  //   .catch(err => {
  //     if (!err.statusCode) {
  //       err.statusCode = 500;
  //     }
  //     console.log("this is from the catch block: " + err.data)
  //     res.status(err.statusCode).json({message: err.message})
  //   });
};

exports.login = (req, res, next) => {
  const username = req.body.username.toLowerCase();
  const password = req.body.password;
  let loadedUser;
  User.findOne({ username: username })
    .then(user => {
      if (!user) {
        const error = new Error('A user with this username could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password);
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      const token = jwt.sign(
        {
          username: loadedUser.username,
          userId: loadedUser._id.toString()
        },
        'longsecretstring',
        { expiresIn: '1h' }
      );
      res.status(200).json({ 
        token: token, 
        userId: loadedUser._id.toString(),
        username: loadedUser.username
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};


exports.deleteUser = (req, res) => {
  const userId = req.userId; 
  console.log(userId)

  User.deleteOne({_id: userId})
  .then(user => {
    console.log("User deleted!")
    res.status(200).json();
  })
  .catch(err => console.log(err))
}

// exports.forgotPassword = (req, res) => {
//   const username = req.body.username
//   User.findOne({username: username})
//   .then(user => {
//     if(!user) {
//       console.log("username does not match existing user")
//       res.json({auth: false})
//     }
//     res.status(200).json({auth: true})
//   })
//   .catch(err => console.log(err))
// }


