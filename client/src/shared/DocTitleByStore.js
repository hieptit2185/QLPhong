import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

class DocTitleByStore extends Component {
    render() {
        const { title } = this.props

        return (
            <Helmet>
                <title>{title}</title>
            </Helmet>
        )
    }
}

DocTitleByStore.propTypes = {
    title: PropTypes.string.isRequired,
}

export default DocTitleByStore