SnippetsApp::Application.routes.draw do

  get '/' => 'welcome#index'
  get "tags/:tag", to: 'snippets#index', as: :tag

  # these are the routes for sessions
  get '/logout' => 'session#destroy'
  get '/login' => 'session#new'
  post '/login' => 'session#create'

  # the route to show only a user's snippets with that tag
  get '/users/:id/tags/:tag' => 'users#show', :as => :user_tag

  resources :users
  resources :snippets
end
