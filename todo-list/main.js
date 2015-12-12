var App = {};
//init todo list data structure
App.init = function(){
  this.data = [];
};

$("#addbtn").click(function() {

  var txtAdd = $("#txtAdd").val();
  var runAdd = false;
  if (txtAdd == ""){
    $("#txtAdd").attr("class","empty")
  }else{
    runAdd = true;
    $("#txtAdd").attr("class","spanteam")
    $("#txtAdd").val("");
  }
   if(runAdd) {
     App.add(txtAdd);
     App.render("add");
  }
  $(".liteam").attr("class","liteam add");
});

$(document).on("click", ".removeteam", function () {
  console.log('removeteam click');
  var index = $(this).parent().index();
  App.remove(index);
  App.render();
  $(".liteam").attr("class","liteam add");
});

$(document).on("click", ".editteam", function () {
  $(this).parent().attr("class","liteam edit");
});

$(document).on("click", ".okteam", function () {
  var index = $(this).parent().index();
  var newVal = $(this).siblings("input").val();
  App.update(index,newVal);
  App.render();
  $(".liteam").attr("class","liteam add");
  $(this).parent().attr("class","liteam add");
})

$(document).on("click", ".cancelteam", function () {
  $(this).parent().attr("class","liteam add");
})

//Add function to add list
App.add = function(str){
  this.data.push(str);
};

//remove
App.remove = function(index){
  this.data.splice(index, 1);
};
//update
App.update = function(index, value){
  this.data.splice(index, 1, value);
};
//render
App.render = function(action){
  data = this.data;
  var htmlTxt = "";

  for(var i=0; i<data.length; i++){
    //add html string here
    //if(action=="add"){
      console.log("adddd");
      htmlTxt += "<li class='liteam'>．";
      htmlTxt += "<span class='spanteam'>" + data[i] + "</span>"
      htmlTxt += "<input class='inputteam' type='text' value=' " + data[i] + "' '/>"
      htmlTxt += "<button class='okteam' >OK</button>"
      htmlTxt += "<button class='cancelteam' >cancel</button>"
      htmlTxt += "<button class='editteam' >edit</button><button class='removeteam'>remove</button></li>"
   // }else if(action=="edit"){
      //htmlTxt += "<span class='spanteam'>" + data[i] + "</span>"
    //}

  }
  $('ul').html(htmlTxt);
};
App.init();

