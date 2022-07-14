import React, { Component } from 'react'
import { Link } from "react-router-dom"
import PropTypes from "prop-types"
import { LeftOutlined } from '@ant-design/icons'

class ReturnPage extends Component {
    render() {
        const { url, title } = this.props

        return (
            <div className="ReturnPage">
                <Link to={url} className="nav-link BackButton d-flex align-items-center">
                    <LeftOutlined />
                    <span>{title}</span>
                </Link>
            </div>
        )
    }
}

ReturnPage.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
}

export default ReturnPage