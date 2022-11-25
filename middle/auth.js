const isAuth = (req,res, next) =>{
  if(req.header('cookie')) {
    next()
  } else{
    res.redirect('/')
  }
}

module.exports = {
    isAuth
}