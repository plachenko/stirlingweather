// WeatherAPI class
import axios from 'axios'

export default class WeatherAPI {
  private _apikey: string;
  private _baseurl = "https://api.openweathermap.org/data/2.5/weather?";

  public error!: string;
  public data!: object;

  constructor (_apikey: string){
    this._apikey = _apikey;
  }

  public getData(query: string){
    let url = this._baseurl + query + '&APPID=' + this._apikey + '&units=imperial';
    axios.get(url)
      .then((res) => {
        this.data = res.data;
      })
      .catch((err) => {
        this.error = err.response.data.message;
      });
  }

}
