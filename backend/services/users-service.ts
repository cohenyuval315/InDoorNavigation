import UserData from '../models/UserData'
export const deleteAllUsers = async () =>{
    const response = await UserData.deleteMany();
    return response.deletedCount;
}

export const userLogin = async () => {
    // const validationErrors = [];
    // if (!validator.isEmail(req.body.email)) validationErrors.push({ msg: 'Please enter a valid email address.' });
    // if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' });
  
    // if (validationErrors.length) {
    //   req.flash('errors', validationErrors);
    //   return res.redirect('/login');
    // }
    // req.body.email = validator.normalizeEmail(req.body.email, { gmail_remove_dots: false });
  
    // passport.authenticate('local', (err, user, info) => {
    //   if (err) { return next(err); }
    //   if (!user) {
    //     req.flash('errors', info);
    //     return res.redirect('/login');
    //   }
    //   req.logIn(user, (err) => {
    //     if (err) { return next(err); }
    //     req.flash('success', { msg: 'Success! You are logged in.' });
    //     res.redirect(req.session.returnTo || '/');
    //   });
    // })(req, res, next);
}

export const userSignUp = async () => {

}

export const userLogout = async () => {

}

export const getUserSystemConfiguration = async () => {

}

  
export const updateUserProfile = async () => {

}

export const getUserAccount = async () => {
    
}
