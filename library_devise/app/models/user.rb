class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  include Devise::JWT::RevocationStrategies::JTIMatcher

  devise :database_authenticatable, :registerable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self

  enum :role, { member: "member", librarian: "librarian", admin: "admin" }
  has_many :reviews

  validates :role, presence: true
  validates :username, presence: true
end
