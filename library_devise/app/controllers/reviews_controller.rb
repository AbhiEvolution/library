class ReviewsController < ApplicationController
  before_action :authenticate_user!, except: [:index]
  before_action :set_book, only: [:index, :create]
  before_action :set_review, only: [:show, :update, :destroy]

  def index
    @reviews = @book.reviews.includes(:user)
    render json: ReviewSerializer.new(@reviews).serializable_hash
  end

  def create
    review_data = params[:data][:attributes]
    @review = @book.reviews.new(
      rating: review_data[:rating],
      comment: review_data[:comment]
    )
    @review.user = current_user

    if @review.save
      render json: ReviewSerializer.new(@review).serializable_hash, status: :created
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def show
    render json: ReviewSerializer.new(@review).serializable_hash
  end

  def update
    if @review.user == current_user
      review_data = params[:data][:attributes]
      if @review.update(
        rating: review_data[:rating],
        comment: review_data[:comment]
      )
        render json: ReviewSerializer.new(@review).serializable_hash
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end

  def destroy
    if @review.user == current_user
      @review.destroy
      head :no_content
    else
      render json: { error: "Not authorized" }, status: :forbidden
    end
  end

  private

  def set_book
    @book = Book.find(params[:book_id])
  end

  def set_review
    @review = Review.find(params[:id])
  end
end
