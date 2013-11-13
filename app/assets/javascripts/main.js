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
      $snippetBody.replaceWith($('<textarea>' + $snippetBody.html() + '</textarea>'));
      var $snippetNotes = $(this).closest('.snippet').find('.snippet-notes');
      $snippetNaotes.replaceWith($('<textarea>' + $snippetNotes.html() + '</textarea>'));
  });

    $(".delete-button").on("click", function(e){
      e.preventDefault();
      var $target = $(e.target).closest('.snippet');
      var snippet_id = $target.attr('id')
      $.ajax({
      type: "DELETE",
      url: "/snippets/"+ snippet_id,
      dataType: "json"
      }).done(function(){
        $("#"+snippet_id).remove();
      })
    });

  // resizeIt = function(input) {
  //     var str = $(input).value;
  //     var cols = $(input).cols;

  //     var linecount = 0;
  //     $A(str.split("\n")).each( function(l) {
  //       linecount += Math.ceil( l.length / cols ); // take into account long lines
  //     } )
  //     $(input).rows = linecount + 1;
  //   };

  // function resizeTextArea (input) {
  //   input.height(input.scrollHeight);
  // }



});
