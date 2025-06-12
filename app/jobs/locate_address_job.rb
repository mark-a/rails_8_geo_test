require "faraday"

class LocateAddressJob < ApplicationJob
  queue_as :default

  def perform(*accounts)
    for account in accounts
      unless account.change_processed?
        places = Nominatim.search(account.address)
                          .limit(1)
                          .address_details(true)

        if places.any? && (place = places.first)
          account.update(address_lat: place.lat, address_lng: place.lon, located: true)
        end
        account.update(change_processed: true)
        AccountUpdatesChannel.broadcast_to(account, "updated")
      end
    end
  end
end
