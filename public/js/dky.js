console.log(1000);
// const jwt = require('jsonwebtoken')

async function singUp(){ // tạo username password
    try {
        
        const username =  $('#username').val()
        const password = $('#password').val()
        console.log(username, password);

        // const token = jwt.sign({username: username}, password)
        // console.log(token);
        var user = await $.ajax({
        url: '/user/create', //'http://localhost:4000/user/create'
        type: 'POST',
        data: {
            username: username,
            password: password
            }
        })
        console.log(17, user);
        // alert('dang ky thanh cong')
    } catch (error) {
        console.log(19, error);
        // alert(error,'dang ky that bai')
    }
}

//đổi mật khẩu
// async function doimatkhau(){ // sửa dealine trên htmlL
//     try {
//         const username =  $('#username').val()
//         const password = $('#password').val()
//         const Newpassword = $('#Newpassword').val()
//         console.log(29,username, password);
//         const data1 = await $.ajax({
//         url: '/user/doimatkhau/61e44852302aa6f745f380d4', 
//         type: 'PUT',
//         data: {
//             username: username,
//             password: password,
//             Newpassword: Newpassword
//             }
//         })
//         console.log(38, data1);
//     } catch (error) {
//         console.log(40, error);
//     }
// }