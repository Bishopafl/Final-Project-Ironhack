class Specialist < ActiveRecord::Base
	has_many :condition_specialists
	has_many :conditions, :through => :condition_specialists
end
