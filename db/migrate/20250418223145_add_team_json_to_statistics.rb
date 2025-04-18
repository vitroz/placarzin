class AddTeamJsonToStatistics < ActiveRecord::Migration[8.0]
  def change
    add_column :statistics, :winner_team_members, :json
    add_column :statistics, :loser_team_members, :json
  end
end
