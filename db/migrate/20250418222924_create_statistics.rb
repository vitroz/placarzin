class CreateStatistics < ActiveRecord::Migration[8.0]
  def change
    create_table :statistics do |t|
      t.string :match_duration
      t.integer :team_one_score
      t.integer :team_two_score
      t.string :winner
      t.string :loser

      t.timestamps
    end
  end
end
