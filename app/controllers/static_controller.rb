class StaticController < ApplicationController
  def index
    file_path = Rails.root.join("app", "public", "index.html")
    if File.exist?(file_path)
      render html: File.read(file_path).html_safe, layout: false, content_type: "text/html"
    else
      render plain: "File not found", status: :not_found
    end
  end
end
