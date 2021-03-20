$('#upLoad2').on('click','.AppComment',function () {
  var div = '    <div class="form-row">\n' +
      '      <div class="form-group col-md-3 d-md-none">\n' +
      '        <label for="appid_backup1">appid</label>\n' +
      '        <input type="text" class="form-control appid_backup" id="appid_backup1" name="appid" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-2 d-md-none">\n' +
      '        <label for="language_backup1">language</label>\n' +
      '        <select id="language_backup1"  name="language" required="required" class="form-control language_backup">\n' +
      '          <option selected>0</option>\n' +
      '          <option>1</option>\n' +
      '        </select>\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-3">\n' +
      '        <label for="username">username</label>\n' +
      '        <input type="text" class="form-control" id="username" name="username" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-8">\n' +
      '        <label for="content1">content</label>\n' +
      '        <textarea class="form-control" id="content1" name="content" required minlength="1" rows="3"></textarea>\n' +
      '        <div class="deleteBtn"><span class="btn btn-secondary createBtn"><img src="/public/images/minus.svg" height="16" alt=""> Delete</span></div>\n' +
      '      </div>\n' +
      '<div class="form-group col-md-12">\n' +
      '        <hr>\n' +
      '      </div>' +
      '    </div>\n';
  $('#upLoad2').append(div);
  $('.appid_backup').val($('#appid').val());
  $('.language_backup').val($('#language').val());
  // document.querySelectorAll('.language_backup').forEach(function (el) {
  //   el.value = $('#language_backup').val()
  // });
  // document.querySelectorAll('.appid').forEach(function (el) {
  //   el.value = $('#appid').val()
  // });
});

$('#upLoad3').on('click','.AppFeature',function () {
  var div = '<div class="form-row">\n' +
      '      <div class="form-group col-md-3 d-md-none">\n' +
      '        <label for="appid_backup2">appid</label>\n' +
      '        <input type="text" class="form-control appid_backup" id="appid_backup2" name="appid" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-2 d-md-none">\n' +
      '        <label for="language_backup2">language</label>\n' +
      '        <select id="language_backup2"  name="language" required="required" class="form-control language_backup">\n' +
      '          <option selected>0</option>\n' +
      '          <option>1</option>\n' +
      '        </select>\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-6 was-validated">\n' +
      '        <label for="title2">title</label>\n' +
      '        <input type="text" class="form-control" id="title2" name="title" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-2">\n' +
      '        <label for="feature_icon_url">feature_icon_url</label><br>\n' +
      '        <input type="file" id="feature_icon_url" name="feature_icon_url" accept="image/jpg,image/jpeg,image/png,image/gif" onchange="uploadUrl(this,\'/public/img/AppFeature/\')">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-4">\n' +
      '       <label>feature_icon_url_path</label>\n' +
      '       <input type="text" class="form-control feature_icon_url_path" id="feature_icon_url" name="feature_icon_url">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-11 was-validated">\n' +
      '        <label for="description2">description</label>\n' +
      '        <textarea class="form-control" id="description2" name="description" rows="3" required minlength="1"></textarea>\n' +
      '        <div class="deleteBtn"><span class="btn btn-secondary createBtn"><img src="/public/images/minus.svg" height="16" alt=""> Delete</span></div>\n' +
      '      </div>\n' +
      '     <div class="form-group col-md-12">\n' +
      '        <hr>\n' +
      '      </div>' +
      '    </div>';
  $('#upLoad3').append(div);
  $('.appid_backup').val($('#appid').val());
  $('.language_backup').val($('#language').val());
});

$('#upLoad4').on('click','.Blog',function () {
  var div = '<div class="form-row">\n' +
      '      <div class="form-group col-md-3 d-md-none">\n' +
      '        <label for="appid_backup3">appid</label>\n' +
      '        <input type="text" class="form-control appid_backup" id="appid_backup3" name="appid" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-2 d-md-none">\n' +
      '        <label for="language_backup3">language</label>\n' +
      '        <select id="language_backup3" name="language" required="required" class="form-control language_backup">\n' +
      '          <option selected>0</option>\n' +
      '          <option>1</option>\n' +
      '        </select>\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-6 was-validated">\n' +
      '        <label for="title3">title</label>\n' +
      '        <input type="text" class="form-control" id="title3" name="title" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-2">\n' +
      '        <label for="sex">sex: 0-male, 1-female</label>\n' +
      '        <select id="sex"  name="sex" required="required" class="form-control">\n' +
      '          <option selected>0</option>\n' +
      '          <option>1</option>\n' +
      '        </select>\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-11 was-validated">\n' +
      '        <label for="content2">content</label>\n' +
      '        <input type="text" class="form-control" id="content2" name="content" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-3 was-validated">\n' +
      '        <label for="creator">creator</label>\n' +
      '        <input type="text" class="form-control" id="creator" name="creator" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-3 was-validated">\n' +
      '        <label for="tags">tags</label>\n' +
      '        <input type="text" class="form-control" id="tags" name="tags" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-2">\n' +
      '        <label for="thumbnail_url">thumbnail_url</label><br>\n' +
      '        <input type="file" id="thumbnail_url" name="thumbnail_url" accept="image/jpg,image/jpeg,image/png,image/gif" onchange="uploadUrl(this,\'/public/img/Blog/\')">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-4">\n' +
      '       <label>thumbnail_url_path</label>\n' +
      '       <input type="text" class="form-control thumbnail_url_path" id="thumbnail_url" name="thumbnail_url">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-11 was-validated">\n' +
      '        <label for="description3">description</label>\n' +
      '        <textarea class="form-control" id="description3" name="description" rows="3" required minlength="1"></textarea>\n' +
      '        <div class="deleteBtn"><span class="btn btn-secondary createBtn"><img src="/public/images/minus.svg" height="16" alt=""> Delete</span></div>\n' +
      '      </div>\n' +
      '<div class="form-group col-md-12">\n' +
      '      </div>' +
      '<div class="form-group col-md-12">\n' +
      '        <hr>\n' +
      '      </div>' +
      '    </div>';
  $('#upLoad4').append(div);
  $('.appid_backup').val($('#appid').val());
  $('.language_backup').val($('#language').val());
});

$('#upLoad5').on('click','.FAQ',function () {
  var div = '<div class="form-row">\n' +
      '      <div class="form-group col-md-3 d-md-none">\n' +
      '        <label for="appid_backup4">appid</label>\n' +
      '        <input type="text" class="form-control appid_backup" id="appid_backup4" name="appid" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-2 d-md-none">\n' +
      '        <label for="language_backup4">language</label>\n' +
      '        <select id="language_backup4"  name="language" required="required" class="form-control language_backup">\n' +
      '          <option selected>0</option>\n' +
      '          <option>1</option>\n' +
      '        </select>\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-11">\n' +
      '        <label for="question">question</label>\n' +
      '        <input type="text" class="form-control" id="question" name="question" required minlength="1">\n' +
      '      </div>\n' +
      '      <div class="form-group col-md-11">\n' +
      '        <label for="answer">answer</label>\n' +
      '        <textarea class="form-control" id="answer" name="answer" rows="3" required minlength="1"></textarea>\n' +
      '        <div class="deleteBtn"><span class="btn btn-secondary createBtn"><img src="/public/images/minus.svg" height="16" alt=""> Delete</span></div>\n' +
      '      </div>\n' +
      '<div class="form-group col-md-12">\n' +
      '        <hr>\n' +
      '      </div>' +
      '    </div>';
  $('#upLoad5').append(div);
  $('.appid_backup').val($('#appid').val());
  $('.language_backup').val($('#language').val());
});

$('body').on('click','.deleteBtn',function () {
  $(this).parent().parent().remove()
});
