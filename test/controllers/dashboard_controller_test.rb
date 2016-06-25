require 'test_helper'

class DashboardControllerTest < ActionController::TestCase
  test 'index' do
    get :index
    assert_response :success
  end
end
