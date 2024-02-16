import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Please enter your email"],
        // validate: [validator.isEmail, "Please Enter a valid email"]
    },
    storeName: {
        type: String,
        required: [true, "Please enter store name"],
        maxlength: [30, "Store name should not exceed 30 character"],
        minlength: [4, "Store name should contains atleast 4 character"]
    },
    location: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        },
        pinCode: {
            type: Number,
            required: true
        },

    },
    managerName: {
        type: String,
        required: [true, "Please enter name"],
        maxlength: [30, "Name should not exceed 30 character"],
        minlength: [4, "Name should contains atleast 4 character"]
    },
    phoneNo: {
        type: Number,
        required: true
    },
    password : {
        type: String,
        required: [true , "Please enter your password"],
        minlength: [8, "Password must be greater than 8 character"],
        //when we use find method to get user data, it will return all data
        //related to the user but we dont want password of user, that's why we use select:false
        // select: false,
    },
    role: {
        type: String,
        default: "user"
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;



