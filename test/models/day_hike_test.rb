require 'test_helper'

class DayHikeTest < ActiveSupport::TestCase
  test 'valid' do
    assert day_hikes(:base).valid?
  end
end
