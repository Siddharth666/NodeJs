const bcrypt = require('bcrypt')
const saltrounds = 10;
const mysqlconn = require('../mySqlConnection');
const nodemailer = require('nodemailer');


var today = new Date();
//1. Registration
module.exports.register = function(req, res) {
    var OriginalPassword = req.body.password;
    
    var hash = bcrypt.hashSync(OriginalPassword, saltrounds);
    var users = {
        "name": req.body.name,
        "email": req.body.email,
        "password": hash,
        "created_at":today,
        //"updated_at": req.body.updateddate
    }

    mysqlconn.query('Insert into users set?', users, (error, results)=> {
        if(error) {
            res.json({
                status: false,
                message: "Some error with query"+error
            });
        }
        else {
            res.json({
                status: true,
                message: "Registered succesfully"
            })
        }
    })
}


// 2. Login
module.exports.login = (req, res)=> {
    var email = req.body.email;
    var pass = req.body.password;
    mysqlconn.query("Select * from users where email = ?", [email], (error, someresults)=> {
        if(error) {
            res.json({
                status: false,
                message: "Error while Logging" + error
            });
        }
        else {
            if(someresults.length > 0) {
                bcrypt.compare(pass, someresults[0].password, (err, resss)=> {
                    if(!resss) {
                        res.json({
                            status: false,
                            message: "User not found"
                        });
                    }
                    else {
                        res.json({
                            status: true,
                            message: "Succesfully Logged In by "+someresults[0].name
                        }) 
                    }
                })
            }
        }
    })
}


//3. 
//a. Forgot Password (Update table wih a random otp and send an Email with same OTP)
module.exports.forgot = async function(req, res) {
    var email = req.body.email;
    console.log(email)
    mysqlconn.query("Select email from users where email = ?", email,async function(error,result) {
        console.log(result+ error)
        if(error) {
            res.json({
                status: false,
                message: "Email not found"+error
            });
        }
        else {
            if(result.length>0) {

                function generateOTP() {
                    var digits = '01234';
                    let OTP = '';
                    for (let i =0; i<4; i++) {
                        OTP += digits[Math.floor(Math.random() * 4)]; 
                    }
                    return OTP;
                }


                var randomOTP = generateOTP().toString();
                console.log(randomOTP);
                mysqlconn.query("Update users set otp_received = '"+randomOTP+"' where email= '"+email+"' ");

                var smtpTransport = nodemailer.createTransport({
                    service: 'Gmail',
                  
                    auth: {
                        user: "datamoulds@gmail.com",
                        pass: "Tombofstone1987$"
                    },
                   
                    connectionTimeout: 20000,
                    socketTimeout: 30000
                });
                
                var mailOptions = {
                    to: email,
                    from: 'datamoulds@gmail.com',
                    subject: "OTP for Hybrid",
                    text: "OTP is "+randomOTP
                };
                 await smtpTransport.sendMail(mailOptions, function (req, res) {
                });
                res.json({
                    status: true,
                    message: 'Email sent Succesfully!!!'
                });
                
            }
            else {
                res.json({
                    status: false,
                    message: 'User does not exist!'
                })
            }
        }
    })
}


//b. Compare email otp with db otp
module.exports.verify = (req, res)=> {
    const email = req.body.email;
    const otp = req.body.otp;

    mysqlconn.query("Select otp_received from users where email=?", email, (error, results)=> {
        if(error) {
            res.json({
                status: false,
                message: "Some error"+error
            });
        }
        else {
            if(results.length>0) {
                if(otp == results[0].otp_received) {
                    res.json({
                        status: true,
                        message: "Email has been verified"
                    });
                }
            else {
                res.json({
                    status: false,
                    message: "Email could not be verified"
                });
            }
            }
        }
    })
}

//c. Reset password

module.exports.reset = function (req, res) {
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(req.body.password, salt);
    const email = req.body.email;
    var newpassword = hash;
    mysqlconn.query("UPDATE users SET password='" + newpassword + "'  where email='" + email + "'", function (error, results) {
        if (error) {
            res.json({
                status: false,
                message: 'there are some error with query'+error
            })
        }
        else {
            if (results.length > 0) {
                res.json({
                    status: false,
                    message: "Password does not match"
                })
            }
            else {
                res.json({
                    status: true,
                    message: "Password Change Successfully"
                })
            }
        }
    });
}