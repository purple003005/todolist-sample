var App = {};
//init todo list data structure
App.init = function(){
  this.data = [];
  //event binding
  $("#addbtn").click(function() {
    var txtAdd = $("#txtAdd").val();
    var runAdd = false;
    if (txtAdd === ""){
      $("#txtAdd").attr("class","empty");
    }else{
      runAdd = true;
      $("#txtAdd").attr("class","spanteam");
      $("#txtAdd").val("");
    }
    if(runAdd) {
      App.add(txtAdd);
      App.render();
    }
  });

  $(document).on("click", ".removeteam", function () {
    var index = $(this).parent().index();
    App.remove(index);
    App.render();
  });

  $(document).on("click", ".editteam", function () {
    $(this).parent().attr("class","liteam edit");
    var index = $(this).parent().index();
    var newVal = $(this).siblings("input").val();
    App.update(index,newVal,"edit");
  });

  $(document).on("click", ".okteam", function () {
    var index = $(this).parent().index();
    var newVal = $(this).siblings("input").val();
    App.update(index,newVal,"ok");
    App.render();
  });

  $(document).on("click", ".cancelteam", function () {
    //$(this).parent().attr("class","liteam add");
    var index = $(this).parent().index();
    var newVal = $(this).siblings("input").val();
    App.update(index,newVal,"cencel");
    App.render();
  });

};


//Add function to add list
App.add = function(str){
  this.data.push({val:str,onEdit:false});
};

//remove
App.remove = function(index){
  this.data.splice(index, 1);
};
//update
App.update = function(index, value, action){
  if(action=="edit") {
    valueObj = {val: value, onEdit: true};
  }else{
    valueObj = {val: value, onEdit: false};
  }
  this.data.splice(index, 1, valueObj);
};
//render
App.render = function(){
  data = this.data;
  var htmlTxt = "";

  for(var i=0; i<data.length; i++){
    //add html string here
    var onEdit = data[i].onEdit;

    if(onEdit){
      htmlTxt += "<li class='liteam edit'>．";
    }else{
      htmlTxt += "<li class='liteam add'>．";
    }
    htmlTxt += "<span class='spanteam'>" + data[i].val + "</span>";
    htmlTxt += "<input class='inputteam' type='text' value='" + data[i].val + "'/>";
    htmlTxt += "<button class='okteam' >OK</button>";
    htmlTxt += "<button class='cancelteam' >cancel</button>";
    htmlTxt += "<button class='editteam' >edit</button><button class='removeteam'>remove</button></li>";
  }

  $('ul').html(htmlTxt);
};



App.init();

