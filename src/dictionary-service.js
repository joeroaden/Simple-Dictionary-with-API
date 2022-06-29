export default class DictionaryService {
  static getDefinition(word) {
    return fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}
