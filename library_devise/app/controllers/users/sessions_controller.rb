class Users::SessionsController < Devise::SessionsController
  include RackSessionFix

  respond_to :json

  private

  def respond_with(resource, _opts = {})
    render json: {
      status: { code: 200, message: "Logged in successfully." },
      data: {
        user: UserSerializer.new(resource).serializable_hash[:data][:attributes],
        jwt: request.env["warden-jwt_auth.token"]
      }
    }, status: :ok
  end

  def respond_to_on_destroy
    if current_user
      render json: {
        status: { code: 200, message: "Logged out successfully." }
      }, status: :ok
    else
      render json: {
        status: { code: 401, message: "Already logged out." }
      }, status: :unauthorized
    end
  end
end
