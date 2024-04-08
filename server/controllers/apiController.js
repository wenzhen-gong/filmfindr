
require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const TMDBoptions = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTQ2MDE4YWM2NTc1MGMwYTY4MGMwYmY2ZWVhYmVjNyIsInN1YiI6IjY1ZTY4ZmUzZjg1OTU4MDE3YjlhNjA5YSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qoy7JhJolYXc0MOjK2-yXRNSW4Ea1raX5g38liW9AiM'
    }
  };

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

const apiController = {
    async callGemini (req, res, next) {
        try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        // console.log("req.body in gemini: ", req.body);
        let q1, q2, q3, q4, q5, q6, q7;

            for (const key in req.body) {
                switch (key) {
                    case "question_1":
                        q1 = req.body[key];
                        break;
                    case "question_2":
                        q2 = req.body[key];
                        break;
                    case "question_3":
                        q3 = req.body[key].join(", ");
                        break;
                    case "question_4":
                        q4 = req.body[key];
                        break;
                    case "question_5":
                        q5 = req.body[key];
                        q5 === "Yes" ? q5 = "These movies absolutely must be kid friendly" : q5 = "Movie can be any rating";
                        break;
                    case "question_6":
                        q6 = req.body[key].join(", ")
                        break;
                    case "watchedMovies":
                        q7 = req.body[key].map(movie => movie.MovieTitle).join(', ');
                        break;
                    default:
                        break;
                }
            }
                  
                    const prompt = `I'm looking for three movie recommendations based on these criteria:
                
                    1. I feel ${q1} today
                    2. ${q2}
                    3. I'm interested in these genres: ${q3}
                    4. I want movies from ${q4}
                    5. ${q5}
                    6. I want a movie that is similar to these movies: ${q6}
                       I've already seen these movies. NEVER recommend these to me: ${q7}
                
                    You must return a javascript array of JSON objects, each object with a "Title" property, a "Year" property assigned the release year and a "Reason" property based on the above prompt.
                    `;
                  
                    console.log("Prompt: ", prompt)
                    const result = await model.generateContent(prompt);
                    const response = await result.response;
                    let responseStr = response.text();

                    // console.log("responseStr: ", responseStr)
                    
                    // console.log("type of responseStr: ", typeof responseStr)

                    
                    if (responseStr.charAt(4) === 's'){
                        responseStr = responseStr.trim().slice(5, -4).trim();
                    }
                    if (responseStr.charAt(4) === 'a'){
                        responseStr = responseStr.trim().slice(13, -4);
                    }
                    if (responseStr.charAt(3) === '['){
                        responseStr = responseStr.trim().slice(4, -4);
                    }
                    
                    // console.log("spliced responseStr: ", responseStr)

                    const suggestionsArr = JSON.parse(responseStr);
                    // console.log("what is getting added to res.locals: ", suggestionsArr)

                    res.locals.suggestionsArr = suggestionsArr;

                    next();
                  } catch (err) {
                      next({
                            log: `callGemini: ${err}`,
                            message: {
                                err: 'Gemini servers are overloaded. A re-request will be executed in 3 seconds',
                            },
                            status: 500,
                        });
                    } 
        },
        async callTMDB(req, res, next) {

            const suggestionsArr = res.locals.suggestionsArr;

            // console.log("passed in suggestionsArr: ", suggestionsArr)

            const filteredResultsArr = [];
            const recsArr = [];

        try {
            for (const movie of suggestionsArr) {
                const searchTitle = movie.Title;
                const year = movie.Year;
                const reason = movie.Reason;
                const url = `https://api.themoviedb.org/3/search/movie?query=${searchTitle}&include_adult=false&language=en-US&primary_release_year=${year}&api_key=YOUR_API_KEY`;

                const response = await fetch(url, TMDBoptions);
                const data = await response.json();

                let results = data.results;

                // console.log(`Results of ${searchTitle} to TMDB:`, results)

                if (results.length !== 1) {
                    results = results.filter(movie => movie.title === searchTitle);
                }

                filteredResultsArr.push({ ...results[0], reason, year });
            }

        // console.log("made TMDB fetch and made filteredResultsArr: ", filteredResultsArr);

        filteredResultsArr.forEach(movie => {
            const genres = movie.genre_ids.map(genreId => genreTable[genreId]);
            const reason = movie.reason;
            const year = movie.year;


            const rec = {
                picture: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
                title: movie.title,
                genre: genres,
                overview: movie.overview,
                reason: reason,
                year: year
            };

            recsArr.push(rec);
        });

        // console.log("final recsArr: ", recsArr);
        res.locals.recsArr = recsArr;
        next();
        } catch (err) {
            next({
                log: `callTMDB: ${err}`,
                message: {
                    err: 'Having problems with TMDB. A re-request will be executed in 3 seconds',
                },
                status: 500,
            });
        }
    },
            
}

module.exports = apiController;
