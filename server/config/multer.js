import multer from "multer"

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "./public/tmp"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
export const upload=multer({storage});



// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/tmp");
//   },
//   filename: function (req, file, cb) {
//     const fileName = `${Date.now()}-${file.originalname}`;

//     cb(null, fileName);
//   },
// });