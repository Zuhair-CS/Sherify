import {Schema , model, models} from 'mongoose';
const UserSchema = new Schema({
    email:{
        type: String,
        unique: [true, "Email already exists!"],
        required: [true, "Email is required"]
    },
    username: {
        type: String,
        requred: [true, "Username is required"],
        match: [/^(?=.{4,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
    },
    image: {
        type: String,
    }
});

const User = models.SerifUser || model("SherifUser", UserSchema );

export default User