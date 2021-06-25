class GameSerializer < ActiveModel::Serializer
  attributes :id, :completed, :won
end
