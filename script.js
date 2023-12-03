fetch('https://restcountries.com/v3.1/all')
    .then(response => response.json())
    .then(data => {
        countries = data.map(country => ({
            name: country.name.common,
            capital: country.capital ? country.capital[0] : 'N/A',
            population: country.population,
            languages: country.languages ? Object.values(country.languages) : ['N/A'],
            flag: country.flags.png
        }));
        renderCountries(countries);
    });
    const searchBox = document.getElementById("searchBox");
    const nameButton = document.getElementById("name");
    const capitalButton = document.getElementById("Capital")
    const populationButton = document.getElementById("population");
    const graph = document.getElementById("graph");
   const match = document.getElementById("match");

   
    //Code for the search box which filters the inputs according to the users input
let searchBy = "name"

searchBox.addEventListener("input", e => {
    const input = e.target.value.toLowerCase();
    const filteredCountries = countries.filter(country =>
        searchBy === "name"
            ? country.name.toLowerCase().includes(input)
            : country.capital.toLowerCase().includes(input)
    );
    match.textContent = `${filteredCountries.length} matches found`
    renderCountries(filteredCountries)
});

// Code for capitalButton in which the countries can be searched with the capital name
capitalButton.addEventListener("click", e => {
    searchBy = "capital";
    const sortedCountries = [...countries].sort((a, b) => a.capital.localeCompare(b.capital));
    match.textContent = `${sortedCountries.length} matches found.`;
    match.style.color = "#EC8F5E"
    renderCountries(sortedCountries);
});

// Code for nameButton in which the countries are arranged in alphabetical order
nameButton.addEventListener("click", e => {
    searchBy = "name";
    const sortedCountries = [...countries].sort((a, b) => a.name.localeCompare(b.name));
    match.textContent = `${sortedCountries.length} matches found.`;
    match.style.color = "#EC8F5E"
    renderCountries(sortedCountries);
});

// Code to render in terms of population
populationButton.addEventListener("click", e => {
    searchBy = "population";
    const sortedCountries = [...countries].sort((a, b) => b.population - a.population);
    renderCountries(sortedCountries);
});


 //Code to render the countries
 function renderCountries(countriesToRender){
  const container = document.getElementById('containerId'); 
  container.innerHTML = "";
  countriesToRender.forEach(country => {
      const countryElement = document.createElement("li");
      countryElement.classList.add("country")
      countryElement.style.backgroundColor = "lavender";
      countryElement.style.padding = "10px"; // Add padding
      countryElement.style.textAlign = "center"; // Center the text
     
      
      const flagElement = document.createElement("img");
      flagElement.src = country.flag;
      flagElement.style.width = "100px"; // Set width
      flagElement.style.height = "auto"; // Set height
      countryElement.appendChild(flagElement);

      const nameElement = document.createElement("h2");
      nameElement.textContent = country.name;
      nameElement.style.marginBottom = "10px"; // Add margin
      nameElement.style.display = "block"
      nameElement.style.marginTop = "5px"
      nameElement.style.color = "orange"
      countryElement.appendChild(nameElement);


      const capitalElement = document.createElement("p");
      capitalElement.textContent = `Capital: ${country.capital}`;
      capitalElement.style.margin = "0"; // Remove margin
      capitalElement.style.display = "block"
      countryElement.appendChild(capitalElement);

      const populationElement = document.createElement("p");
      populationElement.textContent = `Population: ${country.population}`;
      populationElement.style.margin = "0"; // Remove margin
      populationElement.style.display = "block"
      countryElement.appendChild(populationElement);

      const languagesElement = document.createElement("p");
      languagesElement.textContent = `Languages: ${country.languages.join(', ')}`;
      languagesElement.style.margin = "0"; // Remove margin
      languagesElement.style.display = "block"
      countryElement.appendChild(languagesElement);

      container.appendChild(countryElement);
  });
}


    //Code that generates the graph
 let myChart = null
    graph.addEventListener("click",e=>{
        let population = document.getElementById('populationButton');
        let language = document.getElementById('languageButton');
    
        if (!population) {
            population = document.createElement("button");
            population.id = 'populationButton';
            population.textContent = "population";
            const buttonContainer = document.getElementById("buttonContainer");
            buttonContainer.appendChild(population);
        }
    
        if (!language) {
            language = document.createElement("button");
            language.id = 'languageButton';
            language.textContent = "Language";
            const buttonContainer = document.getElementById("buttonContainer");
            buttonContainer.appendChild(language);
        }
   
        const output = document.getElementById("output");

        const chartContainer = document.getElementById('chartContainer');
        chartContainer.style.height = "600px";
        chartContainer.style.width = "700px";
        chartContainer.style.display = 'flex';
        chartContainer.style.marginLeft = "450px"
        chartContainer.style.justifyContent = 'center';
        chartContainer.style.alignItems = 'center';

        const scrollTarget = document.getElementById("scrollTarget")
        scrollTarget.scrollIntoView({ behavior: "smooth"});

        //Event listener for the population button
        population.addEventListener("click", e => {
            output.innerHTML = ""; 
            let ctx = document.getElementById('myChart');
            let labels = countriesData.map(data=>data.country);
            let data = countriesData.map(data=> data.population);
            
            // Destroy the previous chart if it exists
            if (myChart) {
              myChart.destroy();
            }
          
            myChart = new Chart(ctx,{
              type: "bar",
              data:{
                labels: labels,
                datasets:[{
                  label: "Population",
                  data: data,
                  backgroundColor: "red"
                }]
              },
              options : {
                scales:{
                  yAxes:[{
                    ticks:{
                      beginAtZero: true
                    }
                  }]
                }
              }
            });
          });
          
          //Event listener for the language button
          language.addEventListener("click", e => {
            output.innerHTML = ""; 
            let ctx = document.getElementById('myChart');
            let labels = languagesData.map(data=>data.language);
            let data = languagesData.map(data=>data.nativeSpeakers);
            if(myChart){
              myChart.destroy();
            }
             myChart = new Chart(ctx,{
              type: "bar",
              data:{
                labels: labels,
                datasets:[{
                  label: "Native Speakers",
                  data: data,
                  backgroundColor: "blue"
                }]
              },
              options : {
                scales:{
                  yAxes:[{
                    ticks:{
                      beginAtZero: true
                    }
                  }]
                }
              }
            });
          });

          

const countriesData = [
    { rank:1 , country : "world" , population : "8076192258"},
    {rank: 2, country : "china" , population: "1409517397"},
    {rank: 3, country : "India" , population: "1339180127"},
    {rank: 4, country : "United States" , population: "324459463"},
    {rank: 5, country : "Indonesia" , population: "263991379"},
    {rank: 6, country : "Brazil" , population: "209288278"},
    {rank: 7, country : "Pakistan" , population: "197015955"},
    {rank: 8, country : "Nigeria" , population: "190886311"},
    {rank: 9, country : "Bangladesh" , population: "164669751"},
    {rank: 10, country : "Russia" , population: "143989754"},
    {rank: 11, country : "Mexico" , population: "129163276"},
  ]
  
  const languagesData = [
    { language: "Chinese (Mandarin)", nativeSpeakers: 1100000000 },
    { language: "Spanish", nativeSpeakers: 460000000 },
    { language: "English", nativeSpeakers: 375000000 },
    { language: "Hindi", nativeSpeakers: 310000000 },
    { language: "Arabic", nativeSpeakers: 310000000 },
    { language: "Bengali", nativeSpeakers: 230000000 },
    { language: "Portuguese", nativeSpeakers: 220000000 },
    { language: "Russian", nativeSpeakers: 150000000 },
    { language: "Japanese", nativeSpeakers: 130000000 },
    { language: "Lahnda/Punjabi", nativeSpeakers: 100000000 }
  ];
    });