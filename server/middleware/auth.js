import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';

export const verifyToken = async (req, res, next) => {
    const authHeader = req.header('Authorization');

    if(!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ msg: "UNAUTHORIZED" });
    }

    // just take token without "Bearer " keyword
    const token = authHeader.split(" ")[1];
    const verifed = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = verifed;
    next();
};

export const localVariables = (req, res, next) => {
    req.app.locals = {
        OTP: null,
    }
    
    next();
};