class ChecklistController < ApplicationController
  def index;end

  def new
    checklist = Checklist.new({ token: SecureRandom.hex })

    if checklist.save
      redirect_to(checklist)
    else
      redirect_to("/")
    end
  end
end
