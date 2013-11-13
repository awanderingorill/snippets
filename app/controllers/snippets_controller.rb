class SnippetsController < ApplicationController

  def index
    if params[:tag]
      @snippets = Snippet.tagged_with(params[:tag])
    else
      @snippets = Snippet.all
    end
    respond_to do |format|
      format.html
      format.json {render json: @snippets}
    end
  end

  def show
    @snippet = Snippet.find(params[:id])
    respond_to do |format|
      format.html
      format.json {render json: @snippet}
    end
  end

  def new
    @snippet = Snippet.new
  end

  def create
    @snippet = Snippet.new(params["snippet"])
    if session[:user_id]
      @snippet.user_id = session[:user_id]
    end

    respond_to do |format|
      if @snippet.save
        format.html{redirect_to @snippet, notice: 'Snippet is successfully created'}
        format.json{render json:@snippet, status: :created}
      else
        format.html{render action:"new"}
        format.json{render json: @snippet.errors, status: :unprocessable_entity}
      end
    end
  end

  def edit
    @snippet = Snippet.find(params[:id])
  end

  def update
    @snippet = Snippet.find(params[:id])
    respond_to do |format|
      if @snippet.update_attributes(params[:snippet])
        format.html {redirect_to @snippet, notice: 'Snippet was successfully updated'}
        format.json {render json: @snippet}
      else
        format.html {render action: "edit"}
        format.json {render json: @snippet.errors, status: :unprocessable_entity}
      end
    end
  end

  def destroy
    @snippet = Snippet.find(params[:id])
    @snippet.delete
    respond_to do |format|
      format.html {redirect_to snippets_path}
      format.json {render json: @snippet}
    end
  end
end
