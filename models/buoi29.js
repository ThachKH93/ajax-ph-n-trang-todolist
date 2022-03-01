// buoi29 -> for11 -> kkkk  : tham chiếu
const mongoose = require('mongoose'); // gọi mongoose vào
// const ClassModel = require('./for11') // Cung cấp công cụ tương tác với bảng quan hệ (model của bảng quan hệ)
mongoose.connect('mongodb://localhost/thach') // liên kết databases mongodb

const UserSchema = mongoose.Schema({    // tạo mẫu bảng
  "username" : String,
  "age" : Number,
  "password" : String,
  class : 
  [
    {
      classId: {
        type: String, // kiểu dữ liệu
        ref: 'home' // tham chiếu theo id bảng quan hệ
      },
      attent : Number
    }
  ]
},{ collection: 'userthachpk' })

const UserModel = mongoose.model('userthachpk', UserSchema)   
// công cụ tương tác vs bảng cụ thể

module.exports = UserModel

// UserModel.find()
// // .populate('class') // tương tác với bảng quan hệ qua trường 'class'
// // .populate('class.classId') // tương tác với bảng quan hệ qua trường 'class'
// .populate({  // populate các bảng có quan hệ liên hoàn ( vào for11 trước - rồi vào kkkk  )
//   path : 'class.classId',
//   populate : { path : 'teacher' }
// })
// .then(function(data){
//   // console.log(data[0]);
//   console.log(data[0].class); // trỏ cụ thể vào class khi Terminal ko đủ chỗ hiển thị
// })
// .catch(function(err){
//   console.log(err);
// })