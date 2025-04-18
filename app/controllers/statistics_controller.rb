class StatisticsController < ApplicationController
  skip_forgery_protection only: :create
  
  def create
    statistic = Statistic.new(statistic_params)
  
    if statistic.save
      render json: { message: "Match saved", statistic: statistic }, status: :created
    else
      render json: { errors: statistic.errors.full_messages }, status: :unprocessable_entity
    end
  end
  
  private
  
  def statistic_params
    params.require(:statistic).permit(
      :match_duration,
      :team_one_score,
      :team_two_score,
      :winner,
      :loser,
      winner_team_members: [],
      winner_team_members: []
      ) 
    end
end