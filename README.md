# Geo Locator Test

## Description

This is a simple Rails 8 test project testing the new SolidQueue & SolidCable setup with a sqlite backend.

This includes:
- Registration and login with email and password provided by devise with an additional field (address).
- A background job will try to lookup the address and provide additional geo info.
- Visualisation of the address with longitude and latitude

## Requirements

- ruby 3.3
- docker (optional)

## Setup
Standard rails project setup works here.

For development:
 - `bundle install`
 - `rails db:prepare`
 - `rails s`

## Docker
THe provided docker file is build for production mode, a development container needs some adjustments

- build the local Dockerfile with `docker build . -t geo_test`
- run the image for example with `docker run -d -p 8080:3000 -e SECRET_KEY_BASE=ALL_YOUR_BASE_CHANGE_ME -e RAILS_MASTER_KEY=12345fake -e SMTP_HOST=mail.example.com -e SMTP_USER=no-reply@example.com -e SMTP_PASSWORD=change_me! -e DEFAULT_HOST=geo.example.com -eSOLID_QUEUE_IN_PUMA=1 geo_test`
- this will run in production mode on port 8080 with the provided secret_key_base and smtp config