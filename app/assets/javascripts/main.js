console.log("I'm ready");

// event listener added to edit button/link that will render an edit view for the snippet

$(document).ready(function(){

  var editButton = true;
  var $target;
  var snippet_id;

  $('#snippets-container').isotope({
  itemSelector: '.snippet',
  masonry: {
    gutterWidth: 10,
    columnWidth: 270,
    rowHeight: 360
  }});


  //converts the snippet, notes, and tag of the snippets into text area, allowing for edits
  $(".edit-button").on("click", function(e){
      //establishes target on the event listener to the closest element with class of snippet
      if (editButton)
        {$target = $(e.target).closest('.snippet');
        //captures the id attribute of the target
        snippet_id = $target.attr('id');
        //finds the body/text of the snippet
        var $snippetBody = $(this).closest('.snippet').find('.snippet-body');
        //changes the notes and snippt paragraphs to editable text area
        $snippetBody.replaceWith($('<textarea>' + $snippetBody.html() + '</textarea>').attr("id", "body-"+snippet_id));
        //grabs the snippet-notes element and sets it to a variable
        var $snippetNotes = $(this).closest('.snippet').find('.snippet-notes-text');
        //change the snippets notes to a text area
        $snippetNotes.replaceWith($('<textarea>' + $snippetNotes.html() + '</textarea>').attr("id", "notes-"+snippet_id));
        //apends the button to the snippet div
        $(this).closest('.snippet').append($("<button class ='btn btn-secondary edit-snippet-button'>").html("Submit Edits"));
        editButton = false;}
        else
        {
          var $snippetBody = $(this).closest('.snippet').find('#body-'+ snippet_id);
          var $snippetNotes = $(this).closest('.snippet').find('#notes-' + snippet_id);
          $("#body-"+snippet_id).replaceWith($("<p class = 'snippet-body'>" + $snippetBody.html() + "</p>").attr("id", "body-"+snippet_id));
          $("#notes-"+snippet_id).replaceWith($("<p class = 'snippet-notes-text'>" + $snippetNotes.html() + "</p>").attr("id","notes"+snippet_id));
          $(".edit-snippet-button").remove();
          editButton = true;
        }

      });

$(".snippet").on("click", ".edit-snippet-button", function(e){
  e.preventDefault();
      //establishes target on the event listener to the closest element with class of snippet
      $target = $(e.target).closest('.snippet');
      snippet_id = $target.attr('id');
      var editedSnippet = $("#body-"+snippet_id).val();
      var editedNotes = $("#notes-"+snippet_id).val();
      var snippetUpdate = {snippet: {notes: editedNotes, body: editedSnippet}}
      $.ajax({
        type: "PUT",
        url: "/snippets/"+ snippet_id,
        data: snippetUpdate,
        dataType: "json"
      }).done(function(response){
        console.log(response);
        $("#body-"+snippet_id).replaceWith($("<p class = 'snippet-body'>" + response.body + "</p>").attr("id", "body-"+snippet_id));
        $("#notes-"+snippet_id).replaceWith($("<p class = 'snippet-notes-text'>" + response.notes + "</p>").attr("id","notes"+snippet_id));
        $(".edit-snippet-button").remove();
      });
    });

$('.snippet').on("click", function(e){
  e.preventDefault();
  var isAnchor = $(e.target).is("a");
  if (isAnchor){
    var href = $(e.target).prop('href');
    window.location = href;
  }
});

//Event Listeners
  $(".delete-button").on("click", deleteSnippet);
  $("#new-snippet-button").on("click", addSnippet);

}); //------ends the document onload----------


function deleteSnippet(e) {
  $target = $(e.target).closest('.snippet-modal');
  snippet_id = $target.attr('id')
  $.ajax({
    type: "DELETE",
    url: "/snippets/"+ snippet_id,
    dataType: "json"
  }).done(function(){
    $("#"+snippet_id).remove();
    $("#snippetModal-"+ snippet_id).modal('hide');
    $("#snippet-div-" + snippet_id).remove();
  })
}; //------ends delete event function------

function addSnippet(e){
  e.preventDefault();
  var newBody = $("#new-body").val();
  var newSource = $("#new-source").val();
  var newNotes = $("#new-notes").val();
  var newTags = $("#new-tags").val();
  var snippetNew = {snippet: {notes: newNotes, body: newBody, source: newSource, tag_list: newTags}};
  $.ajax({
    type: "POST",
    url: "/snippets/",
    data: snippetNew,
    dataType: "json"
  }).done(function(response) {
    $('#myModal').modal('hide');
    location.reload();
       //isotope addItem to page
       // call an isotope thing that updates the page
      // where the response appends to the body of the site.
    });
};//--------end of add snippet function-------






