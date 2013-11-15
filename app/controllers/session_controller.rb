class SessionController < ApplicationController

  def new
  end

  def create
    email = params[:email].downcase
    password = params[:password]
    user = User.where(email: email).first
    if user && user.authenticate(password)
      respond_to do |format|
        format.html do
          session[:user_id] = user.id
          redirect_to user
        end
        format.json { render json: user.id }
      end
    else
      #TODO raise an error if something goes wrong in the authentication process
      #VALIDATION FIXED
      respond_to do |format|
        format.html do
          flash[:error] = "Email and password do not match"
          render :new
        end
        format.json{render json: @session.errors, status: :unprocessable_entity}
      end
      #TODO validation fixed but json looks funky. need to test!
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to ('/')
  end

end