export default class questionApi {
    
    
    static getQuestions() {

        let url = `https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple`;

        return fetch(url).then(response => {
            if(response.ok){
                return response.json();
            }
            
        }).catch(error => {
            console.log(error.message)

        });
    }
}