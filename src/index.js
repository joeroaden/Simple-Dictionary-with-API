import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import DictionaryService from "./dictionary-service.js";


function clearFields() {
  $("#word").val("");
}

function getElements(response) {
  if (response) {
    $(".showPartOfSpeech").text(`Part of Speech:${response[0].meanings[0].partOfSpeech}` );
    $(".showDefinition").text(`Definition:${response[0].meanings[0].definitions[0].definition}` );
    $(".showSynonym").text(`Synonyms:${response[0].meanings[0].synonyms}` );
    
  } else {
    $(".showErrors").text(`There was an error: ${response.message}`);
  }
}

$(document).ready(function () {
  $("#getDefinition").click(function () {
    let word = $("#word").val();
    clearFields();
    DictionaryService.getDefinition(word)
      .then(function (response) {
        getElements(response);
      });
  });
});
