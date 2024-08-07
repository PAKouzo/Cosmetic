import v2 from 'cloudinary';

cloudinary.config({
  secure: true,
});

console.log(cloudinary.config());
