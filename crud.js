let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let creat = document.getElementById('creat');

let mood = 'create';
let temp;

    function getotal(){
    if(price.value !=''){
        let result =(+price.value + +taxes.value + +ads.value)
        - discount.value;
        total.innerHTML=result;
        total.style.background='green';
    }    
    else{
        total.innerHTML='';
        total.style.background='rgb(173, 13, 13)';
    }

    }
    // create

    let data;

    if(localStorage.product != null){
        data=JSON.parse(localStorage.product)
    }
    else{
        data=[];
    }

    creat.onclick=function(){
        let obj = {
            title:title.value.toUpperCase(),
            price:price.value,
            taxes:taxes.value,
            ads:ads.value,
            discount:discount.value,
            total:total.innerHTML,
            count:count.value,
            category:category.value.toUpperCase()
        }

        if(title.value != '' && price.value != ''
        && category.value != '' && obj.count < 101){
            if(mood === 'create'){
                if(obj.count > 1){
                    for(let i = 0 ; i < obj.count ; i++){
                        data.push(obj);
                    }
                }
                else{
                    data.push(obj);
                }
            }
            else{
                data[temp] = obj;
                mood = 'create';
                creat.innerHTML = 'create';
                count.style.display = 'block';
            }
            clear();
        }

        //save in local
        localStorage.setItem('product',JSON.stringify(data));
        show();
    }

    //clear

    function clear(){
        title.value='';
        price.value='';
        taxes.value='';
        ads.value='';
        discount.value='';
        total.innerHTML='';
        count.value='';
        category.value='';

    }

    // read

    function show(){
        getotal();
        let table ='';
        for(let i = 0; i< data.length; i++){
            table += `
            <tr>
            <td>${i+1}</td>
            <td>${data[i].title}</td>
            <td>${data[i].price}</td>
            <td>${data[i].taxes}</td>
            <td>${data[i].ads}</td>
            <td>${data[i].discount}</td>
            <td>${data[i].total}</td>
            <td>${data[i].category}</td>

            <td><button onclick ="update(${i})" id="update">update</button></td>
            <td><button onclick ="del(${i})" id="delete">delete</button></td>
            </tr>
            `
        }

        document.getElementById('t-body')
        .innerHTML = table;

        let btn_del = document.getElementById('del-all');

        if (data.length > 0){
            btn_del.innerHTML = `
            <button onclick ="del_All()">delete all (${data.length})</button>
            `
        }
        else{
            btn_del.innerHTML = '';
        }
    }
    show();

    //delete one

    function del(i){

        data.splice(i,1);
        localStorage.product = JSON.stringify(data);
        show();

    }

    //delete all

    function del_All(){
        localStorage.clear();
        data.splice(0);
        show();
    }

    //update

    function update(i){

        title.value = data[i].title;
        price.value = data[i].price;
        taxes.value = data[i].taxes;
        ads.value = data[i].ads;
        discount.value = data[i].discount;
        category.value = data[i].category;

        getotal();
        creat.innerHTML = 'Update'
        count.style.display = 'none';
        mood = 'update';
        temp = i;
        scroll({
            top: 0,
            behavior:'smooth',
            
        })

    }

    //search

    let srch_t = 'title';
    function srch(id){

        let srch_box = document.getElementById('search');
        if (id == 'srch_title'){
            srch_t = 'title';
        }
        else{
            srch_t = 'category'
        }
        srch_box.placeholder = 'search by ' + srch_t;
        srch_box.focus();
        srch_box.value = '';
        showdata();
    }

    function srch_data(value){
        let table = '';
        for(let i = 0 ; i < data.length ; i++){

            if(srch_t == 'title'){
                if(data[i].title.includes(value.toUpperCase())){
                    table += `
                    <tr>
                    <td>${i+1}</td>
                    <td>${data[i].title}</td>
                    <td>${data[i].price}</td>
                    <td>${data[i].taxes}</td>
                    <td>${data[i].ads}</td>
                    <td>${data[i].discount}</td>
                    <td>${data[i].total}</td>
                    <td>${data[i].category}</td>

                    <td><button onclick ="update(${i})" id="update">update</button></td>
                    <td><button onclick ="del(${i})" id="delete">delete</button></td>
                    </tr>
                    `
                    

                }
            }
            else{
           
                if(data[i].category.includes(value.toUpperCase())){
                        table += `
                        <tr>
                        <td>${i+1}</td>
                        <td>${data[i].title}</td>
                        <td>${data[i].price}</td>
                        <td>${data[i].taxes}</td>
                        <td>${data[i].ads}</td>
                        <td>${data[i].discount}</td>
                        <td>${data[i].total}</td>
                        <td>${data[i].category}</td>
    
                        <td><button onclick ="update(${i})" id="update">update</button></td>
                        <td><button onclick ="del(${i})" id="delete">delete</button></td>
                        </tr>
                        `
                        
    
                }
               
            }
        }

        document.getElementById('t-body')
        .innerHTML = table;
    }

    //clean data


 
    
