class ConditionTreatment < ActiveRecord::Base
	belongs_to :treatment
	belongs_to :condition
end
