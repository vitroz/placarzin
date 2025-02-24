require "test_helper"

class PagesControllerTest < ActionDispatch::IntegrationTest
  test "should get counter" do
    get pages_counter_url
    assert_response :success
  end
end
