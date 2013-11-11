var Snippet = Snippet || {};

$( document ).ready(function(){
  $('#show-snippet').on("click", Snippet.showSnippets)
  $('#post-snippet').on("submit", Snippet.addSnippets)
  }
);


Snippet.showSnippets = function() {
  $.ajax({
    type: "GET",
    url: "/snippets",
    dataType: "json"
  }).done(function(snippets){
    $.each(snippets, function(index, snippets){
    })
  });

  $('#show-snippets').off("click", Snippet.showSnippets)

  }

Snippet.addSnippets = function(e){
  e.preventDefault();
    var newSnippet = {
      body: $('input[name=body]').val(),
      source: $('input[name=source]').val(),
      user_id: $('input[name=user_id]').val(),
      tag_list: $('input[name=tag_list]').val()
    };
    $.ajax({
      type: "POST",
      url: "/snippets",
      dataType: "json",
      data: {snippet: newSnippet}
    }).done(function(snippet){console.log(snippet.name)})
}



// }

Snippet.deleteSnippets = function(e){
  e.preventDefault();
  var $target = $(e.target).parent();
  var snippet_id = $target.attr('id')
      $.ajax({
      type: "DELETE",
      url: "/snippets/"+ snippet_id,
      dataType: "json"
    })
}