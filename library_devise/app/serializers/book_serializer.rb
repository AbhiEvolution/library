class BookSerializer
  include JSONAPI::Serializer
  
  attributes :id, :title, :author, :isbn, :publisher, :published_year, :total_copies, :available_copies, :category_id
  
  attribute :category do |object|
    object.category.as_json(only: [:id, :name]) if object.category
  end
  
  attribute :cover_image_url do |object|
    if object.cover_image.attached?
      Rails.application.routes.url_helpers.rails_blob_url(
        object.cover_image,
        host: 'http://localhost:3000'
      )
    else
      nil
    end
  end
end