const userModel = require('../models/user');
const bcrypt = require('bcrypt');
const { $where } = require('../models/user');

const homePage =(req, res) => {
    res.render('index',  {
        err:"",
        result: "",
        LogInErr: ""
    })
 }
   const createNewUser = (req, res) => {
        if(req.body.password.length < 8){
            res.render('index', {
            err:"Password shoud be 8 char or more",
            result: "",
            LogInErr:""
        })   
    }  else {
     let hashedPass = bcrypt.hashSync(req.body.password, 12);
        if(!hashedPass) {
            res.render('index', {
                err:"Something is wrong",
                result: "",
                LogInErr: ""
                })   
        } else {
            let userData = {
                ...req.body,
                password: hashedPass
    }      
      let newUser = new userModel(userData)
      newUser.save()
      .then( (user) =>{
        res.render('index', {
            err:"",
            result: `${user.fullName} you date was added, you can login now`,
            LogInErr:""
            })   
      })
      .catch(err => {
        throw err;
      })
 }
     }
 }

    const logUser = async (req, res) => {
    let user = await userModel.findOne({email: req.body.email})
        if(!user){
        res.render('index', {
            err: "",
            result: "",
            LogInErr: "User not exist, check or registrate please"        
           })   
    } else {
        let truePass = bcrypt.compareSync(req.body.password, user.password)
        if(!truePass){
            res.render('index', {
                err: "",
                result: "",
                LogInErr: "Password not correct, check it please"        
               })   
        }else {
            res.cookie('isLoggedIn', true);
            res.redirect(`/info/${user._id}`);
        }
    }
 }
    const userInfo = (req, res) => {
        let userId = req.params.id;
        userModel.findById(userId)
            .then(user => {
                res.render('info', {
                  user: user  
                })
            })
            .catch (err => {
                throw err
            })
        //console.log(req.params)
    }
    const logout =(req,res) =>{
        res.clearCookie('isLoggedIn')
        //console.log(req.session)
        res.redirect('/')
        console.log('logout')
    }

module.exports = {
    homePage,
    createNewUser,
    logUser,
    userInfo,
    logout
}