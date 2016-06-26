Rails.application.routes.draw do
  root 'dashboard#index'

  namespace :admin do
    root 'day_hikes#index'
    resources :day_hikes
  end
end
