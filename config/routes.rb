SnippetsApp::Application.routes.draw do

  get '/' => 'welcome#index'
  get "tags/:tag", to: 'snippets#index', as: :tag
  # these are the routes for sessions
  get '/logout' => 'session#destroy'
  get '/login' => 'session#new'
  post '/login' => 'session#create'

  # the route to show only a user's snippets with that tag
  get '/users/:id/tags/:tag' => 'users#show', as: :user_tag

  resources :users
  resources :snippets
end
#== Route Map
# Generated on 15 Nov 2013 01:59
#
#          tag GET    /tags/:tag(.:format)           snippets#index
#       logout GET    /logout(.:format)              session#destroy
#        login GET    /login(.:format)               session#new
#              POST   /login(.:format)               session#create
#     user_tag GET    /users/:id/tags/:tag(.:format) users#show
#        users GET    /users(.:format)               users#index
#              POST   /users(.:format)               users#create
#     new_user GET    /users/new(.:format)           users#new
#    edit_user GET    /users/:id/edit(.:format)      users#edit
#         user GET    /users/:id(.:format)           users#show
#              PUT    /users/:id(.:format)           users#update
#              DELETE /users/:id(.:format)           users#destroy
#     snippets GET    /snippets(.:format)            snippets#index
#              POST   /snippets(.:format)            snippets#create
#  new_snippet GET    /snippets/new(.:format)        snippets#new
# edit_snippet GET    /snippets/:id/edit(.:format)   snippets#edit
#      snippet GET    /snippets/:id(.:format)        snippets#show
#              PUT    /snippets/:id(.:format)        snippets#update
#              DELETE /snippets/:id(.:format)        snippets#destroy
