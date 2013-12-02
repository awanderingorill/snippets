$(document).ready(function(){

  $('#snippets-container').isotope({
    itemSelector: '.snippet',
    masonry: { gutterWidth: 10, columnWidth: 270, rowHeight: 360 }
  });

  // $('.snippet').on("click", function(e){
  //   e.preventDefault();
  //   var isAnchor = $(e.target).is("a");
  //   if (isAnchor){
  //     var href = $(e.target).prop('href');
  //     window.location = href;
  //   }
  // });

  //Event Listeners
  $(".snippet").on("click", appendInfo);
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
  $.ajax({
    type: "DELETE",
    url: "/snippets/"+ snippet_id,
    dataType: "json"
  }).done(function(){
    $("#"+snippet_id).remove();
    $("#snippetModal").modal('hide');
  });
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
    $snippetBody = $("#modal-snippet-body");
    $snippetNotes = $("#modal-snippet-notes");
    $snippetBody.replaceWith($('<textarea>' + $snippetBody.html() + '</textarea>').attr("id", "modal-snippet-body"));
    $snippetNotes.replaceWith($('<textarea>' + $snippetNotes.html() + '</textarea>').attr("id", "modal-snippet-notes"));
    $('#snippet-modal').append($("<button class ='btn btn-secondary' id='edit-snippet-button'>").html("Submit Edit"));
    editButton = false;
    $("#edit-snippet-button").on("click", updateSnippet);
  }else{
    $snippetBody = $("#modal-snippet-body");
    $snippetNotes = $("#modal-snippet-notes");
    $snippetBody.replaceWith($("<p>" + $snippetBody.html() + "</p>").attr("id", "modal-snippet-body"));
    $snippetNotes.replaceWith($("<p>" + $snippetNotes.html() + "</p>").attr("id","modal-snippet-notes"));
    $("#edit-snippet-button").remove();
    editButton = true;
  }
};//------ end of edit snippet function ------

function updateSnippet(e){
  var editedSnippet = $("#modal-snippet-body").val();
  var editedNotes = $("#modal-snippet-notes").val();
  var snippetUpdate = {snippet: {notes: editedNotes, body: editedSnippet}}
  $.ajax({
    type: "PUT",
    url: "/snippets/"+ snippet_id,
    data: snippetUpdate,
    dataType: "json"
  }).done(function(response){
    console.log(response);
    // $("#modal-body-"+snippet_id).replaceWith($("<p class = 'snippet-body'>" + response.body + "</p>").attr("id", "modal-body-"+snippet_id));
    // $("#notes-"+snippet_id).replaceWith($("<p class = 'snippet-notes-text'>" + response.notes + "</p>").attr("id","notes-"+snippet_id));
    $("#edit-snippet-button").remove();
    $('#myModal').modal('hide');
    location.reload();
  });
};//------ end of update snippet function ------

function appendInfo(e){
  var $snippet = $(e.target).closest(".snippet");
  snippet_id = $snippet[0]['id']
  $('#modal-snippet-body').html($('#body-'+snippet_id).html());
  $('#modal-snippet-notes').html($('#notes-'+snippet_id).html());
  $('#modal-snippet-tags').html($('#tags-'+snippet_id).html());
}//------ end of append info function ------

