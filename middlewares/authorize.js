const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    let token = req.header('Authorization');
    if (!token) return res.status(401).send("Sorry the user is unauthorised");
    token = token.split(' ')[1].trim();
    try {
        let payload = jwt.verify(token, process.env.SECRETKEY);
        req.user = payload;
        next();
    } catch (e) {
        res.status(400).send("Not valid token");
    }
}