require 'test_helper'

class Admin::DayHikesControllerTest < ActionController::TestCase
  test 'index' do
    get :index
    assert_response :success
  end

  test 'new' do
    get :new
    assert_response :success
  end

  test 'create' do
    assert_difference 'DayHike.count', +1 do
      post :create, day_hike: { name: 'My Hike' }
    end
    assert_redirected_to [:admin, :day_hikes]
  end

  test 'destroy' do
    assert_difference 'DayHike.count', -1 do
      delete :destroy, id: day_hikes(:base).id
    end
    assert_redirected_to [:admin, :day_hikes]
  end
end
