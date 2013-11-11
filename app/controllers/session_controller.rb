class SessionController < ApplicationController

  def new
  end

  def create
    username = params[:username]
    password = params[:password]
    user = User.where(username: username).first
    if user && user.authenticate(password)
      session[:user_id] = user.id
      redirect_to user
    else
      raise
    end
  end

  def destroy
  end

end