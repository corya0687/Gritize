class UsersController < ApplicationController
  def find_or_create
    @user = User.from_omniauth(user_params)
    respond_to do |format|
      format.json {render json: @user}
    end
  end

  def update
    @user = User.find(params[:user][:id])
    if @user.update(user_params)
      respond_to do |format|
        format.json {render json: @user}
      end
    else
      respond_to do |format|
        format.json {render json: @user.errors.full_messages}
      end
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :first_name, :last_name, :calendar_id)
  end
end
