const mongoose = require('mongoose'); // gọi mongoose vào
// const ClassModel = require('./banguser')
mongoose.connect('mongodb://localhost/thach') // liên kết databases mongodb

const UserSchema = mongoose.Schema({    // tạo mẫu bảng
  "name" : String,
  "status" : String,
  "dealine" : String
},{ collection: 'bangTodo' })

const UserModel150 = mongoose.model('bangTodo', UserSchema)   
// công cụ tương tác vs bảng cụ thể

module.exports = UserModel150

// UserModel150.create({
//     "name" : 'lái máy bay',
//     "status" : 'doing'
// })