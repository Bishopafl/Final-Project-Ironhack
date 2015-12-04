class CreateConditionSpecialists < ActiveRecord::Migration
  def change
    create_table :condition_specialists do |t|
      t.integer :condition_id
      t.integer :specialist_id

      t.timestamps null: false
    end
  end
end
