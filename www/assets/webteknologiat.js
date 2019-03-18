/**
 * Author: Kim Lehtinen <kim.lehtinen@student.uwasa.fi>
 */

$(document).ready(function() {
    initCreatePost();
    initRegister();
    initLogin();
    categoryTabs();
});

function initListPosts() {
    //
}

function initCreatePost() {
    $('#create-post-form').submit(function(e) {
        e.preventDefault();
        $('#create-post-form-spinner').show();
        var formData = new FormData(this);
        $.ajax({
            type: 'POST',
            data: formData,
            url: 'Controllers/Post/CreatePost.php',
            processData: false,
            contentType: false,
            success: function(data){
              if (data === 'true') {
                $('#create-post-form-spinner').hide();
                $('#alert-create-post-success > strong').html('Lisätty!');
                $('#alert-create-post-success').show();
                $('#create-post-form')[0].reset();
              } else {
                $('#create-post-form-spinner').hide();
                $('#alert-create-post-failed > strong').html('Lisääminen epäonnistui');
                $('#alert-create-post-failed').show();
              }
            },
            error: function (request, status, error) {
                $('#create-post-form-spinner').hide();
                $('#alert-create-post-failed > strong').html('Lisääminen epäonnistui');
                $('#alert-create-post-failed').show();
                console.log(request.responseText);
            }
        });
    });
}

function initRegister() {
    $('#register-form').submit(function(e) {
        e.preventDefault();
        $('#register-form-spinner').show();
        var formData = getFormDataObject('register-form');
        $.ajax({
            type: 'POST',
            data: {
                username: formData['username'],
                password: formData['password']
            },
            url: 'register.php',
            success: function(data){
              if (data === 'true') {
                $('#register-form-spinner').hide();
                $('#alert-register-success > strong').html('Kiitos! Voit nyt kirjautua sisään.');
                $('#alert-register-success').show();
                $('#register-form')[0].reset();
              } else {
                $('#register-form-spinner').hide();
                $('#alert-register-failed > strong').html('Rekisteröityminen epäonnistui');
                $('#alert-register-failed').show();
              }
            },
            error: function (request, status, error) {
                $('#register-form-spinner').hide();
                $('#alert-register-failed > strong').html('Rekisteröityminen epäonnistui');
                $('#alert-register-failed').show();
                console.log(request.responseText);
            }
        });
    });
}

function initLogin() {
    $('#login-form').submit(function(e) {
        e.preventDefault();
        var formData = getFormDataObject('login-form');
        $.ajax({
            type: 'POST',
            data: {
                username: formData['username'],
                password: formData['password']
            },
            url: 'login.php',
            success: function(data){
                if (data === 'true') {
                    window.location = '/';
                }
                else {
                $('#alert-login-failed > strong').html('Sisäänkirjautuminen epäonnistui. Tarkista käyttäjätunnus tai salasana.');
                $('#alert-login-failed').show();
                }
            },
            error: function (request, status, error) {
                $('#alert-register-failed > strong').html('Sisäänkirjautuminen epäonnistui. Tarkista käyttäjätunnus tai salasana.');
                $('#alert-register-failed').show();
                console.log(request.responseText);
            }
        });
    });
}

function getFormDataObject(formID) {
    var dataArr = $('#' + formID).serializeArray(),
    dataObj = {};
    
    $(dataArr).each(function(i, field){
        dataObj[field.name] = field.value;
    });
    
    return dataObj;
}
