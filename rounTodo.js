const express = require('express')
const router = express.Router()
const path = require("path") // dùng path lấy link tuyệt đối

const UserModel150 = require('./bangTodo')
const UserModel100 = require('./banguser')

const checkLogin = require('./checkLogin')

router.get("/danhsach",checkLogin , function(req, res){ // xem
    UserModel150.find()
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
    
});

router.get('/page/:page/:status',checkLogin , async (req, res) =>{
    try {
        const data =  await UserModel150.find({status: req.params.status})
        .sort('dealine')
        .skip(5 * (req.params.page - 1) )
        .limit(5)
        data.sort(function(a,b){
            return new Date(`${a.dealine}`) - new Date(`${b.dealine}`);
        })
        res.json(data)
    } catch (error) {
        res.json({mess: 'loi sever', error})
    }
})

router.post("/create", function(req, res){ // api post
    UserModel100.findOne({ username: req.body.username })
    .then(function(data){
        if (data) {
            res.json({ mess : 'Username đã tồn tại' })
        }else{
            UserModel100.create({
                username : req.body.username,
                password : req.body.password,
            })
            .then(function(data){
                res.json(data)
            })
            .catch(function(err){
                console.log(err);
            })
        }
    })
    .catch(function(err){
        console.log(err);
    })
});

router.post('/login', async (req, res) =>{
    try {
        // console.log(req.body);
        const user = await UserModel100.findOne({username : req.body.username, password: req.body.password})
        if (user) {
            res.json({user, mess:'thanh cong'})
        }else{
            res.json({mess:'user ko ton tai'})
        }
    } catch (error) {
        res.json({error ,mess:'loi sever'});
    }
})
router.post("/creatework",checkLogin, function(req, res){ // api thêm work todolist
    UserModel150.findOne({ name: req.body.name })
    .then(function(data){
        if (data) {
            res.json({ mess : 'work đã tồn tại' })
        }else{
            UserModel150.create({
                name : req.body.name,
                dealine : req.body.dealine,
                status : req.body.status
            })
            .then(function(data){
                res.json(data)
            })
            .catch(function(err){
                console.log(err);
            })
        }
    })
    .catch(function(err){
        console.log(err);
    })
});

router.put("/updateWork",checkLogin , function(req, res){ // express lấy file HTML
    UserModel150.updateOne({ name: req.body.name  }, 
        { dealine: req.body.dealine, status: req.body.status})
    .then(function(data){
        if (data.modifiedCount) {
            res.json({mess: 'update thanh cong', data})
        }else{
            res.json({mess: 'sai name, dealine hoac status khong doi'})
        }  
    })
    .catch(function(err){
        console.log(err);
        res.json(error)
    })
});

router.delete("/xoaWork",checkLogin , function(req, res){ // express lấy file HTML
    UserModel150.deleteOne({ name: req.body.name })
    .then(function(data){
        res.json(data)
    })
    .catch(function(err){
        console.log(err);
    })
});

module.exports = router