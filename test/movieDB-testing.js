// const modelurl = `https://api.themoviedb.org/3/search/movie?query=Dune&include_adult=false&language=en-US&primary_release_year=2021`;
// const testurl = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&primary_release_year=${date}`;


// async function callTMBD(req, res, next){
    //     const suggestionsArr = res.locals.suggestionsArr;
    
//     suggestionsArr.forEach(movie => {
//         let title = movie.title;
//         let date = movie.date;
//         let url = `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&primary_release_year=${date}`;

//         fetch(url, options)
//         .then(json => console.log(json))

//         })

//     };



// fetch(url, options)
//   .then(res => res.json())
//   .then(json => console.log(json))
//   .catch(err => console.error('error:' + err));

  const genreTable = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Science Fiction",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western"
  };



// const newMovieObject = {
    //     title: originalMovieObject.title,
//     overview: originalMovieObject.overview,
//     genres: originalMovieObject.genre_ids, // Assuming genre_ids is an array of genre ids
//     poster_path: `https://image.tmdb.org/t/p/w500${originalMovieObject.poster_path}` // Customize the size if needed
//   };

const suggestionsObj = {
    suggestionsArr: [
    {
        Title: "Dune",
      Date: "2021",
      Reason: "Dune is a science fiction film with stunning visuals and an epic storyline, making it a great choice for a movie night with friends."
    },
    {
      Title: "The Power of the Dog",
      Date: "2021",
      Reason: "The Power of the Dog is a Western drama with a complex and compelling story, making it a great choice for those interested in both Western and drama genres."
    },
    {
        Title: "The Last Duel",
      Date: "2021",
      Reason: "The Last Duel is a historical drama with a star-studded cast and an intriguing story, making it a great choice for those interested in historical dramas."
    }
  ]
};

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTQ2MDE4YWM2NTc1MGMwYTY4MGMwYmY2ZWVhYmVjNyIsInN1YiI6IjY1ZTY4ZmUzZjg1OTU4MDE3YjlhNjA5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qoy7JhJolYXc0MOjK2-yXRNSW4Ea1raX5g38liW9AiM'
  }
};

const mockrecsArr = [
    {
        Picture: "3oifweofofj",
        Title: "The revenge of Marvin Gaye",
        Genre: ["Horror, Comedy, Erotic"],
        Description: "That's right folks, Marvin Gaye has had ENOUGH! He's back with his sidekick, grumby dumpsterton, to kill everyone who has enjoyed his songs",
        Reason: "You like dumb movies and you need to see some real ~*CINEMA*~"
    }
]
  async function run() {
    // pull from the res.locals and get the suggestions Object
      const filteredResultsArr = [];
      const recsArr = [];

      //replace suggestionsObj
      for (const movie of suggestionsObj.suggestionsArr) {
        const searchTitle = movie.Title;
        const date = movie.Date;
        const reason = movie.Reason;
        const url = `https://api.themoviedb.org/3/search/movie?query=${searchTitle}&include_adult=false&language=en-US&primary_release_year=${date}&api_key=YOUR_API_KEY`;
    
        try {
          const response = await fetch(url, options);
          const data = await response.json();
        //   console.log(`Results for ${searchTitle} (${date}):`, data);
        
          let results = data.results;

          if (results.length !== 1){
              results = results.filter(movie => movie.title === searchTitle);
            }

            filteredResultsArr.push(...results)
            //   console.log(`recommendationsArr: `, recommendationsArr);

            filteredResultsArr.forEach(movie => {

                const genres = movie.genre_ids.map(genreId => genreTable[genreId]);

                const rec = {
                    picture: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                    title: movie.title,
                    genre: genres,
                    overview: movie.overview,
                    reason: reason
                };
            
                recsArr.push(rec);
            });

        //store the final recsArr on the res.locals
        console.log("recsArr: ", recsArr)

        next()
        } catch (error) {
          console.error(`Error fetching data for ${searchTitle} (${date}):`, error);
        }
      }
    //   console.log(filteredResultsArr)
      
    

    }
  
  run();