// create user model
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            maxLength: [50, "Name cannot be more than 50 characters"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [
                /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
                "Please add a valid email",
            ],
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],
            select: false,
        },

        phone: {
            type: String,
        },

        address: {
            type: String,
        },

        country: {
            type: String,
        },

        city: {
            type: String,
        },

        zipCode: {
            type: Number,
        },

        state: {
            type: String,
        },

        about: String,

        avatar:String,
        cover: String,
        role: {
            type: String,
            default: "user",
            enum: {
                values: ["user", "admin"],
                message: "Role is either: user or admin",
            },
        },

        watch_list: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "WatchList",
                required: true,
            },
        ],

        otp: String,
        otpExpire: Date,
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        isWhatsappVerified: {
            type: Boolean,
            default: false,
        },

        seller_type: {
            type: String,
            default: "Seller",
        },
        agreement: {
            policies: {
                type: Boolean,
                default: false,
            },
            manager: {
                type: Boolean,
                default: false,
            },
            seller_type: {
                type: Boolean,
                default: false,
            },
        },
        docs: {
            commercial: {
                url: String,
                value: Number,
            },
            vat: {
                url: String,
                value: Number,
            },
            national: {
                url: String,
                value: Number,
            },
            bank: {
                url: String,
                value: Number,
            },
            brand: {
                url: String,
                value: Number,
            },
            courier: {
                url: String,
                value: Number,
            },
            other: {
                url: String,
                value: Number,
            },
        },

        IP_address: String,
        last_login: Date,
        last_seen: Date,
        device: String,
        browser: String,

        passwordChangedAt: Date,
        resetPasswordToken: String,
        resetPasswordExpire: Date,
        socketId: String,
    },
    {
        timestamps: true,
    }
);

// Encrypting password before saving user
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 10);
});

// Compare user password
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Return JWT token
userSchema.methods.getJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME,
    });
};

// Generate password reset token
userSchema.methods.getResetPasswordToken = function () {
    // Generate token
    const resetToken = crypto.randomBytes(20).toString("hex");

    // Hash and set to resetPasswordToken field
    this.resetPasswordToken = crypto
        .createHash("sha256")
        .update(resetToken)
        .digest("hex");

    // Set token expire time
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

    return resetToken;
};

// Check if user changed password after the token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    // False means NOT changed
    return false;
};

// get OTP
userSchema.methods.getOTP = async function () {
    // Generate token
    const otp = crypto.randomBytes(3).toString("hex");

    // Hash and set to resetPasswordToken field
    this.otp = await bcrypt.hash(otp, 10);

    // Set token expire time
    this.otpExpire = Date.now() + 30 * 60 * 1000;

    return otp;
};

// verify OTP
userSchema.methods.verifyOTP = async function (enteredOTP) {
    return await bcrypt.compare(enteredOTP, this.otp);
};

// get refresh token
userSchema.methods.getRefreshToken = function () {
    // Generate token
    const refreshToken = crypto.randomBytes(20).toString("hex");

    // Hash and set to resetPasswordToken field
    this.refreshToken = crypto
        .createHash("sha256")
        .update(refreshToken)
        .digest("hex");

    // Set token expire time
    this.refreshTokenExpire = Date.now() + 30 * 60 * 1000;

    return refreshToken;
};

// Get Verification Email Token
userSchema.methods.getEmailVerifyToken = async function(userData) {
    const token = crypto.randomBytes(20).toString('hex');
    // const token = await bcrypt.hash(string, 10);
    this.emailVerifyToken = await crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");;
    this.emailVerifyTokenExpire = Date.now() + 30 * 60 * 1000;

    return token;
}


module.exports = mongoose.model("User", userSchema);
