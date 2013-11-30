$(document).ready(function(){

  $('#snippets-container').isotope({
    itemSelector: '.snippet',
    masonry: { gutterWidth: 10, columnWidth: 270, rowHeight: 360 }
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
  $(".edit-button").on("click", editSnippet);

}); //------ ends the document onload ------

var editButton = true;
var $target;
var $snippetBody;
var $snippetNotes;
var snippet_id;

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
}; //------ ends delete event function ------

function addSnippet(){
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
};//------ end of add snippet function ------

function editSnippet(e){
  if (editButton){
    $target = $(e.target).closest('.snippet-modal');
    snippet_id = $target.attr('id');
    $snippetBody = $("#modal-body-"+snippet_id);
    $snippetNotes = $("#notes-"+snippet_id);
    $snippetBody.replaceWith($('<textarea>' + $snippetBody.html() + '</textarea>').attr("id", "modal-body-"+snippet_id));
    $snippetNotes.replaceWith($('<textarea>' + $snippetNotes.html() + '</textarea>').attr("id", "notes-"+snippet_id));
    $target.append($("<button class ='btn btn-secondary' id='edit-snippet-button'>").html("Submit Edit"));
    editButton = false;
    $("#edit-snippet-button").on("click", updateSnippet);
  }else{
    $snippetBody = $("#modal-body-"+snippet_id);
    $snippetNotes = $("#notes-"+snippet_id);
    $snippetBody.replaceWith($("<p class = 'snippet-body'>" + $snippetBody.html() + "</p>").attr("id", "modal-body-"+snippet_id));
    $snippetNotes.replaceWith($("<p class = 'snippet-notes-text'>" + $snippetNotes.html() + "</p>").attr("id","notes-"+snippet_id));
    $("#edit-snippet-button").remove();
    editButton = true;
  }
};//------ end of edit snippet function ------

function updateSnippet(e){
  var editedSnippet = $("#modal-body-"+snippet_id).val();
  var editedNotes = $("#notes-"+snippet_id).val();
  var snippetUpdate = {snippet: {notes: editedNotes, body: editedSnippet}}
  $.ajax({
    type: "PUT",
    url: "/snippets/"+ snippet_id,
    data: snippetUpdate,
    dataType: "json"
  }).done(function(response){
    console.log(response);
    $("#modal-body-"+snippet_id).replaceWith($("<p class = 'snippet-body'>" + response.body + "</p>").attr("id", "modal-body-"+snippet_id));
    $("#notes-"+snippet_id).replaceWith($("<p class = 'snippet-notes-text'>" + response.notes + "</p>").attr("id","notes-"+snippet_id));
    $("#edit-snippet-button").remove();
    $('#myModal').modal('hide');
    location.reload();
  });
};//------ end of update snippet function ------





