import React from 'react';
import {Cards,Chart,CountryPicker} from './components';
import styles from './app';
import {fetchdata} from './api';
import coronaImage from './images/corona.png';

// Component is responsible for sending country & data together into a single view so the website 
// can dynamically change based on the country’s selection whether to show a bar chart or line chart.
class App extends React.Component{
    state={
        data:{},
        country:"",
    };

}