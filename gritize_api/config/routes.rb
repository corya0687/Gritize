Rails.application.routes.draw do

  devise_for :users, controllers: { omniauth_callbacks: 'users/omniauth_callbacks' }
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post 'users/find_or_create', to: 'users#find_or_create'

  resources :users, only: [:update]
  resources :activities, only: %i[create show update]

end
