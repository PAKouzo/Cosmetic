import User from "../models/users"
import bcrypt from "bcryptjs"
import { genneralAccessToken } from "./JwtService"

const create = (newUser) => {
    return new Promis (async (resolve, reject) => {
        const {name, email, password, confirmPassword, phone } = newUser
        try {
            const checkUser = await User.findOne ({
                email: email
            })
            if (checkUser !== null) {
                resolve({
                    status: 'OK',
                    message: 'The email is already'
                })
            }
            const hash = bcrypt.hashSync(password,10)
            console.log('hash', hash)
            const create = await User.create({
                name, 
                email,
                password: hash,
                confirmPassword,
                phone
            })
            if (create) {
                resolve({
                    status: 'OK',
                    message: 'SUCCESS',
                    data: create
                })
            }
        } catch (e){
            reject(e)
        }
    })
}

const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                id: id
            })
            console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            const updateUser = await User.findByIdAndUpdate(id, data)
            resolve({
                status:'OK',
                message: 'SUCCESS',
                data: updateUser
            })
        } catch (e){
            reject(e)
        }
    })
}


const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                id: id
            })
            console.log('checkUser', checkUser)
            if (checkUser === null) {
                resolve({
                    status: 'OK',
                    message: 'The user is not defined'
                })
            }

            await User.findByIdAndDelete(id)
            resolve({
                status:'OK',
                message: 'Delete user success',
            })
        } catch (e){
            reject(e)
        }
    })
}

module.exports = {
    create,
    updateUser,
    deleteUser
}