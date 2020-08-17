import React, { Component } from 'react'
import { formatNumber } from '../helpers/formatHelpers';
import css from './header.module.css'

export default class Header extends Component {
    handleInputChange = (event) => {
       // console.log(event.target.value);
       const newText = event.target.value;
        this.props.onChangeFilter(newText); 
    };

    render() {
        const { filter, countryCount, totalPopulation } = this.props; 
        return (
            <div className={css.flexRow}>
                <input placeholder="Digite o nome do país em Inglês" type="text" value={filter} onChange={this.handleInputChange}></input> | 
                <span className={css.countries} >Países: <strong>{countryCount}  </strong></span> | 
                <span className={css.population}> População: <strong>{formatNumber(totalPopulation)}</strong>  </span>
            </div>
        )
    }
}
