class CreateConditions < ActiveRecord::Migration
  def change
    create_table :conditions do |t|
      t.string :name
      t.string :description
      t.string :cause

      t.timestamps null: false
    end
  end
end
