import React, { Fragment } from 'react'

const Clock = ({ value, type, isDanger }) => {
    return (
        <Fragment>
            <div>
                <div>
                    <div className={isDanger ? 'text-success' : 'text-danger'}>
                        <p>{value}<span>{type}</span></p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Clock;