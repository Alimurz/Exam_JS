const search = document.querySelector('#InputText');

search.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.value) {
        weather(search.value);
        search.value = '';
    }
});
async function weather() {
    const api = `https://api.weatherapi.com/v1/current.json?key=a95a2076056d4fc79ae54706231711&q=${search.value}`;
    const response = await fetch(api);
    const data = await response.json();
    console.log(data, 'data');

    const localtime = data.location.localtime.split(' ')
    const [date, time] = localtime
    const now = new Date(date)
    
    const formattedDate = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    
    document.getElementById('date').innerHTML = formattedDate
    document.getElementById('time').innerHTML = time
    document.getElementById('place').innerHTML = data.location.name + ', ' + data.location.country
    document.getElementById('weather-status-item-1').innerHTML = data.current.feelslike_c + "°c"
    document.getElementById('weather-discription').innerHTML = data.current.condition.text
    document.getElementById('weather-icon').src = `https:${data.current.condition.icon}`
    document.getElementById('weather-measure').innerHTML = data.current.temp_c + "°c"
    document.getElementById('weather-status-item-2').innerHTML = data.current.humidity + "%"
    document.getElementById('weather-status-item-3').innerHTML = data.current.gust_kph + "kph"
}