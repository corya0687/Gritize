class ActivitiesController < ApplicationController
  before_filter :set_activity

  def show
    #code
  end

  def create
  end

  private

  def set_activity
    @activity = Activity.find(params[:id])
  end
end
