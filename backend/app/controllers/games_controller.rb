class GamesController < ApplicationController
    
    def index
        games = Game.all
        render json: games
    end

    def show
        game = Game.find_by_id(params[:id])
        render json: game
    end

    def create
        user = User.find_or_create_by(user_params)
        game = user.games.build(game_params)
        if game.save && user.valid?
            render json: game
        else
            render json: {error: "There was an error submitting the record for that game.", status: 400}
        end
    end

    def update
        game = Game.find_by_id(params[:id])
        if game.update(game_params)
            render json: game
        else
            render json: {error: "There was an error changing the record for that game.", status: 400}
        end
    end

    # def destroy
    # end

    private

    def user_params
        params.require(:user).permit(:name)
    end

    def game_params
        params.require(:game).permit(:completed, :won, :user_id)
    end

end
