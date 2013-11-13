console.log("Im ready");

// event listener added to edit button/link that will render an edit view for the snippet

$(document).ready(function(){

  //takes all buttons with class "seemorebuttons" and adds event listener "click"
  $('.see-more-button').on("click", function(){
    //takes "this" and finds closest parent with class "snippet" which then finds child with class "snippet-notes" and adds slide toggle
    $(this).closest('.snippet').find('.snippet-notes').slideToggle(200);
  });


$(".edit-button").on("click", function(){
  var $snippetBody = $(this).closest('.snippet').find('.snippet-body');
  $snippetBody.replaceWith($('<input type="textarea"></input>').attr("value", $snippetBody.html()));


})


});

// //function that is called on event listener for creating a student
// function studentCreator(e) {
//   e.preventDefault();
//   var $name = $("#form-name").val();
//   var $email = $("#form-email").val();
//   var $image = $("#form-image").val();
//   var newStudent = {student: {name: $name, email: $email, image_url: $image}};
//   $.ajax({
//     type: "POST",
//     url: "/students.json",
//     data: newStudent
//   }).done(function(response){
//     console.log(response);
//   })
// }




// var editText = $('<input>').attr("name")