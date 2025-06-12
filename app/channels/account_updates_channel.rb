class AccountUpdatesChannel < ApplicationCable::Channel
  def subscribed
    account = Account.find(params[:id])
    stream_for account
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
