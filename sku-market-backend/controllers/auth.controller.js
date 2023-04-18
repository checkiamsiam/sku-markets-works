const catchAsyncErrors = require("../lib/catchAsyncErrors");
const { sendEmail } = require("../lib/nodemailer");
const User = require("../models/user.model");
const AppError = require("../util/appError");
const crypto = require("crypto");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const verifyEmailHTML = require("../util/verifyEmailHTML");
const { bucket, bucketName, bucketUpload } = require('../lib/googleBucket')

// create new user
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
    });

    // create access token
    const token = user.getJwtToken();

    // get verification token
    const verificationToken = await user.getEmailVerifyToken();

    await user.save({ validateBeforeSave: false });

    // create verification url
    const verifyUrl = `${process.env.CLIENT_URL}/auth/email/verify/${verificationToken}`;
    const html = verifyEmailHTML(verifyUrl);

    try {
        await sendEmail({
            email: user.email,
            subject: "SKU Market Email Verification",
            html,
        });
    } catch (error) {
        user.emailVerifyToken = undefined;
        user.emailVerifyTokenExpire = undefined;
        await user.save({ validateBeforeSave: false });
    }

    res.status(201).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: token,
            createdAt: user.createdAt,
        },
    });
});

// login user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // check if email and password is entered by user
    if (!email || !password) {
        return next(new AppError("Please enter email and password", 400));
    }

    // finding user in database
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new AppError("Invalid Email or Password", 401));
    }

    // check if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new AppError("Invalid Email or Password", 401));
    }

    // create token
    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            state: user.state,
            phone: user.phone,
            address: user.address,
            country: user.country,
            zipCode: user.zipCode,
            city: user.city,
            about: user.about,
            avatar: user?.avatar,
            cover: user?.cover,
            isEmailVerified: user?.isEmailVerified,
            isWhatsappVerified: user?.isWhatsappVerified,
            agreement: user?.agreement,
            seller_type: user?.seller_type,
            docs: user?.docs,
            token,
        },
    });
});

// logout user
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: "User logged out",
    });
});

// get currently logged in user details
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            state: user.state,
            phone: user.phone,
            address: user.address,
            country: user.country,
            zipCode: user.zipCode,
            city: user.city,
            about: user.about,
            avatar: user?.avatar,
            cover: user?.cover,
            isEmailVerified: user?.isEmailVerified,
            isWhatsappVerified: user?.isWhatsappVerified,
            agreement: user?.agreement,
            seller_type: user?.seller_type,
            docs: user?.docs,
        },
    });
});

// update / change password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id).select("+password");

    // check if previous old password
    if (!req.body.oldPassword) {
        return next(new AppError("Please enter old password", 400));
    }

    // check previous user password
    const isMatched = await user.comparePassword(req.body.oldPassword);
    if (!isMatched) {
        return next(new AppError("Old password is incorrect", 400));
    }

    user.password = req.body.password;
    await user.save();

    res.status(200).json({
        success: true,
        message: "Password updated successfully",
    });
});

// update user profile
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // update avatar: TODO

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// forgot password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new AppError("User not found with this email", 404));
    }

    // get reset token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // create reset password url
    const resetUrl = `${process.env.CLIENT_URL}/password/reset/${resetToken}`;

    // forget password email template
    const html = `
<!doctype html>
<html lang="en-US">
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title>Reset Password Email Template</title>
        <meta name="description" content="Reset Password Email Template.">
        <style type="text/css">
        a:hover {text-decoration: underline !important;}
        </style>
    </head>
    <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
        <!--100% body table-->
        <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
            <tr>
                <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                align="center" cellpadding="0" cellspacing="0">
                <tr>
                <td style="height:80px;">&nbsp;</td>
                </tr>
                <tr>
                <td style="text-align:center;">
                <a href="https://rakeshmandal.com" title="logo" target="_blank">
                <img width="60" src="https://i.ibb.co/hL4XZp2/android-chrome-192x192.png" title="logo" alt="logo">
                </a>
                </td>
                </tr>
                <tr>
                <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                <td>
                <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                <tr>
                <td style="height:40px;">&nbsp;</td>
                </tr>
                <tr>
                <td style="padding:0 35px;">
                <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                requested to reset your password</h1>
                <span
                style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                We cannot simply send you your old password. A unique link to reset your
                password has been generated for you. To reset your password, click the
                following link and follow the instructions.
                </p>
                <a href=${resetUrl} clicktracking=off
                style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                Password</a>
                </td>
                </tr>
                <tr>
                <td style="height:40px;">&nbsp;</td>
                </tr>
                </table>
                </td>
                <tr>
                <td style="height:20px;">&nbsp;</td>
                </tr>
                <tr>
                <td style="text-align:center;">
                <p style="font-size:14px; color:rgba(69, 80, 86, 0.7411764705882353); line-height:18px; margin:0 0 0;">&copy; <strong>www.rakeshmandal.com</strong></p>
                </td>
                </tr>
                <tr>
                <td style="height:80px;">&nbsp;</td>
                </tr>
                </table>
                </td>
            </tr>
        </table>
        <!--/100% body table-->
    </body>
</html>
`;

    try {
        await sendEmail({
            email: user.email,
            subject: "SKU Market Password Recovery",
            html,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to: ${user.email}`,
        });
    } catch (error) {
        console.log(error);
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new AppError(error.message, 500));
    }
});

// reset password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // hash url token
    const resetPasswordToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new AppError(
                "Password reset token is invalid or has been expired",
                400
            )
        );
    }

    if (
        req.body.password !== req.body.confirmPassword ||
        !req.body.password ||
        !req.body.confirmPassword
    ) {
        return next(new AppError("Password does not match", 400));
    }

    // setup new password
    user.password = req.body.password;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    // create token
    const token = user.getJwtToken();

    res.status(200).json({
        success: true,
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token,
        },
        message: "Password updated successfully",
    });
});

// verify email
exports.verifyEmail = catchAsyncErrors(async (req, res, next) => {
    const { token } = req.params;

    const emailVerifyToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");

    const user = await User.findOne({
        emailVerifyToken,
        emailVerifyTokenExpire: { $gt: Date.now() },
    });

    if (!user) {
        return next(
            new AppError(
                "Verification token is invalid or has been expired",
                400
            )
        );
    }

    user.isEmailVerified = true;
    user.emailVerifyToken = undefined;
    user.emailVerifyTokenExpire = undefined;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Email verified successfully",
    });
});

//send email verification token
exports.sendEmailVerificationToken = catchAsyncErrors(
    async (req, res, next) => {
        const user = await User.findById(req.user._id);

        // get verification token
        const token = await user.getEmailVerifyToken();

        await user.save({ validateBeforeSave: false });

        // create verification url
        const verifyUrl = `${process.env.CLIENT_URL}/auth/email/verify/${token}`;

        const html = verifyEmailHTML(verifyUrl);

        try {
            await sendEmail({
                email: user.email,
                subject: "SKU Market Email Verification",
                html,
            });

            res.status(200).json({
                success: true,
                message: `Email sent to: ${user.email}`,
            });
        } catch (error) {
            user.emailVerifyToken = undefined;
            user.emailVerifyTokenExpire = undefined;
            await user.save({ validateBeforeSave: false });

            return next(new AppError(error.message, 500));
        }
    }
);

// send OTP to user phone
exports.sendOTP = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    // get OTP
    const otp = await user.getOTP();

    await user.save({ validateBeforeSave: false });

    try {
        // ------------------- Have to send sms --------------------
        // await sendSMS({
        //   phone: user.phone,
        //   message: `Your OTP is ${otp}`,
        // });

        res.status(200).json({
            success: true,
            message: `OTP sent to: ${user.phone}`,
        });
    } catch (error) {
        user.otp = undefined;
        user.otpExpire = undefined;

        await user.save({ validateBeforeSave: false });

        return next(new AppError(error.message, 500));
    }
});

// verify OTP
exports.verifyOTP = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);

    if (!user.otp) {
        return next(new AppError("Verification failed.", 400));
    }

    const isVerified = await user.verifyOTP(req.body.otp);
    if (!isVerified) {
        return next(new AppError("Invalid OTP", 400));
    }

    if (user.otpExpire < Date.now()) {
        return next(new AppError("OTP has been expired", 400));
    }

    user.otp = undefined;
    user.otpExpire = undefined;
    user.isWhatsappVerified = true;

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "OTP verified successfully",
    });
});

// set refresh token
exports.setRefreshToken = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    // get refresh token
    const refreshToken = user.getRefreshToken();

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        refreshToken,
    });
});

// update me details
exports.updateMe = catchAsyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        phone: req.body.phone,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
        zipCode: req.body.zipCode,
        state: req.body.state,
        about: req.body.about,
    };

    const user = await User.findByIdAndUpdate(req.user._id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json({
        success: true,
        user,
    });
});

// Update Avatar
exports.updateAvatar = catchAsyncErrors(async (req, res, next) => {
    const fileName = req.file.filename;
    const filePath = `./upload/avatar/${fileName}`;

    const user = await User.findById(req.user._id);

    // Delete previous image from bucket
    const prevUrl = user.avatar.split(`${bucketName}/`)[1];
    const deletePrevImg = async() => {
        await bucket.file(prevUrl).delete();
    }
    if (prevUrl) deletePrevImg().catch(console.error);


    // Uploads a local file to the bucket
    const { url } = await bucketUpload(filePath, `avatar/${fileName}`);

    // Deleting local file
    await fs.unlinkSync(filePath);

    // Update ImagePath to the database
    user.avatar = url;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Image updated successfully",
        data: url,
    });
});

// Update Cover
exports.updateCover = catchAsyncErrors(async (req, res, next) => {
    const fileName = req.file.filename;
    const filePath = `./upload/cover/${fileName}`;
    const user = await User.findById(req.user._id);

    // Delete previous image from bucket
    const prevUrl = user.cover.split(`${bucketName}/`)[1];
    const deletePrevImg = async() => {
        await bucket.file(prevUrl).delete();
    }
    if (prevUrl) deletePrevImg().catch(console.error);

    // Uploads a local file to the bucket
    const { url } = await bucketUpload(filePath, `cover/${fileName}`);

    // Deleting local file
    await fs.unlinkSync(filePath);

    // Update ImagePath to the database
    user.cover = url;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Cover image updated successfully",
        data: url,
    });
});

// Update Agreement Accepting
exports.updateAgreement = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user._id);
    const { type, seller_type } = req.body;

    user.agreement[type] = true;

    if (seller_type) {
        user.seller_type = seller_type;
    }

    user.save({ validateBeforeSave: true });

    res.status(200).json({
        success: true,
        message: "Agreement updated successfully",
    });
});

// Upload Docs
exports.uploadDocs = catchAsyncErrors(async (req, res, next) => {
    const field = req.params.field;
    const fileName = req.file.filename;
    const filePath = `./upload/docs/${fileName}`;

    const user = await User.findById(req.user._id);


    // Uploads a local file to the bucket
    const { url } = await bucketUpload(filePath, `docs/${fileName}`);

    // Deleting local file
    await fs.unlinkSync(filePath);

    // Update to the database
    user.docs[field].url = url;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: "Document Submitted successfully",
        data: url,
    });
});
