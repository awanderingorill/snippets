class UsersController < ApplicationController
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
    #TODO enable a user to delete their profile
  end

end