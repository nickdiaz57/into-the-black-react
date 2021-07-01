import React from 'react'
import { connect } from 'react-redux'
//needs to render the proper icon depending on if event or player is present on tile
//make a 'visited' flag so events wont run again if tile is revisited
function Tile(props) {
    return (
        <p>
            {props.icon}
        </p>
    )
}

//map dispatch
export default connect()(Tile)
// export default Tile