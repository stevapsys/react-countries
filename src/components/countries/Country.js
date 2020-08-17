import React, { Component } from 'react'
import css from './countries.module.css'


export default class Country extends Component {
    render() {
        const { country } = this.props;
        const { name, flag } = country; 
        return (
            <div className={css.borderCountry} >
                <img src={flag} alt={name} className={css.flag} />
              <span className={css.name}>{name} </span>  
            </div>
        )
    }
}
