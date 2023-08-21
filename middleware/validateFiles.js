function validateFile (req, res, next){
    const { image } = req.files;
    console.log(image);
    const array_of_allowed_files = ['png', 'jpeg', 'jpg', 'gif'];
    const array_of_allowed_file_types = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
    // Allowed file size in mb
    const allowed_file_size = 2;
    // Get the extension of the uploaded file
    const file_extension = image.name.slice(
        ((image.name.lastIndexOf('.') - 1) >>> 0) + 2
    );

    // Check if the uploaded file is allowed
    if (!array_of_allowed_files.includes(file_extension) || !array_of_allowed_file_types.includes(image.mimetype)) {
        return res.status(401).json({
            msg: "Invalid file",
        });
    }

    if ((image.size / (1024 * 1024)) > allowed_file_size) {                  
       return res.status(401).json({
        msg: "File too large",
       });
    }
    return next();
}

module.exports = validateFile;