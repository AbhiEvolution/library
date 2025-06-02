class CurrentUserController < ApplicationController
  # Skip authentication for index action
  before_action :authenticate_request!

  def index
    if current_user
      render json: UserSerializer.new(current_user).serializable_hash[:data][:attributes], status: :ok
    else
      render json: { error: 'Not authenticated' }, status: :unauthorized
    end
  end
end
