class BookSerializer
  include JSONAPI::Serializer
  
  attributes :id, :title, :author, :isbn, :publisher, :published_year, :total_copies, :available_copies, :cover_image 
end
