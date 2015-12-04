class ConditionSpecialist < ActiveRecord::Base
	belongs_to :specialist
	belongs_to :condition
end
