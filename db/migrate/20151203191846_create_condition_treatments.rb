class CreateConditionTreatments < ActiveRecord::Migration
  def change
    create_table :condition_treatments do |t|
    	t.integer :condition_id
    	t.integer :treatment_id

      t.timestamps null: false
    end
  end
end
