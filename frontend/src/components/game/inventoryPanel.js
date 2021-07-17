import React from 'react'
import { connect } from 'react-redux'

function InventoryPanel(props) {

    return(
        <div className='inventory'>
            <p>Health: {props.player.health}</p>
            <p>Fuel: {props.player.fuel}</p>
            <p>Scrap: {props.player.scrap}</p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        player: state.player
    }
}

export default connect(mapStateToProps)(InventoryPanel)