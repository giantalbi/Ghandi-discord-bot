export default class Command{
    constructor(message){
        this.message = message;
    }
    
    Help(){
        message.channel.send(NAVY_PASTA);
    }
}