require "test_helper"
require "webmock/minitest"

class LocateAddressJobTest < ActiveJob::TestCase
  include ActiveJob::TestHelper

  JSON_RESPONE_STRING = %(
    [{
        "place_id": 330807670,
        "licence": "Data © OpenStreetMap contributors, ODbL 1.0. http://osm.org/copyright",
        "osm_type": "way",
        "osm_id": 283158708,
        "lat": "40.6977062",
        "lon": "-73.7918107",
        "category": "building",
        "type": "yes",
        "place_rank": 30,
        "importance": 9.175936522464359e-05,
        "addresstype": "building",
        "name": "",
        "display_name": "107-19, Guy R. Brewer Boulevard, Cedar Manor, Queens, Queens County, New York, 11433, Vereinigte Staaten von Amerika",
        "address": {
            "house_number": "107-19",
            "road": "Guy R. Brewer Boulevard",
            "neighbourhood": "Cedar Manor",
            "borough": "Queens",
            "county": "Queens County",
            "city": "New York",
            "state": "New York",
            "ISO3166-2-lvl4": "US-NY",
            "postcode": "11433",
            "country": "Vereinigte Staaten von Amerika",
            "country_code": "us"
        },
        "boundingbox": ["40.6976477", "40.6977647", "-73.7919191", "-73.7917022"]
    }]
)

  test "Job searches for address in nominatim" do
    nominatim_call = stub_request(:get, %r{https://nominatim\.openstreetmap\.org/search})
                       .to_return(status: 200, body: JSON_RESPONE_STRING, headers: {})
    LocateAddressJob.perform_now accounts(:alice)

    assert_requested nominatim_call
    assert accounts(:alice).change_processed?
    assert accounts(:alice).located?
    assert accounts(:alice).address_lat && accounts(:alice).address_lng
  end
end
