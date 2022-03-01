const express = require('express')
const router = express.Router()
const path = require("path")
const UserModel = require('./models/buoi29')


router.get("/", function(req, res){ // 
    UserModel.find()
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
});

router.get("/:id", function(req, res){ // params
    UserModel.findOne({ _id: req.params.id })
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
});

// postman post/ put/ delete / get

router.post("/create", function(req, res){ // api post
    UserModel.create({
        username : "thach",
        age :33,
    })
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
});
router.put("/:id", function(req, res){ // api put
    console.log(req.params.id);
    UserModel.updateOne(
        {_id: req.params.id},
        {username: 'hoang update'}
    )
    .then(function(data){
        res.json({mess : 'thanh cong', data})
    })
    .catch(function(err){
        console.log(err);
    })
});
router.delete("/:id", function(req, res){ // api delete http://localhost:3000/user/61d52886880259d94146deb5
    console.log(req.params.id);
    UserModel.deleteOne(
        {_id: req.params.id}
    )
    .then(function(data){
        res.json({mess : 'thanh cong', data})
    })
    .catch(function(err){
        console.log(err);
    })
});

router.post("/createNew", function(req, res){ // api , post : http://localhost:3000/user/createNew?username=Mien&age=57
    console.log(req.query);
    UserModel.findOne({ username: req.query.username })
    .then(function(data){
        if (data) {
            res.json({ mess :'username da ton tai' })
        }else{
            UserModel.create({
                username : req.query.username,
                age : req.query.age,
            })
            .then(function(data){
                res.json( data)
            })
            .catch(function(err){
                console.log(err);
            })
        }
    })
    .catch(function(res){
        console.log(err);
    })
    
});

router.get("/html", function(req, res){ // express lấy file HTML
    UserModel.find()
    .then(function(data){
        res.sendFile(path.join(__dirname, './view/thach-btap7.html'))
    })
    .catch(function(err){
        console.log(err);
    })
});

module.exports = router

// viết API put để sửa username
// viết API delete để xóa 1 user


// viết API tạo user có check trùng username
// data gửi về server gửi qua query