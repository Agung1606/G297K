import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import otpGenerator from 'otp-generator';


/* middleware for verify user */
export const verifyUser = async (req, res, next) => {
    try {
        const { email } = req.method == "GET" ? req.query : req.body;

        // check the user existance
        const exist = await User.findOne({ email });
        if(!exist) return res.status(StatusCodes.NOT_FOUND).json({ msg: "User not found "});

        next();
        
    } catch (error) {
        return res.status(StatusCodes.NOT_FOUND).json({ error: "Authentication Error "});
    }
};

// POST: http://localhost:4001/api/v1/auth/register
export const register = async (req, res) => {
    try {
        const { 
            firstName,
            lastName,
            email,
            password,
            birthday,
            gender,
        } = req.body;

        // check the existing email
        const existemail = new Promise((resolve, reject) => {
            User.findOne({ email }, (err, email) => {
                if(err) reject(new Error(err));
                if(email) reject({ msg: "Email sudah digunakan"});

                resolve();
            })
        });

        Promise.all([existemail])
            .then(() => {
                if(password) {
                    bcrypt.hash(password, 10) // hashedPassword
                        .then(hashedPassword => {

                            const user = new User({
                                firstName,
                                lastName,
                                email,
                                password: hashedPassword,
                                birthday,
                                gender,
                                bio: "",
                                followers: {},
                                following: {},
                            });

                            // return save result as a response
                            user.save()
                                .then(result => res.status(StatusCodes.CREATED).json({ msg: "Register berhasil", userId: user._id }))
                                .catch(error => res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error));

                        }).catch(error => {
                            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
                                msg: "Enable to hashed password"
                            });
                        })
                };
            }).catch(error => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            })

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// PUT: http://localhost:4001/api/v1/auth/register/username
export const registerUsername = async (req, res) => {
    try {
        const { userId } = req.query;
        const { username } = req.body;
        
        // check if username exits
        const existusername = new Promise((resolve, reject) => {
            User.findOne({ username }, (err, user) => {
                if(err) reject(new Error(err));
                if(user) reject({msg: 'Username sudah digunakan'});
                
                resolve();
            })
        });

        Promise.all([existusername])
            .then(() => {
                if(userId) {
                    User.updateOne(
                        { _id: userId },
                        { username },
                        (err, data) => {
                            if(err) throw err;
                            return res.status(StatusCodes.OK).json({ msg: 'account berhasil di buat'});
                        }
                    );
                }
            })
            .catch((error) => {
                return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
            })
        } catch (error) {
            return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// POST: http://localhost:4001/api/v1/auth/login
export const login = async (req, res) => {
    try {
        
        const { username, password } = req.body;

        if(!username || !password) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Please provide credentials"});

        User.findOne({ username })
            .then(user => {
                // compare password
                bcrypt.compare(password, user.password)
                    .then((checkPassword) => {

                        if(!checkPassword) return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password salah"});

                        // create token
                        const token = jwt.sign({
                                        userId: user._id,
                                        username: user.username
                                    }, process.env.JWT_SECRET_KEY, { expiresIn: '2d' });

                        const { password, ...rest } = user._doc; // send to the front end user information without password
                        
                        return res.status(StatusCodes.OK).json({
                            msg: "Login berhasil",
                            userData: rest,
                            token
                        });

                    })
                    .catch(error => {
                        return res.status(StatusCodes.BAD_REQUEST).json({ msg: "Password salah"});
                    })
            })
            .catch(error => {
                return res.status(StatusCodes.NOT_FOUND).json({ msg: "User tidak ditemukan" });
            });

    } catch (error) {
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
};

// GET: http://localhost:4001/api/v1/auth/generateOTP
export const generateOTP = async (req, res) => {
    // just send number
    req.app.locals.OTP = await otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    
    return res.status(StatusCodes.CREATED).json({ code: req.app.locals.OTP });
};

// GET: http://localhost:4001/api/v1/auth/verifyOTP
export const verifyOTP = async (req, res) => {
    const { code, username } = req.query;

    if(parseInt(req.app.locals.OTP) !== parseInt(code)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid OTP" });
    }

    User.findOne({ username })
        .then(user => {
            User.updateOne({username: user.username}, 
                {confirmedAccount: 1}, (err, data) => {
                    if(err) throw err;
                    
                    req.app.locals.OTP = null;

                    return res.status(StatusCodes.OK).json({ msg: "confirmed account successfully"});
            })
        })
        .catch((error) => {
            return res.status(StatusCodes.NOT_FOUND).json({ error: "User not found" })
        });

    };