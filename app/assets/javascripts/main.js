console.log("Im ready");

// event listener added to edit button/link that will render an edit view for the snippet

$(document).ready(function(){
  //on document load, the .each will apply a click event listner allowing for toggle slide for notes div
  $('.see-more-button').on("click", function(e){
    console.log(e.target);
    var buttonId = e.target.id;
    var content = $(this).closest('.snippet').children().last();
      $("#" + buttonId + "").on("click", function(e) {
        e.preventDefault();
      $(content).slideToggle(200);
    });

  })


})

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