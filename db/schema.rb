# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2025_04_18_223145) do
  create_table "statistics", force: :cascade do |t|
    t.string "match_duration"
    t.integer "team_one_score"
    t.integer "team_two_score"
    t.string "winner"
    t.string "loser"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.json "winner_team_members"
    t.json "loser_team_members"
  end
end
