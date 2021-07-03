import React from 'react'
import { connect } from 'react-redux'
//needs to render the proper icon depending on if event or player is present on tile
//make a 'visited' flag so events wont run again if tile is revisited

// handleEvent() {
//     // when user hits this component and component has event, show modal
// }

function Tile(props) {
    return (
        <p>
            {props.occupied ? props.playerIcon : props.eventIcon ? props.eventIcon : props.defaultIcon}
        </p>
    )
}

//map dispatch
export default connect()(Tile)
//default icon, event icon, player icon