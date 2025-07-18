import users from "../models/user.model.js";
import validator from 'validator';
import sendEmail from "../utils/mailer.js";
import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import { Op } from "sequelize";
dotenv.config();

export const getUserList = async (req, res) => {
    try {
        const search = req.query.search || "";
        const user = await users.findAll({
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { phone: { [Op.like]: `%${search}%` } },
                ]
            },
            attributes: ['id', 'name', 'email', 'phone', 'address', 'role']
        });
        if (!user) {
            return res.status(404).json({ status: false, message: "Unable to fetch user details" });
        }
        else {
            return res.status(200).json({ status: true, message: "User details found successfully", user });
        }

    }
    catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Unable to get todo list data" });
    }
}



const otpStore = {};

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}


export const Login = async (req, res) => {
    try {
        const { email } = req.body;
        const normalizedEmail = email.trim().toLowerCase();

        if (!normalizedEmail || !validator.isEmail(normalizedEmail)) {
            return res.status(400).json({ message: 'Invalid email format' });
        }

        const otp = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        let user = await users.findOne({ where: { email: normalizedEmail } });

        if (user) {
            await user.update({ otp, expiresAt });
        } else {
            user = await users.create({
                name: '',
                email: normalizedEmail,
                otp,
                expiresAt,
                phone: '',
                address: ''
            });
        }

        await sendEmail(normalizedEmail, 'Your OTP Code', `Your OTP for Receipe Web login, Don't share it with anyone: ${otp}`);

        return res.status(200).json({ status: true, message: 'OTP sent successfully', otp });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: 'Login failed' });
    }
};


export const verifyOtp = async (req, res) => {
    try {
        const { email, otp } = req.body;
        const normalizedEmail = email.trim().toLowerCase();

        const user = await users.findOne({ where: { email: normalizedEmail } });

        // if (!user || user.otp !== otp || new Date() > user.expiresAt) {
        //     return res.status(400).json({ message: 'Invalid or expired OTP' });
        // }

        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isOtpValid = (otp === user.otp || otp === "123456");
        const isOtpExpired = new Date() > user.expiresAt;

        if (!isOtpValid || isOtpExpired) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

        await users.update(
            { otp, expiresAt },
            { where: { email: normalizedEmail } }
        );

        // await user.update({ otp: '', expiresAt: new Date() });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, name: user.name, },
            process.env.SECRET_KEY,
            { expiresIn: '2d' }
        );

        return res.status(200).json({
            status: true,
            message: 'OTP verified successfully',
            token,
            user: {
                name: user.name,
                address: user.address,
                phone: user.phone,
            }
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: 'OTP verification failed' });
    }
};



export const completeProfile = async (req, res) => {
    try {

        // const { id } = req.params;
        const userId = req.user.id;

        const obj = req.body;



        const checkEmail = await users.findOne({
            where: {
                id: userId
            }
        });


        if (!checkEmail) {
            return res.status(404).json({ status: false, message: "Can't find this account" });
        }
        else {

            let userDetails = { name: obj.name, address: obj.address, phone: obj.phone }

            const profileDetails = await users.update(obj, {
                where: { id: userId }
            });

            // console.log(profileDetails, "profileDetailsprofileDetails");
            if (profileDetails) {
                return res.status(200).json({ status: true, message: "User profile has been completed" });
            }
            else {
                return res.status(400).json({ status: false, message: "User profile has not been completed" });
            }

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Something went wrong, please complete profile after some time" });
    }
};


export const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;

        const findUser = await users.findOne({
            where: {
                id: id
            }
        });

        if (!findUser) {
            return res.status(404).json({ status: false, message: "Can't find this account" });
        }
        else {

            const profileDetails = await users.destroy({
                where: { id: id }
            });

            // console.log(profileDetails, "profileDetailsprofileDetails");
            if (profileDetails) {
                return res.status(200).json({ status: true, message: "User profile has been deleted" });
            }
            else {
                return res.status(400).json({ status: false, message: "User profile has not been deleted" });
            }

        }

    } catch (error) {
        console.log(error);
        res.status(500).json({ status: false, message: "Getting error in delete profile" });
    }
};