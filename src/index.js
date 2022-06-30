import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import DictionaryService from "./dictionary-service.js";
import GiphyService from "./giphy-service.js";

function clearFields() {
  $("#word").val("");
  $('.showErrors').text("");
  
}

function displayDefinition(partOfSpeech,definition, synonyms) {
  $(".showPartOfSpeech").text(`Part of Speech: ${partOfSpeech}` );
  $(".showDefinition").text(`Definition: ${definition}` );
  $(".showSynonym").text(`Synonyms: ${synonyms}` );
  // let definitionArray = description[0].meanings[0].definitions;
  // let myJSON;
  // definitionArray.forEach(function (element) {
  //   console.log(element);
    
  //   let myJSON = JSON.stringify(element);
  //   return myJSON;
    
  // });
  // console.log(myJSON);
  
  // $(".showDefLoop").html(myJSON); ///<p>element.definition</p>
}

function displayGif(response) {
  $(".showGif").html(`<img src="${response.data[1].images.downsized_medium.url}"/>`);
}

function displayErrors(error) {
  $('.showErrors').text(`${error}`);
}


$(document).ready(function () {
  $("#getDefinition").click(function () {
    let word = $("#word").val();
    clearFields();
    DictionaryService.getDefinition(word)
      .then(function (dictionaryResponse) {
        if (dictionaryResponse instanceof Error) {
          throw Error (`Free Dictionary API error: ${dictionaryResponse.message}`);
        }
        const definitionDescription = dictionaryResponse[0].meanings[0].definitions[0].definition;
        const partOfSpeechDescrition = dictionaryResponse[0].meanings[0].partOfSpeech;
        const synonymsDescription = dictionaryResponse[0].meanings[0].synonyms;
        displayDefinition(partOfSpeechDescrition, definitionDescription, synonymsDescription);
        return GiphyService.getGif(word);
      })
      .then(function (giphyResponse) {
        if (giphyResponse instanceof Error) {
          throw Error (`Giphy API error: ${giphyResponse.message}`);
        }
        displayGif(giphyResponse);
      })
      .catch(function(error){
        displayErrors(error.message);
      });
  });
});
