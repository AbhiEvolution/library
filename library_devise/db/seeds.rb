puts "🌱 Seeding data..."

# Clear old data
Review.delete_all
Book.delete_all
Category.delete_all
User.delete_all

# Create categories
categories = ["Fiction", "Science", "History", "Technology", "Biography"].map do |name|
  Category.create!(name: name)
end
puts "✅ Categories created"

# Create users  { member: "member", librarian: "librarian", admin: "admin" }
users = [
  { email: "admin@example.com", password: "123456", username: "admin_user", role: "admin" },
  { email: "librarian@example.com", password: "123456", username: "reader_one", role: "librarian" },
  { email: "member@example.com", password: "123456", username: "reader_two", role: "member" }
]

users.each do |user_data|
  User.create!(user_data)
end
puts "✅ Users created"

# Create books
books = [
  { title: "The Ruby Way", author: "Hal Fulton", isbn: "9780132480376", publisher: "Addison-Wesley", published_year: 2020, total_copies: 10, available_copies: 7 },
  { title: "Eloquent JavaScript", author: "Marijn Haverbeke", isbn: "9781593279509", publisher: "No Starch Press", published_year: 2018, total_copies: 5, available_copies: 3 },
  { title: "Sapiens", author: "Yuval Noah Harari", isbn: "9780062316097", publisher: "Harper", published_year: 2014, total_copies: 6, available_copies: 4 }
]

books.each_with_index do |book_data, index|
  Book.create!(
    book_data.merge(category_id: categories[index % categories.size].id)
  )
end
puts "✅ Books created"

# Create reviews
users = User.all
books = Book.all

Review.create!(
  rating: 5,
  comment: "Excellent read, very informative.",
  user: users[1],
  book: books[0]
)

Review.create!(
  rating: 4,
  comment: "Great insights, well written.",
  user: users[2],
  book: books[1]
)

puts "✅ Reviews added"
puts "🎉 Seeding complete!"
