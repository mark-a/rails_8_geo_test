require "faraday"

class LocateAddressJob < ApplicationJob
  queue_as :default

  def perform(*accounts)
    for account in accounts
      unless account.located?
        places = Nominatim.search(account.address_raw).limit(1).address_details(true)
        if places.any? && (place = places.first)
          account.update(address_lat: place.lat, address_lng: place.lon, located: true)
        end
      end
    end
  end
end
