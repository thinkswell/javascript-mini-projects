function displaySuccessToast(message) {
    iziToast.success({
        title: 'Success',
        message: message
    });
}

function displayErrorToast(message) {
    iziToast.error({
        title: 'Error',
        message: message
    });
}

function displayInfoToast(message) {
    iziToast.info({
        title: 'Info',
        message: message
    });
}

const API_BASE_URL = 'https://todo-app-csoc.herokuapp.com/';

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/login';
}

function registerFieldsAreValid(firstName, lastName, email, username, password) {
    if (firstName === '' || lastName === '' || email === '' || username === '' || password === '') {
        displayErrorToast("Please fill all the fields correctly.");
        return false;
    }
    if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
        displayErrorToast("Please enter a valid email address.")
        return false;
    }
    return true;
}

function register() {
    const firstName = document.getElementById('inputFirstName').value.trim();
    const lastName = document.getElementById('inputLastName').value.trim();
    const email = document.getElementById('inputEmail').value.trim();
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value;

    if (registerFieldsAreValid(firstName, lastName, email, username, password)) {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            name: firstName + " " + lastName,
            email: email,
            username: username,
            password: password
        }

        $.ajax({
            url: API_BASE_URL + 'auth/register/',
            method: 'POST',
            data: dataForApiRequest,
            success: function(data, status, xhr) {
                console.log(data);
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            },
            error: function(xhr, status, err) {
                displayErrorToast('An account using same email or username is already created');
            }
        })
    }
}

function login() {
    /***
     * @todo Complete this function.
     * @todo 1. Write code for form validation.
     * @todo 2. Fetch the auth token from backend and login the user.
     */
    const username = document.getElementById('inputUsername').value.trim();
    const password = document.getElementById('inputPassword').value;

    if (username != '' && password != '')  {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            username: username,
            password: password
        }

        $.ajax({
            url: API_BASE_URL + 'auth/login/',
            method: 'POST',
            data: dataForApiRequest,
            success: function(data, status, xhr) {
                localStorage.setItem('token', data.token);
                window.location.href = '/';
            },
            error: function(xhr, status, err) {
                displayErrorToast('Invalid username and password');
            }
        })
    }

}
let index=2;
function addTask() {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to add the task to the backend server.
     * @todo 2. Add the task in the dom.
     * 
     */
    const task = document.getElementById('inputTask').value.trim();

    if (task != '')  {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            title: task
        }

        $.ajax({
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
            
            url: API_BASE_URL + 'todo/create/',
            method: 'POST',
            data: dataForApiRequest,
            success: function(){
                document.getElementById('inputTask').value='';
                addSingleTask();
                displaySuccessToast('Task Added Successfully');
            },
            error: function(xhr, status, err) {
                displayErrorToast('Unable to add task, please try again.');
            }
        })
    }
    else
        displayErrorToast('Enter Something');
}

function editTask(id) {
    document.getElementById('task-' + id).classList.toggle('hideme');
    document.getElementById('task-actions-' + id).classList.toggle('hideme');
    document.getElementById('input-button-' + id).classList.toggle('hideme');
    document.getElementById('done-button-' + id).classList.toggle('hideme');
}

function deleteTask(id) {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to delete the task to the backend server.
     * @todo 2. Remove the task from the dom.
     */
        $.ajax({
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
            
            url: API_BASE_URL + 'todo/'+id+'/',
            method: 'DELETE',
            success: function(){
                $('#'+id).remove();
                displaySuccessToast('Task Removed Successfully');
            },
            error: function(xhr, status, err) {
                
                displayErrorToast('Task Not Found');
            }
        })
    }


function updateTask(id) {
    /**
     * @todo Complete this function.
     * @todo 1. Send the request to update the task to the backend server.
     * @todo 2. Update the task in the dom.
     */
    const newTask = document.getElementById(`input-button-${id}`).value.trim();
    const taskItem = document.getElementById("task-" + id);

    if (newTask != '')  {
        displayInfoToast("Please wait...");

        const dataForApiRequest = {
            title: newTask
        }

        $.ajax({
            headers: {
                Authorization: 'Token ' + localStorage.getItem('token'),
            },
            
            url: API_BASE_URL + 'todo/'+id+'/',
            method: 'PUT',
            data: dataForApiRequest,
            success: function(data){
                taskItem.textContent=data.title;
                editTask(data.id);
                displaySuccessToast('Task Updated');
            },
            error: function(xhr, status, err) {
                editTask(data.id);
            }
        })
    }
    else
        displayErrorToast('Enter New Task');
}
function addSingleTask(){
    $.ajax({
        headers: {
            Authorization: "Token " + localStorage.getItem("token"),
        },
        url: API_BASE_URL + "todo/",
        method: "GET",
        success: (data) => {
            $('.list-group').append(`<li class="list-group-item d-flex justify-content-between align-items-center" id="`+data[data.length-1].id+`">
            <input id="input-button-`+data[data.length-1].id+`" type="text" class="form-control todo-edit-task-input hideme" placeholder="Edit The Task">
            <div id="done-button-`+data[data.length-1].id+`"  class="input-group-append hideme">
                <button class="btn btn-outline-secondary todo-update-task" type="button" onclick="updateTask(`+data[data.length-1].id+`)">Done</button>
            </div>
            <div id="task-`+data[data.length-1].id+`" class="todo-task">
            `+data[data.length-1].title+`
            </div>

            <span id="task-actions-`+data[data.length-1].id+`">
                <button style="margin-right:5px;" type="button" onclick="editTask(`+data[data.length-1].id+`)"
                    class="btn btn-outline-warning">
                    <img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486663/CSOC/edit.png"
                        width="18px" height="20px">
                </button>
                <button type="button" class="btn btn-outline-danger" onclick="deleteTask(`+data[data.length-1].id+`)">
                    <img src="https://res.cloudinary.com/nishantwrp/image/upload/v1587486661/CSOC/delete.svg"
                        width="18px" height="22px">
                </button>
            </span>
    </li>`);
    document.getElementById(`input-button-${data[data.length-1].id}`).value=data[data.length-1].title;
        },
    });
}
