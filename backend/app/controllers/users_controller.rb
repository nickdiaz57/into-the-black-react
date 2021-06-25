class UsersController < ApplicationController
    
    def index
        users = User.all
        render json: users
    end

    def show
        user = User.find_by_id(params[:id])
        render json: user
    end

    def create
        exists = User.find_by(name: params[:name])
        if exists
            render json: exists
        else
            user = User.create(user_params)
            if user.save
                render json: user
            else
                render json: {error: "There was an error creating that user.", status: 400}
            end
        end
    end

    def update
        user = User.find_by_id(params[:id])
        if user.update(user_params)
            render json: user
        else
            render json: {error: "There was an error updating that user.", status: 400}
        end
    end
    
    private

    def user_params
        params.require(:user).permit(:name)
    end

end
