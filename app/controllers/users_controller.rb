class UsersController < ApplicationController

  def show
    user = User.find(session[:id])
    @snippets = user.snippets
  end

  def new
    @user = User.new
  end

  def create
    user = User.create(params[:user])
    redirect_to user
  end

  def edit
    @user = User.new
    #TODO enable a user to edit their profile
  end

  def update
    user = User.find(session[:user_id])
    user.update_attributes(params[:user])
    redirect_to user
  end

  def destroy
    #TODO enable a user to delete their profile
  end

end