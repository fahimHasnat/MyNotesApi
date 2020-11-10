const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");

router.post("/login", (req, res, next) => {
    try {
        const { username, password } = req.body;

        const user = User.findOne({
            username: username,
            password: password
        });

        console.log(user);


        // if (!user[0]) {
        //     const userExist = await User.findOne({
        //         where: {
        //             [Op.and]: [
        //                 { uid: userID },
        //                 { not_deleted: true },
        //                 { is_terminated: 0 }
        //             ]
        //         }
        //     });
        //     if (userExist) {
        //         const error = new Error('Unsuccessful.! User has no role assigned');
        //         error.statusCode = 404;
        //         error.data = { user_id: userID, password: password };
        //         throw error;
        //     }
        //     const error = new Error('Unsuccessful.! Invalid User ID or Password');
        //     error.statusCode = 404;
        //     error.data = { user_id: userID, password: password };
        //     throw error;
        // }

        // if (user[0].stts != 1) {
        //     const error = new Error('Sorry. Your account is deactivated');
        //     error.statusCode = 404;
        //     error.data = user;
        //     throw error;
        // }

        // if (user[0].stts != 1) {
        //     const error = new Error('Sorry. Your account is deactivated');
        //     error.statusCode = 404;
        //     error.data = user;
        //     throw error;
        // }

        // const isEqual = await bcrypt.compare(password, user[0].pass);

        // if (!isEqual) {
        //     const error = new Error("User ID or Password is incorrect.!");
        //     error.statusCode = 401;
        //     throw error;
        // }

        // const token = jwt.sign(
        //     {
        //         id: user[0].id,
        //         user_id: user[0].uid,
        //         role: user[0].roles
        //     },
        //     process.env.TokenCode,
        //     { expiresIn: "8h" }
        // );

        // res.status(200).json({
        //     token: token,
        //     id: user[0].id,
        //     userID: user[0].uid,
        //     access: {
        //         user: user[0].user,
        //         role: user[0].role,
        //         campaign: user[0].campaign,
        //         location: user[0].location,
        //         role_access: user[0].role_access,
        //         report: user[0].report,
        //         ff: user[0].ff,
        //         scv: user[0].scv
        //     }
        // });

    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err);
    }
});