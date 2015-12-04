class CreateSearches < ActiveRecord::Migration
  def change
    create_table :searches do |t|
      t.string :name
      t.string :condition
      t.string :specialist

      t.timestamps null: false
    end
  end
end
