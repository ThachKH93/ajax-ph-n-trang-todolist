const mongoose = require('mongoose'); // gọi mongoose vào
mongoose.connect('mongodb://localhost/thach') // liên kết databases mongodb

const UserSchema = mongoose.Schema({    // tạo mẫu bảng
  "username" : String,
  "age" : Number,
  "password" : String,
  "class" : String,
},{ collection: 'Banguser' })

const UserModel100 = mongoose.model('Banguser', UserSchema)   
// công cụ tương tác vs bảng cụ thể

module.exports = UserModel100