

// Function to handle form submission and initiate poem generation
function showGeneratedPoem(event) {
  event.preventDefault();
  generatePoem() ;
}

// Event listener for form submission
let poemFormElement = document.querySelector("#poem-form");
poemFormElement.addEventListener("submit", showGeneratedPoem);

// Function to handle the response and display the generated poem
function handlePoemResponse(response) {
  if (response && response.data) {
      console.log(response.data.answer);
      let poem = response.data.answer;
      // Initialize Typewriter to display the poem
      new Typewriter('#poem', {
          strings: poem,
          autoStart: true,
          cursor: '',
          delay: 100,
      });
  } else {
      console.error("Invalid response format");
  }
}

// Function to generate a poem
function generatePoem() {
  // User input and API details
  let instructionsInput = document.querySelector("#poemInput");
  let apiKey = "ec0ft3ef184fa26o40bf0860bad82dc8";
  let context =
    "You are a poetic guide inspired by the harmony of nature. Your mission is to craft a poem that revolves around the essence of personal growth and nature's wisdom, with a focus on the user's instructions and nature as the centerpiece.The poem should have a maximum of 20 words and 4 lines. Your poems are short and sweet.";
    let prompt = `User instructions are: Create a poem with ${instructionsInput.value} at its very heart. Make sure to mention the exact word ${instructionsInput.value} in your poem. Please make sure to separate each verse of the poem with a paragraph of html <p>. Sign the poem with <strong>NatureVerseCraft</strong>.`;
    let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${prompt}&context=${context}&key=${apiKey}`;

// Access the element with ID 'poem'
let poemElement = document.getElementById('poem')
// Add a class to the element
poemElement.classList.add('poem');

  // Display loading message while waiting for the poem
  new Typewriter('#poem', {
      strings: "Poem loading...",
      autoStart: true,
      cursor: '',
      delay: 100,
  });

  
  // Wrap the axios request inside the setTimeout function
  setTimeout(() => {
      axios.get(apiUrl).then(handlePoemResponse);
  }, 5000);
}



