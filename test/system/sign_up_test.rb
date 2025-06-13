# frozen_string_literal: true

require "application_system_test_case"

class SignUpTest < ApplicationSystemTestCase
  include ActiveJob::TestHelper

  test "sign up" do
    visit root_path
    assert_css "a", text: "Log in"
    click_link "Sign up", match: :first

    # test validation errors
    click_button "Sign up"
    assert_text "3 errors prohibited this account from being saved"

    fill_in "Email", with: "bob@example.com"
    fill_in "Password", with: "password"
    fill_in "Password confirmation", with: "password"
    fill_in "Address", with: "72B Beaconsfield Parade, Albert Park VIC 3206, Australia"
    click_button "Sign up"
    assert_text "A message with a confirmation link has been sent to your email address. Please follow the link to activate your account."
    assert_enqueued_jobs(1)

    last_email = ActionMailer::Base.deliveries.last
    parsed_email = Nokogiri::HTML(last_email.body.decoded)
    target_link = parsed_email.at("a:contains('Confirm my account')")
    visit target_link["href"]

    assert_text "Your email address has been successfully confirmed."
    click_button "Log in"
    fill_in "Email", with: "bob@example.com"
    fill_in "Password", with: "password"
    click_button "Log in", wait: 5.seconds

    assert_text "Account: bob@example.com"
    assert_css "h2", text: "We are currently locating your address"
  end
end
