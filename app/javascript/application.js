// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"
import "channels"
import "leaflet"

import Rails from "@rails/ujs"
Rails.start();

Turbo.config.forms.mode = "optin"
