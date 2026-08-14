import mongoose from "mongoose";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required."],
            trim: true,
            minlength: [2, "Name must be at least 2 characters long."],
            maxlength: [100, "Name cannot exceed 100 characters."],
        },

        email: {
            type: String,
            required: [true, "Email is required."],
            unique: true,
            index: true,
            trim: true,
            lowercase: true,
            match: [emailPattern, "Please provide a valid email address."],
        },

        password: {
            type: String,
            required: [true, "Password is required."],
            minlength: [6, "Password must be at least 6 characters long."],
            select: false,
        },

        role: {
            type: String,
            enum: ["user", "admin"],
            default: "user",
        },

        avatar: {
            type: String,
            default: "",
            trim: true,
        },

        // ===== AI Career Mentor Fields =====

        careerGoal: {
            type: String,
            default: "",
            trim: true,
        },

        currentSkills: {
            type: [String],
            default: [],
        },

        dailyStudyHours: {
            type: Number,
            default: 0,
        },

    targetMonths: {
    type: Number,
    default: 0,
},

experienceLevel: {
    type: String,
    enum: ["Beginner", "Intermediate", "Advanced"],
    default: "Beginner",
},
},
{
        timestamps: true,
        versionKey: false,
    },
  
);

userSchema.set("toJSON", {
    transform: (doc, returnedObject) => {
        delete returnedObject.password;
        return returnedObject;
    },
});

const User = mongoose.model("User", userSchema);

export default User;