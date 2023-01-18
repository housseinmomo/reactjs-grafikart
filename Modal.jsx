// -------------------- Les testes -------------------------

import React, {useEffect, useCallback} from 'react'

import PropTypes from 'prop-types'

import {createPortal} from 'react-dom'
import { render } from 'react-dom'

// On peux tester composant par composant de maniere isoler : verification de la structure & des evenements 
// On peux tester l'ensemble de l'application (l'ensemble des composant) : monter l'application et tester 

export function Modal ({handleClick, children, title}) {

    return (
            <div className="container">
                <div className="alert alert-danger">
                    <h3>{title}</h3>
                    {children}
                    <button type="button" className="btn btn-warning" onClick={handleClick}> Declencher une alert</button>
                </div>
            </div>
    )
}

Modal.propTypes = {
    handleClick: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired
}