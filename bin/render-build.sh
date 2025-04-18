#!/usr/bin/env bash
# exit on error
set -o errexit

bundle install
RAILS_ENV=production bundle exec rake assets:precompile
bundle exec rails assets:clean
bundle exec rails db:migrate

# If you're using a Free instance type, you need to
# perform database migrations in the build command.
# Uncomment the following line:

# bundle exec rails db:migrate