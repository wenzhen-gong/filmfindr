require('dotenv').config();

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const testInput = {
    question_1: "neutral",
    question_2: "a Movie Night with Friends",
    question_3: ["Western", "Fantasy", "Sci-fi", "Drama"],
    question_4: "I want the movie to be published in the last 5 years",
    question_5: "Age-appropriateness is not important to me",
    question_6: ["Once upon A time in Hollywood", "John Wick", "Little Miss Sunshine"],
    question_7: ["James Bond Quantum of Solace", "Bonnie's big day off"],
}

let q1, q2, q3, q4, q5, q6, q7;

for (const key in testInput) {
    switch (key) {
        case "question_1":
            q1 = testInput[key];
            break;
        case "question_2":
            q2 = testInput[key];
            break;
        case "question_3":
            q3 = testInput[key].join(", ");
            break;
        case "question_4":
            q4 = testInput[key];
            break;
        case "question_5":
            q5 = testInput[key];
            break;
        case "question_6":
            q6 = testInput[key].join(", ");
            break;
        case "question_7":
            q7 = testInput[key].join(", ");
            break;
        default:
            break;
    }
}

async function run() {
    const model = genAI.getGenerativeModel({ model: "gemini-pro"});
  
    const prompt = `I'm looking for three movie recommendations based on these criteria:

    1. I am ${q1} today
    2. ${q2}
    3. I'm interested in these genres: ${q3}
    4. ${q4}
    5. ${q5}
    6. I want a movie that is similar to these movies: ${q6}
       I've already seen these movies. Please do not recommend them to me: ${q7}

    Please only return a json with a Title property and a Reason property based on the above prompt.
    `;
  
    console.log("prompt: ", prompt)
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let responseStr = response.text();

    console.log("responseStr: ", responseStr)
    if (responseStr.charAt(0) === '`'){
        responseStr = responseStr.trim().slice(7, -4);
    }

    const suggestionsArr = JSON.parse(responseStr);

  }
  
  run();