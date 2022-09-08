// document.write("hello")
var headingnode = document.getElementById("heading");
console.log(headingnode);

// var postApi = "https://jsonplaceholder.typicode.com/posts"

// fetch(postApi)
//     .then(function(response){
//         return response.json();
//     })
//     .then(function(posts){
//         var htmls = posts.map(function(post){
//             return `<li>
//                 <h2>${post.title}</h2>
//                 <p>${post.body}</p>
//             </li>`
//         })
//         var html = htmls.join("");
//         document.getElementById("post-block").innerHTML=html;
//     })


var listCoursesBlock = document.getElementById("list_course")

var courseApi = "http://localhost:3000/courses"

function start(){
    getCourses(renderCourses);
    handleCreate();
}

start();

//function
function getCourses(callback){
    fetch(courseApi)
        .then(function(response){
            return response.json();
        })
        .then(callback);
}

function createCourse(data, callback){
    var options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(courseApi,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}

function handleDeleteCourse(id){
    var options = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    };

    fetch(courseApi + '/' + id,options)
        .then(function(response){
            return response.json();
        })
        .then(function(){
            var delcourse = document.querySelector('.course-id-'+id);
            if (delcourse) {
                delcourse.remove();
            }
        })
}

function updateCourse(data){
    var options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    fetch(courseApi,options)
        .then(function(response){
            return response.json();
        })
        .then(callback)
}



function renderCourses(courses){
    var htmls = courses.map(function(courses){
        return `
            <li class = "course-id-${courses.id}">
                <h4>${courses.name}</h4>
                <p>${courses.description}</p>
                <button onclick = "handleDeleteCourse(${courses.id})">Xoá</button>
                <button onclick = "handleUpdateCourse(${courses.id})">Sửa</button>
            </li>
        `;
    })
    listCoursesBlock.innerHTML = htmls.join('');
}

function handleCreate(){
    var createbtn = document.querySelector('#create_course');
    createbtn.onclick=function(){
        var name = document.querySelector('input[name = "name"]').value;
        var description = document.querySelector('input[name = "description"]').value;
        var data = {
            name: name,
            description: description
        }
        createCourse(data, ()=> {getCourses(renderCourses)});
    }
}

function handleUpdateCourse(id){
    var updatebtn = document.querySelector('#update_course');
    updatebtn.onclick=function(){
        var name = document.querySelector('input[name = "name"]').value;
        var description = document.querySelector('input[name = "description"]').value;
        var data = {
            name: name,
            description: description,
            id: id
        }
        updateCourse(data, ()=> {getCourses(renderCourses)});
    }
}
