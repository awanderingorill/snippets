class ApplicationController < ActionController::Base
  protect_from_forgery
  include SessionsHelper


  before_filter :allow_cross_domain_access
  def allow_cross_domain_access
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Methods"] = "GET, PUT, POST, DELETE"
  end



end
