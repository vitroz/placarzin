Rails.application.routes.draw do
  get "pages/counter"
  # Serve static files from app/public
  get "/app/public/*path" => proc { |env|
    file_path = Rails.root.join('app/public', env['action_dispatch.original_path'].sub('/app/public/', ''))
    if File.exist?(file_path)
      [200, { 'Content-Type' => Rack::Mime.mime_type(File.extname(file_path)) }, [File.read(file_path)]]
    else
      [404, { 'Content-Type' => 'text/plain' }, ['Not Found']]
    end
  }
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", :as => :rails_health_check

  Rails.application.routes.draw do
    root "pages#counter"
  end

  # Render dynamic PWA files from app/views/pwa/* (remember to link manifest in application.html.erb)
  # get "manifest" => "rails/pwa#manifest", as: :pwa_manifest
  # get "service-worker" => "rails/pwa#service_worker", as: :pwa_service_worker

  # Defines the root path route ("/")
  # root "posts#index"
end
