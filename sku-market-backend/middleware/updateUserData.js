const User = require('../models/user.model');

const updateUserData = (req, res, next) => {
    const user = req.user;

    if (!user) {
        let token;
        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith('Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else if (req.cookies.jwt) {
            token = req.cookies.jwt;
        }

        if (!token) {
            return next();
        }

        // Verification token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Check if user still exists
        User.findById(decoded.id).then((currentUser) => {
            if (!currentUser) {
                return next();
            }

            // Check if user changed password after the token was issued
            if (currentUser.changedPasswordAfter(decoded.iat)) {
                return next();
            }

            currentUser.IP_address = req.ip;
            currentUser.last_seen = Date.now();
            currentUser.device = req.device.type;
            currentUser.save();

            // There is a logged in user
            res.user = currentUser;
            return next();
        });
    }

    user.IP_address = req.ip;
    user.last_seen = Date.now();
    user.device = req.device.type;
    user.save();

    return next();
};
