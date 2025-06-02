class BooksController < ApplicationController
  before_action :set_book, only: [ :show, :edit, :update, :destroy ]
  before_action :get_categories, only: [ :new, :edit ]

  def index
    books = Book.paginate(page: params[:page], per_page: 3)

    render json: BookSerializer.new(
      books,
      meta: {
        current_page: books.current_page,
        total_pages: books.total_pages
      }
    ).serializable_hash, status: :ok
  end

  def show
    render json: serialize(@book), status: :ok
  end

  def new
    book = Book.new
    render json: {
      book: serialize(book),
      categories: @categories
    }, status: :ok
  end

  def create
    book = Book.new(book_params)
    if params[:book][:cover_image].present?
      book.cover_image.attach(params[:book][:cover_image])
    end
    if book.save
      render json: serialize(book), status: :created
    else
      render json: { errors: book.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def edit
    render json: {
      book: serialize(@book),
      categories: @categories
    }, status: :ok
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

  def get_categories
    @categories = Category.all
  end

  def book_params
    params.require(:book).permit(:title, :author, :isbn, :publisher, :category_id, :published_year, :total_copies, :available_copies, :cover_image)
  end

  def serialize(book)
    BookSerializer.new(book).serializable_hash[:data][:attributes]
  end
end
