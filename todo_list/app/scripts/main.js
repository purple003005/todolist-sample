

var App = {};
//localStorage.clear();
//init todo list data structure
App.init = function(){

  App.render();
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
  if (localStorage.getItem("todos") === null) {
    console.log("localhost= null")
    localStorage.setItem("todos","[]");
  }
  var temp = localData("","getItem");
  var obj = {val:str,onEdit:false};
  temp.push(obj);
  localData(temp,"setItem");
};

//remove
App.remove = function(index){
  var temp = localData("","getItem");
  temp.splice(index,1);
  localData(temp,"setItem");
};

//update
App.update = function(index, value, action){
  if(action=="edit") {
    valueObj = {val: value, onEdit: true};
  }else{
    valueObj = {val: value, onEdit: false};
  }
  var temp = localData("","getItem");
  temp.splice(index,1,valueObj);
  localData(temp,"setItem");
};

//render
App.render = function(){
  data = this.data;
  var htmlTxt = "";
  var JsonObj = localData("","getItem");
  if(localStorage.getItem("todos") != null){
    for (var i = 0; i < JsonObj.length; i++) {
      //add html string here
      var onEdit = JsonObj[i].onEdit;

      if (onEdit) {
        htmlTxt += "<li class='liteam edit'>．";
      } else {
        htmlTxt += "<li class='liteam add'>．";
      }
      htmlTxt += "<span class='spanteam'>" + JsonObj[i].val + "</span>";
      htmlTxt += "<input class='inputteam' type='text' value='" + JsonObj[i].val + "'/>";
      htmlTxt += "<button class='okteam' >OK</button>";
      htmlTxt += "<button class='cancelteam' >cancel</button>";
      htmlTxt += "<button class='editteam' >edit</button><button class='removeteam'>remove</button></li>";
    }
    $('ul').html(htmlTxt);
  }
};

function localData(obj,action){
  if(action==="getItem"){
    var tmp =JSON.parse(localStorage.getItem("todos"));
    return tmp;
  }else if (action=="setItem") {
    localStorage.setItem("todos",JSON.stringify(obj));
  }
}

App.init();

