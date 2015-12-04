Rails.application.routes.draw do

  # This line mounts Forem's routes at /forums by default.
  # This means, any requests to the /forums URL of your application will go to Forem::ForumsController#index.
  # If you would like to change where this extension is mounted, simply change the :at option to something different.
  #
  # We ask that you don't use the :as option here, as Forem relies on it being the default of "forem"
  mount Forem::Engine, :at => '/forums'

  get "/specialists" => "specialists#index"

  devise_for :users
	get "dashboards/index"

  root "dashboards#index"

	get "/forum" => "forum#index"

	resources :dashboards
  resources :symptoms

end
