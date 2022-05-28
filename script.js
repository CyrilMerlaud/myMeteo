// permet de changer l'icône de météo selon le temps qu'il fait
const weatherIcons = {
    "Rain": "wi wi-day-rain",
    "Clouds": "wi wi-day-cloudy",
    "Clear": "wi wi-day-sunny",
    "Snow": "wi wi-day-snow",
    "Mist": "wi wi-day-fog",
    "Drizzle": "wi wi-day-sleet",
    "Hail": "wi wi-day-hailstorm",
}

// ipstack :
// api access key => f625f9bda83d88f112c52239a60d6ce5
// http://api.ipstack.com/2a01:e0a:5cc:85a0:9058:575a:286f:573b?access_key=f625f9bda83d88f112c52239a60d6ce5

// OpenWeather Map :
// clé API => eb34453d650389aa81ad1274fa49f90e

// fonction qui permet d'afficher la première lettre en majuscule
function capitalize(str) {
    return str[0].toUpperCase() + str.slice(1);  // Mettre en majuscule la première lettre de chaques mots 
}

// async =  ?
async function main(withIP = true) {
  // await = ?
  let ville;
  //
  // //
  // if(withIP) {
  //   const ip = await fetch('https://api.ipify.org?format=json')
  //     .then(resultat => resultat.json())
  //     .then(json => json.ip); 
 
  // //
  //   ville = await fetch(`http://api.ipstack.com/${ip}?access_key=78eea575ae65a6fff3d8fe31324581b7`)
  //     .then(resultat => resultat.json())
  //     .then(json => json.city);

  // } 
  
  // else {
    ville = document.querySelector('#ville').textContent;
  // }

  //altgr+7 (permet d'exclure ${ville} de la chaîne de charactère)
  // appel (via fetch) le nom de la ville sélectionnée, dans une base de donnée météo via une API fonctionnant avec une clé API intégrée au lien
    const meteo = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${ville}&appid=eb34453d650389aa81ad1274fa49f90e&lang=fr&units=metric`)
      .then(resultat => resultat.json())
      .then(json => json)

    // Affiche les informations liées à la météo
    displayWeatherInfos(meteo)
}


// fonction qui affiche les informations de météo avec comme paramètre "des données"
function displayWeatherInfos(data) {

   
    const name = data.name;                // constante nom qui contient les données du nom de la ville saisie
    const humidity = data.main.humidity;
    const temperature = data.main.temp;
    const conditions = data.weather[0].main;
    const description = data.weather[0].description;
    const pressure = data.main.pressure;
    const feels_like = data.main.feels_like;
    const temp_min = data.main.temp_min;
    const temp_max = data.main.temp_max;
    const speed = data.wind.speed;
    const country = data.sys.country;
    const coord_lat = data.coord.lat;
    const coord_lon = data.coord.lon;
    
    

   // Lit dans le html => le texte qui contient l'id "ville" puis l'affiche
    document.getElementById('ville').textContent = name;

    document.querySelector('#temperature').textContent = Math.round(temperature);
    document.querySelector('#conditions').textContent = capitalize(description);
    document.querySelector('i.wi').className = weatherIcons[conditions];

    document.body.className = conditions.toLowerCase();
    
    document.getElementById('humidity').textContent = humidity;
    document.getElementById('pressure').textContent = pressure;
    document.getElementById('feels_like').textContent = feels_like;
    document.getElementById('temp_min').textContent = temp_min;
    document.getElementById('temp_max').textContent = temp_max;
    document.getElementById('speed').textContent = speed*4;     // en multipliant par 4, on se rapproche de près de la valeur réelle en km/h et arrondie au centième près seulement
    document.getElementById('country').textContent = country;
    document.getElementById('coord_lat').textContent = coord_lat;
    document.getElementById('coord_lon').textContent = coord_lon;


    console.log(data)

}




const ville = document.querySelector('#ville');

// permet d'éditer le nom de la ville via un clique
ville.addEventListener('click', () => {
  ville.contentEditable = true;
});

// permet de lancer une requête à l'API quand on presse la touche "Entrer"
ville.addEventListener('keydown', (e) => {
  if(e.keyCode === 13) {
    e.preventDefault();
    ville.contentEditable = false;
    main(false);
  }
})

// lance la fonction main
main();