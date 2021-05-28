import React,{useState,useEffect} from 'react';
import {NativeSelect,FormControl} from '@material-ui/core';
import styles from './countryPicker.module.css';
import {fetchCountries} from '../../api';

// Drop down to select a country based on the selected country showing a bar chart and 
// showing cards with death, confirmed, active, and recovered details for that particular country. 
const CountryPicker = ({ handleCountryChange }) => {
    const [fetchedCountries, setFetchedCountries] = useState([]);
    useEffect(() => {
      const fetchAPI = async () => {
        setFetchedCountries(await fetchCountries());
      };
      fetchAPI();
    }, [setFetchedCountries]);
  
    return (
      <FormControl className={styles.formControl}>
        <NativeSelect
          defaultValue=""
          onChange={(e) => handleCountryChange(e.target.value)}
        >
          <option  value="">Global</option>
          {fetchedCountries.map((country, key) => (
            <option  key={key} value={country}>
              {country}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    );
  };
  
  export default CountryPicker;