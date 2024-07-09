import fileUpload from 'express-fileupload'

const fileUploadConfig = fileUpload({
  limits: { fileSize: 5000000 },
  abortOnLimit: true,
  responseOnLimit: 'Se sobrepasó el límite de la imagen.'
})

export default fileUploadConfig
