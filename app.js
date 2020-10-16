function refresh() {
  document.getElementById("Response").innerHTML = "";
  document.getElementById("secretTable").innerHTML = "";
  document.getElementById("Description").innerHTML = "";
}
var button = document.getElementById("button");

button.addEventListener("click", function() {
  let category = document.getElementById("Selector");
  let type = category.options[category.selectedIndex].value;


  //Generalizer
  if (type == "Generalizer") {
    fetch("https://sentim-api.herokuapp.com/api/v1/", {

        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text: document.getElementById("UserInput").value,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        refresh();
        console.log(data);
        var degree = data["result"]["polarity"];
        var polarity = data["result"]["type"];
        var descriptor1 = "You chose a general analisys. This means we will show you a sentiment score and degree score. Our sentiment score qualifies a your text as being overall positive, negative, or Nuetral. Our degree score quantifies that sentiment from a range of 1, meaning maximum positivity, to -1, meaning maximum negativity. 0 is nuetral."
        var qualifier = "error";
        document.getElementById("Description").innerText = descriptor1;
        if (degree > .5 || degree < -.5) {
          qualifier = "very"
        } else if (degree < .5 && degree > -.5) {
          qualifier = "somewhat"
        }
        var looksLike = "Looks like a " + qualifier + " " + polarity + " statment.\r\n Polarity Score: " + polarity + " and Degree Score: " + degree + ".";

        document.getElementById("Response").innerText = looksLike;
      });
  }
  //breakdown
  else {
    fetch("https://sentim-api.herokuapp.com/api/v1/", {

        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          text: document.getElementById("UserInput").value,
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        //refresh
        refresh();

        //creating table
        var intro = document.createElement("h1");
        document.getElementById("secretTable").innerHTML = "Sentences"
        var division = document.createElement("br", {"id":"line"});
        document.getElementById("secretTable").appendChild(division);

        //createData
        var numSentences = data["sentences"]["length"];

        for (i = 0; i < numSentences; i++) {

          var newDiv = document.createElement("div");
          newDiv.id = "theDiv";
          document.getElementById("secretTable").appendChild(newDiv);

          var sentence = document.createElement("p");
          document.getElementById("theDiv").appendChild(sentence);
          sentence.innerHTML = (1+i) + ") &quot" + data["sentences"][i]["sentence"] + "&quot";

          var sentiment = document.createElement("p");
          document.getElementById("theDiv").appendChild(sentiment);
          sentiment.innerHTML = "Sentiment: " + data["sentences"][i]["sentiment"]["type"]

          var degree = document.createElement("p");
          degree.id = "last"
          document.getElementById("theDiv").appendChild(degree);
          degree.innerHTML = "degree: " + data["sentences"][i]["sentiment"]["polarity"]




        }
      });
  }


})
