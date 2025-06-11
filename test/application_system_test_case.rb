require "test_helper"

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  driven_by :selenium, using: :headless_chrome, screen_size: [1400, 1400]

  def sign_in_as_alice
    visit root_path
    assert_css 'h2', text: 'Log in'
    fill_in 'Email', with: 'alice@example.com'
    fill_in 'Password', with: 'password'
    click_button 'Log in'
    assert_text 'Signed in successfully.'
  end
end
