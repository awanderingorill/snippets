SnippetsApp::Application.routes.draw do

  get '/' => 'welcome#index'
  get "tags/:tag", to: 'snippets#index', as: :tag

  # these are the routes for sessions
  get '/logout' => 'session#destroy'
  get '/login' => 'session#new'
  post '/login' => 'session#create'

  resources :users
  resources :snippets
end
