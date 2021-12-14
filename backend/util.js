const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    const token = req.headers.authorization;
    console.log(token);
    if (!token) {
        res.status(401).send("Unauthorized");
    } else {
        // todo: set up process.env.SUPER_SECRET
        const onlyToken = token.slice(7, token.length);
        jwt.verify(onlyToken, "secret_token", function (err, decode) {
            if (err) {
                res.status(401).send("Invalid token");
            }
            console.log(req.username);
            console.log(decode);
            req.username = decode.username;
            next();
        });
    }
}
