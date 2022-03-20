const User = require('../models/user')

module.exports.newUserForm = (req, res) => {
    res.render('users/register')
}

module.exports.createUser = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password);
        req.login(registeredUser, err => { // To login after registration
            if (err) return next();
            req.flash('success', 'Welcome to YelpCamp!')
            res.redirect('/campgrounds');
        })
    } catch (e) {
        req.flash('error', e.message);
        res.redirect('/register')
    }
}

module.exports.loginForm = (req, res) => {
    res.render('users/login');
}

module.exports.login = (req, res) => {
    req.flash('success', 'Welcome back to YelpCamp!');
    const redirectURL = req.session.returnTo || '/campgrounds';
    delete req.session.returnTo
    res.redirect(redirectURL);
}

module.exports.logout = (req, res) => {
    req.logout();
    req.flash('success', 'Logged Out!')
    res.redirect('/campgrounds');
}