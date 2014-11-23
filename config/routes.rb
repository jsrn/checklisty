Rails.application.routes.draw do
  resources :checklist
  root 'checklist#new'
end
