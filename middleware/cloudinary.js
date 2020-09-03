const { resolve } = require('path');

require('dotenv').config();
var cloudinary = require('cloudinary').v2

// cloudinary.config({
//     could_name:"vovanngan",
//     api_key:"458711664235994",
//     api_secret:"F_gzlkvoG8VkhDkMso_4sH1mGMk"})

// cloudinary.config({
//     could_name:process.env.CLOUD_NAME,
//     api_key:process.env.API_KEY,
//     api_secret:process.env.SECRET_KEY
// });

cloudinary.config(process.env.CLOUDINARY_URL)
exports.uploads = file =>{
    return new Promise (resolve => {
        cloudinary.uploader.upload(file, {
            folder:"single"
        }).then(result => {
            if (result) {
                const fs = require('fs')
                fs.unlinkSync(file)
                resolve({
                    url: result.secure_url
                })
            }
        })
    })
}

