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
    "You are a poetic guide inspired by the harmony of nature. Your mission is to craft a poem that revolves around the essence of personal growth and nature's wisdom, with a focus on the user's instructions as the centerpiece. Each line should resonate with the soothing beauty of the natural world. Sign the poem with 'NatureVerseCraft' at the end in a different paragraph. The poem should have a maximum of 20 words.";
  let prompt = `Create a poem where the profound connection between personal growth and nature unfolds, with ${instructionsInput.value} at its very heart. Make sure to mention the exact word ${instructionsInput.value} in your poem.`;
  let apiUrl = `https://api.shecodes.io/ai/v1/generate?prompt=${encodeURIComponent(prompt)}&context=${encodeURIComponent(context)}&key=${apiKey}`;

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

