class Treatment < ActiveRecord::Base
	has_many :condition_treatments
	has_many :conditions, :through => :condition_treatments
end
