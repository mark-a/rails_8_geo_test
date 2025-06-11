class HomeController < ApplicationController
  def landing
    redirect_to(action: :home,
                params: request.query_parameters) if account_signed_in?
  end

  def index
    redirect_to(action: :landing,
                params: request.query_parameters) unless account_signed_in?
  end
end
