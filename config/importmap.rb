# Pin npm packages by running ./bin/importmap

pin "application"
pin "@hotwired/turbo-rails", to: "turbo.min.js"
pin "@hotwired/stimulus", to: "stimulus.min.js"
pin "@hotwired/stimulus-loading", to: "stimulus-loading.js"
pin_all_from "app/javascript/controllers", under: "controllers"
pin "@rails/ujs", to: "@rails--ujs.js" # @7.1.3
pin "leaflet" # @1.9.4
pin "leaflet-css" # @0.1.0
pin "@rails/actioncable", to: "actioncable.esm.js"
pin_all_from "app/javascript/channels", under: "channels"
pin "three-core",  to: "three.core.min.js" # @0.177.0
pin "three", to: "three.module.min.js" # @0.177.0
pin "lil-gui" # @0.20.0
pin "three/orbit", to: "three.orbit.js" # @0.177.0
