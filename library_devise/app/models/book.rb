class Book < ApplicationRecord
  belongs_to :category

  # Active Storage association for attaching one cover image
  has_one_attached :cover_image
end
