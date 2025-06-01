class UserSerializer
  include JSONAPI::Serializer
  attributes :id, :username , :email, :role, :created_at
end
