class Ability
  include CanCan::Ability

  def initialize(user)
    return unless user.present?

    if user.admin?
      can :manage, :all
    elsif user.librarian?
      can :manage, Book
      can :read, :all
    elsif user.member?
      can :read, Book
      can :read, User, id: user.id
    end
  end
end
