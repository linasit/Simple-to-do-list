var array = []
var arrCompleted = []

window.onload = function () { 
  
    if(arrCompleted == null)  arrCompleted = []  
    var date,html = ''    
    var object = {
        save: function(value){

            if(value) array.push({value,date})
            let str = JSON.stringify(array)
            localStorage.setItem('storage', str)
            location.reload()
        },
        get: function(){

            let str = localStorage.getItem('storage')
            array = JSON.parse(str)
            if(!array)  array = [] ; else  object.list()
        },
        list: function(){

            for(let i = 0; i< array.length; i++) {

                html += `<div class='todo' id='${i}'>
                <div class='wrapHTML'><span class='dateHTML'>
                ${array[i].date}</span><span class='valueHTML'>${array[i].value}</span></div>
                <i class="fas fa-check" onclick='checkIndex(${i})'></i>               
                </div>`
                document.getElementById('list').innerHTML = html
            }
        },
        counter: function() {

            let tasks = array.length
            let ftasks = arrCompleted.length
            let alltasks = tasks + ftasks
            let percentage = (100*tasks) / alltasks
            let fpercentage = (100*ftasks) / alltasks
            document.getElementById('mainTask').innerHTML = `${tasks}/${alltasks} (${percentage} %)`
            document.getElementById('footerTask').innerHTML = `${ftasks}/${alltasks} (${fpercentage} %)`
        }
    }
    object.get()
    object.counter()
    document.getElementById('add').onchange = function() {

        (function(getdate) {
 
            let mm = getdate.getMonth()
            let dd = getdate.getDate()
            let yy = getdate.getFullYear() 
            
            switch(mm) {
                case 0 : mm = 'Jan' ; break
                case 1 : mm = 'Feb' ; break
                case 2 : mm = 'Mar' ; break
                case 3 : mm = 'Apr' ; break
                case 4 : mm = 'May' ; break
                case 5 : mm = 'Jun' ; break
                case 6 : mm = 'Jul' ; break
                case 7 : mm = 'Aug' ; break
                case 8 : mm = 'Sep' ; break
                case 9 : mm = 'Oct' ; break
                case 10 : mm = 'Nov'; break
                case 11 : mm = 'Dec'; break
            }
            date = mm + ' ' + dd + ' ' +yy   
        })(new Date()) 
    object.save(this.value) 
    }
}
function checkIndex(index) {

    let val = array[index].value
    document.getElementById(index).style.display = 'none'

    if(!arrCompleted) localStorage.setItem('completed',JSON.stringify([]))
    arrCompleted = JSON.parse(localStorage.getItem('completed'))
    arrCompleted.push(val)  
    localStorage.setItem('completed', JSON.stringify(arrCompleted))

    array.splice(index,1)
    localStorage.setItem('storage', JSON.stringify(array))
    location.reload()
}
function displayCompleted() {

    arrCompleted = JSON.parse(localStorage.getItem('completed'))

    for(let i = 0; i< arrCompleted.length; i++) {

        document.getElementById('result').innerHTML += `<p class='footp'>${arrCompleted[i]} </p>`
    }
}
displayCompleted()