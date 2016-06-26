class CreateDayHikes < ActiveRecord::Migration
  def change
    create_table :day_hikes do |t|
      t.string :difficulty
      t.string :kml_file
      t.string :length
      t.string :name
      t.string :season

      t.timestamps null: false
    end
  end
end
