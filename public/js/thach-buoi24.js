// $('.test button') // trỏ vào button là con của div.test
// const express = require('express')
// const router = express.Router()
// const path = require("path") // dùng path lấy link tuyệt đối

// const UserModel150 = require('.../bangTodo')
$('body').prepend("<p style='background: yellow;'>Xin chao</p>")
// var list = UserModel150.find()
var list = [
    // {name:'Lam bai tap', status: 'todo', deadline: '2021-12-30'},
    // {name:'Nau com', status: 'todo', deadline: '2021-12-01'},
    // {name:'Xem video', status: 'doing', deadline: '2021-12-14'},
    // {name:'Don nha', status: 'done', deadline: '2021-12-27'},
    // {name:'Mua may giat', status: 'todo', deadline: '2022-01-20'},
    // {name:'Mua Tivi', status: 'todo', deadline: '2021-11-27'},
    // {name:'Rua xe', status: 'doing', deadline: '2022-01-27'},
    // {name:'Di du tiec', status: 'doing', deadline: '2021-12-22'},
]

render()

function test1(){
    $('#add').css('display', 'block')
    $('#update').css('display', 'none')
}
function test2(){
    $('#add').css('display', 'none')
    $('#update').css('display', 'block')
}

var listadd = $('#name1')
$('#add').on('click',function(){
    var name1 = $('#name1').val();
    var status1 = $('#status1').val();
    var deadline1 = $('#deadline1').val();
    console.log(name1, status1 ,deadline1);
    $('#name1').val('')
    $('#deadline1').val('')
    if(name1 !== '' && status1 !== '' && deadline1 !== ''){
        list.push({name: name1, status: status1, deadline: deadline1})
        render()
        $('.clo').trigger('click')
    }else{
        alert('Vui lòng nhập đủ thông tin')
    }
})

function render(){
    $('.todo-list').html('')
    $('.doing-list').html('')
    $('.done-list').html('')

    list.sort(function(a,b){
        return new Date(`${a.deadline}`) - new Date(`${b.deadline}`);
    })
    
    list.map(function(val, index){
        // console.log(val.status);
        var jobHTML = `
        <tr class="mov1"> 
            <td> ${val.name} </td>
            <div class="ccc">
                <td class='datex'> ${val.deadline} </td>
                <td> <div class='mmm'> </div> </td>
                <td> <button class="transfer${index} bb" onclick=test2() data-toggle="modal" data-target="#exampleModal">Up</button> </td>
                <td> <button class="xoa${index} aa"> X </button> </td>
            </div>
            
        </tr>
        `
        // <tr class='mov1 ${new Date(`${val.deadline}`) < new Date() ? 'red' : ''}'> // thêm class red trong html
        $(`.${val.status}-list`).append(jobHTML)

        var do9 = 'background: red'
        if(new Date() - new Date(`${val.deadline}`) > 0 ){
            $('.mov1').attr('style', do9)
        }
        
        $(`.xoa${index}`).on('click', function(){
            list.splice(index, 1)
            render()
        })

        $(`.transfer${index}`).on('click', function(){
            $('#update').attr('index', index)
            console.log(index);
            $('#name1').val(list[index].name)
            $('#deadline1').val(list[index].deadline)
            $('#status1').val(list[index].status)
        })
        // console.log(`${val.status}`);
    })
    console.log(list);
}

$('#update').on('click', function(){
    var index = $('#update').attr('index')
    // console.log(index);
    var name1 = $('#name1').val();
    var status1 = $('#status1').val();
    var deadline1 = $('#deadline1').val();
    $('#name1').val('')
    $('#deadline1').val('')
    if(name1 !== '' && status1 !== '' && deadline1 !== ''){
        list[index] = {name: name1, status: status1, deadline: deadline1}
        render()
        $('.clo').trigger('click')
    }else{
        alert('Vui lòng nhập đủ thông tin')
    }
})


// sắp xếp data theo deadline
// bảng todo và doing
//                 hạn gần thì lên đàu
//                 hạn xa xuống cuối
//                 quá hạn màu đỏ lên đàu

// hiển thị data
// thêm data
// xóa data
// update ,  status, deadline
