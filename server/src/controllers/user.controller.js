// Purpose: Handle user-related operations.

/**
 * Get Current Logged In User
 */
export const getCurrentUser = async (req, res) => {
    try {
        res.status(200).json({
            success: true,
            message: "User fetched successfully.",
            user: req.user,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

/**
 * Update User Profile
 */
export const updateProfile = async (req, res) => {
    try {
        const {
            name,
            avatar,
            careerGoal,
            currentSkills,
            dailyStudyHours,
            targetMonths,
            experienceLevel,
        } = req.body;



        const user = req.user;
        if (experienceLevel !== undefined)
            user.experienceLevel = experienceLevel;
        if (name !== undefined) user.name = name;
        if (avatar !== undefined) user.avatar = avatar;
        if (careerGoal !== undefined) user.careerGoal = careerGoal;
        if (currentSkills !== undefined) user.currentSkills = currentSkills;
        if (dailyStudyHours !== undefined)
            user.dailyStudyHours = dailyStudyHours;
        if (targetMonths !== undefined)
            user.targetMonths = targetMonths;

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully.",
            user,
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};