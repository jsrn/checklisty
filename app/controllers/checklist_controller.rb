class ChecklistController < ApplicationController
  def new
    checklist = Checklist.new({ token: SecureRandom.hex })

    if checklist.save
      redirect_to(checklist)
    else
      redirect_to("/")
    end
  end

  def show
    @checklist = Checklist.find_by_token(params[:id])
    @checklist.list_json ||= "[\"What's the plan, Stan?\"]"
  end

  def update
    @checklist = Checklist.find_by_token(params[:id])

    render :json => {
      :success => @checklist.update(checklist_params)
    }
  end

  private
  def checklist_params
    params.permit(:list_json)
  end
end
