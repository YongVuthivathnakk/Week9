import jwt from 'jsonwebtoken';


export const authToken = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    const token = authHeader.split(" ")[1];
    if(!token) {
        return res.status(401).json({error: "Token is missing"});
    }

    jwt.verify(token, process.env.ACESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(401).json({ error: "Invalid or expired token" });
        }

        req.user = user;
        next();
    });
}
