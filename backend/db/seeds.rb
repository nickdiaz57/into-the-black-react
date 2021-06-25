puts "Seeding."

User.destroy_all
Game.destroy_all

u1 = User.create(name: "Kirk")
u2 = User.create(name: "Spock")

g1 = Game.create(completed: true, won: true)
g2 = Game.create(completed: true, won: false)
g3 = Game.create(completed: false, won: false)
g4 = Game.create(completed: true, won: true)
g5 = Game.create(completed: true, won: true)

u1.games.push(g1, g2, g3)
u2.games.push(g4, g5)

puts "Seeding complete."