class ReviewSerializer
  include JSONAPI::Serializer

  attributes :id, :rating, :comment, :created_at

  belongs_to :user, serializer: UserSerializer
end
