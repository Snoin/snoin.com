var cloudinary = require('cloudinary');

cloudinary.uploader.upload(process.env.POWEBSCR_IMGPATH, function(result) {
    console.log(JSON.stringify(result));
});
