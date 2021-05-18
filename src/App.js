import React from 'react';
import {Cards,Chart,CountryPicker} from './components';
import styles from './app';
import {fetchData} from './api';
import coronaImage from './images/corona.png';

// Component is responsible for sending country & data together into a single view so the website 
// can dynamically change based on the country’s selection whether to show a bar chart or line chart.
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
        const fetchedData=await fetchData();
        this.setState({data:fetchedData,country:country});
    }

    render(){
        const {data,country}=this.state;
        return(
            <div className={styles.container}>
                <img className={styles.image} src={coronaImage} alt="COVID-19"/>
                <br/>
                <text>
                    <b>Global and Country Wise COVID-19 cases</b>
                </text>
                <br/>
                <br/>
                <Cards data={data} country={country}/>
                <CountryPicker handleCountryChange={this.handleCountryChange}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }

}
export default App;