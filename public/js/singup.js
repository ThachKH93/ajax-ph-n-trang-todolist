console.log(1000);
// const checkLogin = require('./checkLogin')
// const cookieParser = require('cookie-parser')
// checkLogin()
// console.log(req.cookies );
async function singUp(){ // tạo username password
    try {
        // var username =  document.querySelector('#username').value
        // var password = document.querySelector('#password').value
        const username =  $('#username').val()
        const password = $('#password').val()
        console.log(username, password);
        var user = await $.ajax({
        url: '/user/create', //'http://localhost:4000/user/create'
        type: 'POST',
        data: {
            username: username,
            password: password
            }
        })
        console.log(17, user);
    } catch (error) {
        console.log(19, error);
    }
}

//đổi mật khẩu
async function doimatkhau(req,res){ // sửa dealine trên htmlL
    try {
        const username =  $('#username').val()
        const password = $('#password').val()
        const Newpassword = $('#Newpassword').val()
        console.log(29,username, password);
        const data1 = await $.ajax({
        url: `/user/doimatkhau`, 
        type: 'PUT',
        data: {
            username: username,
            password: password,
            Newpassword: Newpassword
            }
        })
        console.log(38, data1);
    } catch (error) {
        console.log(40, error);
    }
}
