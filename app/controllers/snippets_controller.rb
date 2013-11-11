class SnippetsController < ApplicationController
  def index
    if params[:tag]
      @snippets = Snippet.tagged_with(params[:tag])
    else
      @snippets = Snippet.all
    end
  end

  def show
  end

  def new
  end

  def create
  end

  def edit
  end

  def update
  end

  def destroy
  end
end
