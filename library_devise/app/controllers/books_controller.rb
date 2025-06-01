class BooksController < ApplicationController
  before_action :set_book, only: [ :show, :edit, :update, :destroy ]

  def index
    books = Book.all
    serialized_books = books.map { |book| serialize(book) }
    render json: serialized_books, status: :ok
  end

  def show
    render json: serialize(@book), status: :ok
  end

  def new
    render json: serialize(Book.new), status: :ok
  end

  def create
    category = Category.last
    book = Book.new(book_params.merge(category_id: category.id))
    if params[:cover_image].present?
      book.cover_image.attach(params[:cover_image])
    end
    if book.save
      render json: serialize(book), status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit
    render json: serialize(@book), status: :ok
  end

  def update
    if @book.update(book_params)
      render json: serialize(@book), status: :ok
    else
      render json: { errors: @book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    @book.destroy
    render json: { message: "Book deleted successfully" }, status: :ok
  end

  private

  def set_book
    @book = Book.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: "Book not found" }, status: :not_found
  end

  def book_params
    params.require(:book).permit(:title, :author, :isbn, :publisher, :category_id, :published_year, :total_copies, :available_copies, :cover_image)
  end

  def serialize(book)
    BookSerializer.new(book).serializable_hash[:data][:attributes]
  end
end
