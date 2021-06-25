class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.boolean :completed
      t.boolean :won
      t.belongs_to :user

      t.timestamps
    end
  end
end
