const mongoose = require('mongoose'); // gọi mongoose vào
const ClassModel = require('./banguser')
mongoose.connect('mongodb://localhost/thach') // liên kết databases mongodb

const UserSchema = mongoose.Schema({    // tạo mẫu bảng
  "work" : String,
  "dealine" : String,
  class : {
    type: String, // kiểu dữ liệu
    ref: 'Banguser' // tham chiếu theo id bảng quan hệ
  }
},{ collection: 'BangTodolist' })

const UserModel120 = mongoose.model('BangTodolist', UserSchema)   
// công cụ tương tác vs bảng cụ thể

module.exports = UserModel120

// UserModel120.create({
//   "work" : 'Tiết kiệm đủ 1 tỷ',
//   "dealine" : '30/12/2022',
//   "class" : '61d5ce86b457079a5f395726'
// })

