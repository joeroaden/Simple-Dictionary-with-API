import $ from "jquery";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/styles.css";
import DictionaryService from "./dictionary-service.js";

function clearFields() {
  $("#word").val("");
}

function getElements(response) {
  if (response.main) {
    $(".showDefinition").text(
      `Definition:${response.meanings[0].definitions.definition}`
    );
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
