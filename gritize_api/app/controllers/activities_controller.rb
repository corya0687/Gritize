class ActivitiesController < ApplicationController
  before_action :set_activity, only: %w[ show update destroy ]

  def show
    render json: {activity: @activity.to_json}, status: 200
  end

  def create
    @activity = Activity.from_google_calendar(params)
    if @activity.save
      render json: {activity: @activity.to_json}, status: 200
    else
      render json: {error: @activity.errors.full_messages.flatten.to_json}, status: 400
    end
  end

  def update
    if @activity.update(activity_params)
      render json: {activity: @activity.to_json}, status: 200
    else
      render json: {error: @activity.errors.full_messages.flatten.to_json}, status: 400
    end
  end

  def destroy
    if @activity.destroy
      render json: {activity: @activity.to_json}, status: 200
    else
      render json: {error: @activity.errors.full_messages.flatten.to_json}, status: 400
    end
  end

  private

  def set_activity
    @activity = Activity.find(params[:id])
  end

  def activity_params
    params.require(:activity).permit(:started, :completed, :event_id, :begin, :end)
  end
end
