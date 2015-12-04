class ConditionSymptom < ActiveRecord::Base
	belongs_to :condition
	belongs_to :symptom
end
