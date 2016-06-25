ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rails/test_help'
require 'minitest/reporters'

class ActiveSupport::TestCase
  Minitest::Reporters.use! Minitest::Reporters::DefaultReporter.new(color: true)

  fixtures :all
end
