class Admin::DayHikesController < ApplicationController
  def index
    @day_hikes = DayHike.all
  end

  def new
    @day_hike = DayHike.new
  end

  def create
    @day_hike = DayHike.create(safe_params)
    redirect_to [:admin, :day_hikes]
  end

  def destroy
    @day_hike = DayHike.find(params[:id])
    @day_hike.destroy
    redirect_to [:admin, :day_hikes]
  end

  private

  def safe_params
    params.require(:day_hike).permit(:name, :length, :difficulty, :season, :kml_file)
  end
end
