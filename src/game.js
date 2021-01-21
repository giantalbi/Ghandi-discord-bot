
function Game(Name, Users, pDate, Done = null){
    this.Name = Name;
    this.Users = Users;
    this.Date = pDate;
    this.Done = null;
}

Game.prototype.toString = function(){
    let g = this;
    let lstGamesStr = "";
    lstGamesStr += `***${g.Name}***\n *${new Date(g.Date)}*\n`;
    lstGamesStr += "Status - " + (g.Done != null ? "Over" : "Unfinished") + "\n";
    for(let u of g.Users)
        lstGamesStr += `${u} `;
    lstGamesStr += `\n`;

    return lstGamesStr;
}

export default Game;