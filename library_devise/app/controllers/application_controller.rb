class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern
  
  # Skip CSRF verification for API requests
  skip_before_action :verify_authenticity_token, if: :json_request?
  
  protected
  
  def json_request?
    request.format.json?
  end
end
