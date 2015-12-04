class Condition < ActiveRecord::Base
	has_many :condition_symptoms
	has_many :symptoms, :through => :condition_symptoms
	has_many :treatments, :through => :condition_treatments
	has_many :specialists, :through => :condition_specialists
	
end
