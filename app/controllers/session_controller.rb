class SessionController < ApplicationController

  def new
  end

  def create
    email = params[:email]
    password = params[:password]
    user = User.where(email: email).first
    if user && user.authenticate(password)
      session[:user_id] = user.id
      redirect_to user
    else
      #TODO raise an error if something goes wrong in the authentication process
      format.html{render action:"new"}
      format.json{render json: @session.errors, status: :unprocessable_entity}
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to ('/')
  end

end