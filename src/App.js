import React from 'react';
import {Cards,Chart,CountryPicker} from './components';
import styles from './app.module.css';
import {fetchData} from './api';
import coronaImage from './images/covid19_image.png';

// Component is responsible for sending country & data together into a single view so the website 
// can dynamically change based on the country’s selection whether to show a bar chart or line chart.
// App Component is a class component that has asynchronous React lifecycle method componentDidMount.
class App extends React.Component{
    state={
        data:{},
        country:"",
    };
    
    async componentDidMount(){
        const fetchedData=await fetchData();
        this.setState({data:fetchedData});
    }
    handleCountryChange=async (country)=>{
        const fetchedData=await fetchData(country);
        this.setState({data:fetchedData,country:country});
    }

    render(){
        const {data,country}=this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                
                <br/>
                <p>
                    <strong>Global and Country Wise COVID-19 cases</strong>
                </p>
                <p>
                <i>(For a Particular country, select a Country from below)</i>
                </p>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Cards data={data} country={country}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }

}
export default App;