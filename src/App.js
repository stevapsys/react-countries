import React, { Component } from 'react';
import 'materialize-css';
import Countries from './components/countries/countries';
import Header from './components/header/Header';

export default class App extends Component {
    constructor(){
      super();

      this.state = {
        allCountries: [], 
        filteredCountries: [],
        filteredPopulation: 0, 
        filter: ''
      }; 
    }
    //chamando a API 
    async componentDidMount() {
      const res = await fetch('https://restcountries.eu/rest/v2/all');
      const json = await res.json(); 
      //console.log(json);

      //chamando o que eu quero da API 
      const allCountries = json.map(({name, numericCode, flag, population}) => {
        return {
          id: numericCode,
          name, 
          filterName: name.toLowerCase(),
          flag,
          population, 
        }
      });
        
      const filteredPopulation = this.calculateTotalPopulationFrom(allCountries);

      this.setState({
        allCountries, 
        filteredCountries: Object.assign([], allCountries), 
        filteredPopulation
            }); 
    }

    calculateTotalPopulationFrom = (countries) => {
      const filteredPopulation = countries.reduce((accumulator, current) => {
        return accumulator + current.population;
      }, 0); 
      return filteredPopulation
    }

    hendleChangeFilter = (newText) => {
      //console.log(newText); 

      this.setState({
        filter: newText,
      }); 

      const filterLowerCase = newText.toLowerCase();
      
      const filteredCountries = this.state.allCountries.filter((country) => {
       return country.filterName.includes(filterLowerCase);
      });

      const filteredPopulation = this.calculateTotalPopulationFrom(filteredCountries);
 
      this.setState({
        filteredCountries,
        filteredPopulation

      })
    }

    render () {
      const { filteredCountries, filter, filteredPopulation } = this.state; 
        //console.log(allCountries); 
      return ( 
      <div className="container">
        <h1 className="center-align">React Countries</h1> 
        <Header filter={filter}
         countryCount={filteredCountries.length}
         totalPopulation={filteredPopulation}
         onChangeFilter={this.hendleChangeFilter}/> 

        <Countries countries={filteredCountries}></Countries>
      </div>
      ); 
  }
}