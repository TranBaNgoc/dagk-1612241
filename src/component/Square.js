import React from "react"
// import PropTypes from 'prop-types'
// import { connect } from "net";

class Square extends React.PureComponent {

    render() {
        const { styles, color, onClick, value } = this.props
        // console.log(this.props.background)
        const divStyle = {
            background: styles,
            color
        };
        // console.log(this.props.)
        return (
            <button
                type="button"
                style={divStyle}
                className="square"
                onClick={onClick}            >
                {value}
            </button>
        );
    }
}

// Square.prototype ={
//     styles=PropTypes.string.isRequired,
//     color = PropTypes.string.isRequired,
//     onClick = PropTypes.func.isRequired,
//     value  = PropTypes.string.isRequired
// }

export default Square
