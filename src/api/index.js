import axios from 'axios';

const url="https://covid19.mathdro.id/api";
// function to fetch the confirmed, recovered, and death details with last updated time
// according to the worldwide or according to the country wise. 
//fetchData function helps to fetch the data to display the results in the Cards component.
export const fetchData = async (country)=>{
    let updatedUrl=url;
    if(country){
        updatedUrl=`${url}/countries/${country}`;
    }

    try {
        const{
            data:{
                confirmed,
                recovered,
                deaths,
                lastUpdate
            },
        } = await axios.get(updatedUrl);

        return{
            confirmed,
            recovered,
            deaths,
            lastUpdate,
        };
    } catch (error) {
        console.log(error);
    }
}

//return response object having daily global data
// function to fetch the daily total deaths and total confirmed details with the respective dates.
// fetchDailyData function helps to fetch the data to display the results in the Chart component.
export const fetchDailyData = async ()=>{
    try {
        const {data} = await axios.get(`${url}/daily`);
        const modifiedData = data.map((dailyData)=>({
            confirmed: dailyData.confirmed.total,
            deaths : dailyData.deaths.total,
            date : dailyData.reportDate,
        }));
        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}
// function to fetch all countries
// fetchCountries function is to map the country’s shortened name with the Country’s name. 
// fetchCountries function helps to fetch the country name to display the results in the CountryPicker component.
export const fetchCountries = async ()=>{
    //returns an object containing an array of countries objects
    try {
        const{
            data:{
                countries
            },
        } = await axios.get(`${url}/countries`);
        return countries.map((country)=>country.name);
    } catch (error) {
        console.log(error);
    }
}