# frozen_string_literal: true

require 'application_system_test_case'

class SignUpTest < ApplicationSystemTestCase
  test 'sign up' do
    visit root_path
    assert_css 'h2', text: 'Log in'
    click_link 'Sign up'

    # test validation errors
    click_button 'Sign up'
    assert_text '2 errors prohibited this user from being saved'

    fill_in 'Email', with: 'bob@example.com'
    fill_in 'Password', with: 'password'
    fill_in 'Password confirmation', with: 'password'
    click_button 'Sign up'
    assert_text 'Welcome! You have signed up successfully.'
    assert_text 'Account: bob@example.com'
    assert_css 'h1', text: 'Welcome!'
  end
end
