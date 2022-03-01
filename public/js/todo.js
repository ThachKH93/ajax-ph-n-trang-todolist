
function renderHome(){

$.ajax({
    url: '/Todo/danhsach',
    type : 'GET',

})
.then(data =>{ 
    console.log(9,data);
    let todoList = []
    let doingList = []
    let doneList = []
    let All = [todoList ,doingList ,doneList]
    
    data.sort(function(a,b){
        return new Date(`${a.dealine}`) - new Date(`${b.dealine}`);
    })

    for (let i = 0; i < data.length; i++) {
        
        if (data[i].status === 'todo' ) {
            todoList.push(data[i])
        }
        if (data[i].status === 'doing' ) {
            doingList.push(data[i])
        }
        if (data[i].status === 'done' ) {
            doneList.push(data[i])
        }
        // console.log(data[i].dealine);
    }
    
    // TOdolist
    $('.todo-list').html('')
    $('.doing-list').html('')
    $('.done-list').html('')
    $('.todobutton').html('')
    $('.doingbutton').html('')
    $('.donebutton').html('') 
    
    for (let i = 0; i < All.length; i++) { // all page homtodo
        console.log(79, All[i]);
        for (let k = 0; k < (5 > All[i].length ? All[i].length : 5); k++) {
            const div = `
             <tr class ='mov1'  style='${new Date(`${All[i][k].dealine}`) < new Date() ? 'color : red' : ''}'>
                <td>${All[i][k].name} </td>
                <td>${All[i][k].dealine} </td>
                <div class="">
                    <td> <button class=" update${All[i][k].status}${k}" onclick=test2() data-toggle="modal" data-target="#exampleModal">Up</button> </td>
                    <td> <button class="xoa${All[i][k].status}${k} "> X </button> </td>
                </div>
            </tr>
            ` 
            $(`.${All[i][k].status}-list`).append(div)  // add data , update, xoa

            $(`.update${All[i][k].status}${k}`).on('click', function(){ // page homtodo update
                console.log(All[i][k]);
                $('#name1').val(All[i][k].name)
                $('#dealine1').val(All[i][k].dealine)
                $('#status1').val(All[i][k].status)
            })
            $(`.xoa${All[i][k].status}${k}`).on('click', function(){ // hometodo xóa
                xoaWork(All[i][k])
            })
        }

        for (let j = 1; j <= Math.ceil(All[i].length / 5); j++) { // page homtodo
            let button = ` <button onclick="todopage(${j},${i}+1)">${j} </button> `
            $(`.${All[i][j].status}button`).append(button)
        }
        
    }
    
})
.catch(err =>{console.log(7, err);})
}

renderHome()

async function todopage(i, st){ 
    console.log(i, st);
    try {
        var statusName 
        if (st === 1) {// todo
            statusName = 'todo'
        }  
        if (st === 2) {// doing
            statusName = 'doing'
        }  
        if (st === 3) {// done
            statusName = 'done'
        }  
        if (statusName) {
            console.log(statusName);
            $(`.${statusName}-list`).html('')
            const data = await $.ajax({
                url: `/Todo/page/${i}/${statusName}`, 
                type: 'GET'
            })
            $(`.${statusName}-list`).html('')
            console.log(111,data);
            for (let j = 0; j < data.length; j++) {
                    const div = `
                    <tr class ='mov1'  style='${new Date(`${data[j].dealine}`) < new Date() ? 'color : red' : ''}'>
                        <td>${data[j].name} </td>
                        <td>${data[j].dealine} </td>
                        <div class="">
                            <td> <button class=" update${data[j].status}${j}" onclick=test2() data-toggle="modal" data-target="#exampleModal">Up</button> </td>
                            <td> <button class="xoa${data[j].status}${j} "> X </button> </td>
                        </div>
                    </tr>
                    ` 
                    $(`.${statusName}-list`).append(div) 
                    $(`.update${data[j].status}${j}`).on('click', function(){
                        console.log(data[j]);
                        $('#name1').val(data[j].name)
                        $('#dealine1').val(data[j].dealine)
                        $('#status1').val(data[j].status)
                    })
                    $(`.xoa${data[j].status}${j}`).on('click', function(){
                        xoaWork(data[j])
                    })
            }
            console.log(data);
            
        }
 
    } catch (error) {
        console.log(error);
    }
}


async function creatework(){
    try {
        var name1 = $('#name1').val();
        var status1 = $('#status1').val();
        var dealine1 = $('#dealine1').val();
        if(name1 !== '' && status1 !== '' && dealine1 !== ''){
            console.log({name: name1, status: status1, deadline: dealine1});
            var user = await $.ajax({
            url: 'http://localhost:4000/Todo/creatework',
            type: 'POST',
            data: {
                name: name1,
                dealine: dealine1,
                status : status1
                }
            })
            renderHome()
            console.log(user);
            $('#name1').val('')
            $('#deadline1').val('')
            $('.clo').trigger('click')
        }else{
            alert('Vui lòng nhập đủ thông tin')
        }
        
        // alert(`${mess}`)
        // render();
    } catch (error) {
        console.log(error);
    }
}


async function updateWork(){ // sửa dealine trên htmlL
    try {
        const name =  $('#name1').val()
        const dealine = $('#dealine1').val()
        const status = $('#status1').val()
        console.log(29,name, dealine, status);
        const data1 = await $.ajax({
        url: '/Todo/updateWork', 
        type: 'PUT',
        data: {
            name: name,
            dealine: dealine,
            status: status
            }
        })
        console.log(38, data1);
        $('#name1').val('')
        $('#deadline1').val('')
        $('.clo').trigger('click')
        renderHome()
    } catch (error) {
        console.log(40, error);
    }
}

async function xoaWork(a){ // sửa dealine trên htmlL
    try {
        const name =  a.name
        const data1 = await $.ajax({
        url: '/Todo/xoaWork', 
        type: 'DELETE',
        data: {
            name: name,
            }
        })
        console.log(38, data1);
        renderHome()
    } catch (error) {
        console.log(40, error);
    }
}
///
function test1(){
    $('#add').css('display', 'block')
    $('#update').css('display', 'none')
}
function test2(){
    $('#add').css('display', 'none')
    $('#update').css('display', 'block')
}


$('#add').on('click',function(){ // add thêm work
    creatework()
})

$('#update').on('click', function(){
    updateWork()
})


