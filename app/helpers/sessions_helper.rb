module SessionsHelper

  # def correct_user(object, path)
  #   redirect_to path unless object.user == current_user
  # end

  def current_user
    if session[:user_id]
      User.find(session[:user_id])
    else
      nil
    end
  end

  def signed_in?
    !current_user.nil?
  end


end
