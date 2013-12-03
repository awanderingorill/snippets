class UsersController < ApplicationController
  before_filter :signed_in_user, only: [:show, :edit, :update, :delete]
  before_filter :correct_user, only: [:show, :edit, :update, :delete]

  def index
    @user = User.all
  end

  def show
    @user = User.find(params[:id])
    if params[:tag]
      @snippets = @user.snippets.tagged_with(params[:tag])
    else
      @snippets = @user.snippets
    end
    respond_to do |format|
      format.html
      format.json{render json: @snippets}
    end
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    respond_to do |format|
      if @user.save
        session[:user_id] = @user.id
        format.html{redirect_to @user, notice: 'Welcome to Snippets!'}
        format.json{render json:@user, status: :created}
      else
        #validation not the best but done
        format.html do
          flash[:error] = "We could not create your account. Please try again."
          render :new
        end
        #validation
        format.json{render json: @user.errors, status: :unprocessable_entity}
      end
    end
  end

  def edit
    @user = User.new
    #TODO make a form for a user to update their profile
  end

  def update
    user = User.find(session[:user_id])
    user.update_attributes(params[:user])
    redirect_to user
    #TODO enable a user to update their profile
  end

  def destroy
    user = User.find(params[:id])
    user.destroy
    redirect_to root_url
  end

  private
  def correct_user
    user = User.find(params[:id])
    redirect_to '/login', notice: "You are not the current owner of this account. Please login to the correct account." unless current_user == user
  end

  def signed_in_user
    redirect_to "/login", notice: "Please login to view." unless signed_in?
  end

end