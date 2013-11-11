SnippetsApp::Application.routes.draw do
  get "tags/:tag", to: 'snippets#index', as: :tag
  resources :users
  resources :snippets
end
