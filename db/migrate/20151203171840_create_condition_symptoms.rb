class CreateConditionSymptoms < ActiveRecord::Migration
  def change
    create_table :condition_symptoms do |t|
      t.integer :symptom_id
      t.integer :condition_id

      t.timestamps null: false
    end
  end
end
