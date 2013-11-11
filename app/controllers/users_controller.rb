class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    respond_to do |format|
      if @user.save
        format.html{redirect_to @user, notice: 'Snippet is successfully created'}
        format.json{render json:@user, status: :created}
      else
        #TODO flash error if password isn't longer than 6 characters
        format.html{render action:"new"}
        format.json{render json: @user.errors, status: :unprocessable_entity}
      end
    end
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