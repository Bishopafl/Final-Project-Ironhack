class CreateSpecialists < ActiveRecord::Migration
  def change
    create_table :specialists do |t|
      t.string :name
      t.string :description
      t.integer :location

      t.timestamps null: false
    end
  end
end
