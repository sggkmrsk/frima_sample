Rails.application.routes.draw do
  root 'items#new'
  resources :items ,only: [:new,:create,:show,:edit,:update]
end
