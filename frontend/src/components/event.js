var Event = {
    OUTPOST: {
        icon: "O",
        scenes: {
            'start': {
                text: "You find yourself within range of a bustling Federation outpost.\nWide-band communications broadcast the outpost's fueling and repair services.",
                buttons: {
                    'buy fuel': {value: 'Buy 50 fuel. (20 scrap)', next: 'fuel', cost: {scrap: 20}},
                    'buy repairs': {value: 'Buy repairs. (20 scrap)', next: 'repair', cost: {scrap: 20}},
                    'finish': {value: 'Leave station.', next: 'end'}
                }
            },
            'fuel': {
                text: 'The transaction clears.\nA small droid approaches your ship with additional fuel.',
                buttons: {
                    'finish': {value: 'Leave station.', next: 'end', result: {fuel: 50}}//lose scrap, gain fuel
                }
            },
            'repair': {
                text: 'The transaction clears.\nA group of repair drones encircles your ship and patches the hull.',
                buttons: {
                    'finish': {value: 'Leave station.', next: 'end', result: {health: 100}}//lose scrap, gain health
                }
            }
        }
    },

    // FIRE: {
    //     icon: "O",
    //     scenes: {
    //         'start': {
    //             text: "Warnings and distress calls flash across your console as you approach the outpost.\nThe station is engulfed in flames!",
    //             buttons: {
    //                 'proceed': {value: 'Fire!', next: 'decide'}
    //             }
    //         },
    //         'decide': {
    //             text: "There are survivors still aboard. One airlock is still operational.\nThere is no way to tell how much longer the station will hold together.",
    //             buttons: {
    //                 'help': {value: "Approach the station. Try and help the survivors.", next: {3: 'help fail', 10: 'help success'}},
    //                 'finish': {value: "Stay away. We can't take the risk.", next: 'end'}
    //             }
    //         },
    //         'help success': {
    //             text: "The last of the survivors clambers aboard, and you pull away from the station safely.\nYou drop off the survivors on a nearby station. One offers to join you.",
    //             buttons: {
    //                 'finish': {value: 'Welcome aboard.', next: 'end'}//gain crew
    //             }
    //         },
    //         'help fail': {
    //             text: "The station explodes just before you can dock. Your ship is violently thrown away from the blast.\nNo one could have survived that.",
    //             buttons: {
    //                 'finish': {value: 'Leave.', next: 'end', result: {health: -50}}//lose health
    //             }
    //         }
    //     }
    //     //station on fire, can try and save people on board
    //     //chance for station to explode and cause damage, or gain crewmate on successful rescue
    // },

    // SPIDERS: {
    //     icon: "O",
    //     scenes: {
    //         'start': {
    //             text: "Warnings and distress calls flash across your console as you approach the outpost.\nYour radio crackles to life with a frantic message.",
    //             buttons: {
    //                 'proceed': {value: 'Message received.', next: 'decide'}
    //             }
    //         },
    //         'decide': {
    //             text: "The station has been overrun by giant alien spiders!\nNo time to explain. The survivors plead for assistance.",
    //             buttons: {
    //                 'help': {value: "Giant spiders are no joke. We have to help.", next: {3: 'help fail', 10: 'help success'}},
    //                 'finish': {value: "No chance. I didn't sign up for giant spiders.", next: 'end'}
    //             }
    //         },
    //         'help success': {
    //             text: "Your crew holds off the spiders long enough to evacuate the remaining civilians.\nYou drop off the survivors on a nearby station. One offers to join you.",
    //             buttons: {
    //                 'finish': {value: 'Welcome aboard.', next: 'end'}//gain crew
    //             }
    //         },
    //         'help fail': {
    //             text: "The spiders are far more aggressive than you could have expected. The fight is short and bloody.\nYou barely make it back to the ship alive. One of your crew doesn't return.",
    //             buttons: {
    //                 'finish': {value: 'Leave.', next: 'end'}//lose crew
    //             }
    //         }
    //     }
    //     //research station overwhelmed by giant alien spiders
    //     //attempt rescue, gain crewmate on success or lose crewmate/take damage on fail
    // },

    DERELICT: {
        icon: "D",
        scenes: {
            'start': {
                text: "A heavily damaged warship drifts through the darkness, long abandoned.\nIt looks like parts of the ship can be salvaged for scrap.",
                buttons: {
                    'finish': {value: 'Take what you can.', next: 'end', result: {scrap: 50}}//gain scrap
                }
            }
        }
        //can salvage for scrap
    },

    DISTRESS: {
        icon: "E",
        scenes: {
            'start': {
                text: "An emergency distress signal flashes up on your console.\nA nearby cruiser is persistently hailing you.",
                buttons: {
                    'proceed': {value: 'Investigate.', next: 'decide'}
                }
            },
            'decide': {
                text: "They ask for some spare fuel to make it to the nearest station. They say they can pay.\nThe cruiser is heavily armed.",
                buttons: {
                    'accept': {value: 'Give them fuel. (30 fuel)', next: {3: 'ambush', 10: 'thanks'}, cost: {fuel: 30}},
                    'decline': {value: 'Turn them down.', next: {4: 'ambush fail', 10: 'end'}}
                }
            },
            'thanks': {
                text: "They seem grateful. They send over some scrap as thanks.",
                buttons: {//gain scrap, lose fuel
                    'finish': {value: 'Leave.', next: 'end', result: {scrap: 50}}
                }
            },
            'ambush': {
                text: "As you open your hold and approach the cruiser, they deploy weapons. A trap!\nThey order you to surrender your scrap and some fuel.",
                buttons: {
                    'surrender': {value: "Give them what they want. (50 scrap, 50 fuel)", next: 'surrender', cost: {fuel: 50, scrap: 50}},
                    'escape': {value: "Try to escape.", next: 'damage'}
                }
            },
            'ambush fail': {
                text: "As you turn to leave, the cruiser deploys weapons. They were trying to lure you in.\nYou're able to escape with only minor damage.",
                buttons: {
                    'finish': {value: "Leave.", next: 'end', result: {health: -20}}//take damage, small
                }
            },
            'surrender': {
                text: "You surrender a loaded cargo capsule. The cruiser scoops it up and speeds off.\nYour hold is empty, but your ship is unharmed.",
                buttons: {
                    'finish': {value: "Leave.", next: 'end'}//lose fuel, scrap
                }
            },
            'damage': {
                text: "You close your hold and attempt to escape. The cruiser opens fire.\nYou were in a vulnerable position. Your ship takes heavy damage before you can get away.",
                buttons: {
                    'finish': {value: "Leave.", next: 'end', result: {health: -80}}//take damage, large
                }
            }
        }
        //chance to be a pirate trap, take damage or surrender fuel; or find stranded civilian ship, needs fuel, gives scrap
    },

    // BLACKHOLE: {
    //     icon: "B",
    //     scenes: {
    //         'start': {
    //             text: "Strange readings fill your terminal as light from faraway stars bends unnaturally around a distant point.\nYour ship computer warns you that you've found a black hole.",
    //             buttons: {
    //                 'approach': {value: "Approach the black hole.", next: 'approach1'},
    //                 'finish': {value: "Stay away.", next: 'end'}
    //             }
    //         },
    //         'approach1': {
    //             text: "You've heard rumors that entering a black hole can transport ships to random destinations anywhere in the galaxy.\nOr, it could just kill you outright.",
    //             buttons: {
    //                 'approach': {value: "Get closer.", next: 'approach2'},
    //                 'finish': {value: "Say no more. Let's get out of here.", next: 'end'}
    //             }
    //         },
    //         'approach2': {
    //             text: "'WARNING. EXTREME DANGER.' Critical alert messages flash on every screen in the cockpit as the black hole nears.\nThere's a chance you won't survive this.",
    //             buttons: {
    //                 'approach': {value: "You're just a computer, what do you know?", next: 'approach3'},
    //                 'finish': {value: "Follow the computer's advice.", next: 'end'}
    //             }
    //         },
    //         'approach3': {
    //             text: "Your crew murmurs nervously behind you.\nAre we really doing this?",
    //             buttons: {
    //                 'approach': {value: "We're really doing this.", next: 'approach4'},
    //                 'finish': {value: "Take the hint.", next: 'end'}
    //             }
    //         },
    //         'approach4': {
    //             text: "Seriously?",
    //             buttons: {
    //                 'approach': {value: "Seriously.", next: {4: 'die', 10: 'survive'}},
    //                 'finish': {value: "On second thought...", next: 'end'}
    //             }
    //         },
    //         'die': {
    //             text: "As it turns out, this particular black hole didn't have an endpoint. It's just a black hole.\nYour ship, your crew, and you are torn apart at a molecular level. It seems your journey is over.",
    //             buttons: {
    //                 'finish': {value: "Dead.", next: 'end', result: {health: -500}}//take damage guaranteed to kill
    //             }
    //         },
    //         'survive': {
    //             text: "The ship shudders violently as reality bends around you. It's impossible to process what you're seeing.\nAfter what feels like hours, your map shows you've been moved somewhere else entirely. Miraculously, you're alive!",
    //             buttons: {
    //                 'finish': {value: "The journey continues.", next: 'end'}//move to random point on map
    //             }
    //         }
    //     }
    //     //can teleport to random place on map, chance to instantly destroy ship
    // },

    PIRATE: {
        icon: "T",
        scenes: {
            'start': {
                text: "A large trade ship is being harassed by a heavily armed pirate vessel.\nThey haven't noticed your ship yet.",
                buttons: {
                    'intervene': {value: "Help the trader. Engage the pirate vessel.", next: {5: 'help fail', 10: 'help success'}},
                    'ignore': {value: "Stay out of it.", next: 'end'}
                }
            },
            'help fail': {
                text: "Your first shots miss, and the pirate vessel turns its sights to you. The trade vessel flees in the confusion.\nThe pirate's weapons are too powerful. You manage to get away, but your ship is damaged.",
                buttons: {
                    'finish': {value: "Leave.", next: 'end', result: {health: -50}}//take damage
                }
            },
            'help success': {
                text: "Your first shots hit and take the pirate by surprise. They stow their weapons and flee.\nThe trader is extremely grateful. They send over supplies as thanks.",
                buttons: {
                    'finish': {value: "Leave.", next: 'end', result: {scrap: 100, fuel: 50}}//gain scrap, fuel, tech
                }
            }
        }
        //attacking trader, can either ignore or intervene
        //intervene and lose causes significant damage, intervene and win to gain scrap and tech from trader
    },

    // TRADER: {
    //     icon: "T",
    //     scenes: {
    //         'start': {
    //             text: "A large trade ship lumbers through the system.\nThey hail you as you pass, offering their wares.",
    //             buttons: {
    //                 'buy fuel': {value: "Buy 50 fuel. (20 scrap)", next: 'buy fuel', cost: {scrap: 20}},
    //                 'buy engine': {value: "Buy engine upgrade.", next: 'buy engine'},
    //                 'buy sensors': {value: "Buy sensor upgrade.", next: 'buy sensors'},
    //                 'ignore': {value: "Leave.", next: 'end'}
    //             }
    //         },
    //         'buy fuel': {
    //             text: "The transaction clears.\nThe trade ship sends over a capsule of fuel.",
    //             buttons: {
    //                 'finish': {value: "Leave.", next: 'end', result: {fuel: 50}}//lose scrap, gain fuel
    //             }
    //         },
    //         'buy engine': {
    //             text: "A small shuttle leaves the trade ship and docks at your airlock. The engineer is polite and works quickly.\nYour engine will consume less fuel to travel.",
    //             buttons: {
    //                 'finish': {value: "Leave.", next: 'end'}//lose scrap, gain engine upgrade
    //             }
    //         },
    //         'buy sensors': {
    //             text: "A small shuttle leaves the trade ship and docks at your airlock. The engineer is polite and works quickly.\nThe upgraded sensors allow you to see farther.",
    //             buttons: {
    //                 'finish': {value: "Leave.", next: 'end'}//lose scrap, gain sensor upgrade
    //             }
    //         }
    //     }
    //     //offers tech in exchange for scrap, fuel for scrap
    // },

    // PLANET: {
    //     icon: "P",
    //     scenes: {
    //         'start': {
    //             text: "Your terminal crackles to life with a garbled distress signal coming from a nondescript desert world.\nIt seems a ship has crashed on the surface.",
    //             buttons: {
    //                 'investigate': {value: "Investigate the signal.", next: 'investigate'},
    //                 'ignore': {value: "Ignore the signal.", next: 'end'}
    //             }
    //         },
    //         'investigate': {
    //             text: "You send a team down to investigate, and they find a single haggard survivor.\nHe has been there a long time. His mental state is uncertain.",
    //             buttons: {
    //                 'rescue': {value: "Bring him back to the ship.", next: {4: 'sabotage', 10: 'new crew'}},
    //                 'abandon': {value: "He looks... twitchy. Leave him there.", next: 'end'}
    //             }
    //         },
    //         'sabotage': {
    //             text: "Setting foot on a space vessel triggers something in him, and he snaps.\nHe damages several modules in his frenzy before your crew can subdue him.",
    //             buttons: {
    //                 'finish': {value: "Leave.", next: 'end', result: {health: -30}}//take damage
    //             }
    //         },
    //         'new crew': {
    //             text: "He is relieved to be off the planet. Returning to space seems to calm him down.\nHe asks to join your crew.",
    //             buttons: {
    //                 'finish': {value: "Welcome aboard.", next: 'end'}//gain crew
    //             }
    //         }
    //     }
    //     //find crash survivor, may either sabotage ship and cause damage or become new crewmate
    // },

    DEPOT: {
        icon: "F",
        scenes: {
            'start': {
                text: "A small automated fuel depot appears on your scanners.\nIt clears you for a refueling procedure as you approach.",
                buttons: {
                    'finish': {value: 'Refuel.', next: 'end', result: {fuel: 50}}//gain fuel
                }
            }
        }
        //refuel
    },

    // SHIPYARD: {
    //     icon: "Y",
    //     scenes: {
    //         'start': {
    //             text: "A busy shipyard occupies the near side of a small moon orbiting an earth-like planet.\nSmall frigates weave in between colossal fleet carriers and dreadnoughts in dry dock.",
    //             buttons: {
    //                 'proceed': {value: 'Approach the shipyard.', next: 'decide'}
    //             }
    //         },
    //         'decide': {
    //             text: "Countless advertisements roll across your terminal, but one catches your eye.\nA vendor offers to upgrade your ship's armor plating.",
    //             buttons: {
    //                 'purchase': {value: 'Accept the offer.', next: 'buy armor', cost: {scrap: 50}},
    //                 'ignore': {value: 'Ignore the advertisement.', next: 'end'}
    //             }
    //         },
    //         'buy armor': {
    //             text: "A cluster of drones surround the ship. The sounds of welding and metalwork reverberate through the hull for a few hours.\nYour ship's hull is strengthened against incoming damage.",
    //             buttons: {
    //                 'finish': {value: 'Leave.', next: 'end'}//lose scrap, gain armor
    //             }
    //         }
    //     }
    //     //buy armor increase
    // },

    // STAR: {
    //     icon: "N",
    //     text: ["Your cabin is bathed in the eerie bluish-white light of a neutron star.\nMassive jets carry superheated plasma thousands of miles out from the poles of the star.",
    //     "Alerts flash on your console. Passing through the jets can temporarily overcharge your drive core.\nHowever, your ship may not be able to handle the strain..."],
    //     buttons: {}
    //     //neutron star, using it will cause damage but greatly increase next jump
    // },

    BEACON: {
        icon: "G",
        scenes: {
            'start': {
                text: "Telemetry data for the next system loads to your terminal as the beacon comes into range.\nOne step closer to home...",
                buttons: {
                    'finish': {value: 'Victory!', next: 'end'}//victory screen
                }
            }
        }
    }
}

//possible extra crewmates: mechanic, gives autoheal; navigator, gives extra sight range; engineer, increases move range