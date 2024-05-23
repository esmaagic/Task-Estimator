exports.isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        return next();
    } else {
        return res.status(401).send('Not authenticated');
    }
};
