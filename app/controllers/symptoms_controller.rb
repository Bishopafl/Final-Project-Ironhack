class SymptomsController < ApplicationController

	def index
		@symptom = Symptom.all
		render("index")
	end

	def new
		@symptom = Symptom.new
		render("new")
	end

	def create
		# if admin_signed_in?
			symptom_params = params.require(:symptom).permit(:name, :description)
			@symptom = Symptom.new(symptom_params)

			if @symptom.save
				render("new")
			else
				redirect_to(404)
			end
		# end
	end

	def 

end
