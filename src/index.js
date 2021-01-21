'use strict';

import jsonLoader from "jsonloaderv2";
import discord from 'discord.js';
// import {client} from 'discord.js';

import Game from "./game";

const TOKEN = "<TOKEN HERE>";
const BOTID = "<BOT ID HERE>";

const NAVY_PASTA = `What the fuck did you just fucking say about me, you little bitch? I'll have you know I graduated top of my class in the Navy Seals, and I've been involved in numerous secret raids on Al-Quaeda, and I have over 300 confirmed kills. I am trained in gorilla warfare and I'm the top sniper in the entire US armed forces. You are nothing to me but just another target. I will wipe you the fuck out with precision the likes of which has never been seen before on this Earth, mark my fucking words. You think you can get away with saying that shit to me over the Internet? Think again, fucker. As we speak I am contacting my secret network of spies across the USA and your IP is being traced right now so you better prepare for the storm, maggot. The storm that wipes out the pathetic little thing you call your life. You're fucking dead, kid. I can be anywhere, anytime, and I can kill you in over seven hundred ways, and that's just with my bare hands. Not only am I extensively trained in unarmed combat, but I have access to the entire arsenal of the United States Marine Corps and I will use it to its full extent to wipe your miserable ass off the face of the continent, you little shit. If only you could have known what unholy retribution your little "clever" comment was about to bring down upon you, maybe you would have held your fucking tongue. But you couldn't, you didn't, and now you're paying the price, you goddamn idiot. I will shit fury all over you and you will drown in it. You're fucking dead, kiddo.`;
const GENO_PASTA = "You have reached the phone of Gino Fratelli. I'm not here right now, and uh, if this is Khonjin, hang up. I don't want to talk to you. I-I- The problem with you, is uh... It's words. Words lack the parameters to accurately describe how I feel about you. But maybe this will help. Every night, I have a recurring dream. It's you, sleeping in your bed. And it's me, with a pair of garden shears. And I tear that stupid ass nose right off your face, and I put it on top of my fireplace. And when your dumbass daddy comes over, trying to get it back, 43 trucks fall out of the sky, and land EXACTLY where he's standing, killing him instantly. One day, it'll happen..";

const commands = [
    {name: "help", description: "🤔"},
    {name: "add", description: "Add a new game", usage: "add [game name] [userPing1 userPing2 ...]"},
    {name: "all", description: "List all the games", usage: `all (done, unfinished)`},
    {name: "where", description: "Check all the games the user is in.", usage: "where (discord user)"},
    {name: "finish", description: "Set a given saved game as finished.", usage: "finish (winning discord user)"},
    {name: "ping", description: "pong... what did you expect ?"},
    {name: "bitch", hidden: true},
    {name: "phone", hidden: true},
]

const discordClient = new discord.Client()


let gameLoader = new jsonLoader("game.json");
let savedGameFile = gameLoader.get();
// let games = [];
// games.push(Game("Test", []));


// gameFile.Games = games;

function save(success, error){

    gameLoader.save(savedGameFile).then(function(message){    
        // Save success
        if(success) success();
        // console.log(message);    
    }, function(err){
        if(error) error();
        // Save failure
        console.log(err)
    });
}

discordClient.on('ready', () => {    
    console.log('CivBot connected 😎.');
});

discordClient.on('message', message => {    
    const {content, mentions} = message;
    
    if(!mentions.everyone){
        var me = mentions.users.findKey(user => user.id === BOTID);        
        if(me){
            let args = content.split(/\s+/);
            console.log(args)
            if(args.length > 1){
                const cmd = args[1];

                // Check if exist
                let exist = commands.find(c => c.name == cmd);
                if(!exist){
                        message.channel.send("🤔");
                    return;
                }

                switch(cmd){
                    case "help":
                        let helpMsg = "```";
                        for(let c of commands){
                            if(c.hidden)
                                continue;
                            helpMsg += `> ${c.name}: ${c.description ?? "<?>"} ${c.usage ? " - " + c.usage : ""} \n`;
                        }
                        helpMsg += "```";
                        message.channel.send(helpMsg);
                    break;
                    case "add":
                        const name = args[2] ?? null;
                        if(!name){
                            message.channel.send("Please specify a name. ```" + exist.usage + "```" );
                            return;
                        }

                        let users = [];
                        if(args.length > 3){
                            for(let i = 3; i < args.length; i++){
                                let u = args[i];
                                if(u.match(/<@!\w*>/) && !u.match(`<@!${BOTID}>`))
                                    users.push(u);
                            }
                        }

                        if(users.length == 0){
                            message.channel.send("No user specified. ```" + exist.usage + "```" );
                            return;
                        }

                        let newGame = new Game(name, users, Date.now());

                        if(!savedGameFile.Games)
                            savedGameFile.Games = [];
                        savedGameFile.Games.push(newGame);
                        save(() => {
                            message.channel.send("Game saved 💾");
                        }, () => {
                            message.channel.send("An error occured saving the game ⚠");
                        })
                    break;
                    case "all":
                        let lstGames = [];
                        let lstGamesStr = "";
                        let paramAll = args[2] ?? null;
                        
                        if(param){

                        }else{
                            lstGames = savedGameFile.Games ?? [];
                        }

                        if(lstGames.length > 0){
                            for(let g of lstGames){
                                lstGamesStr += g.toString();
                            }

                        }else
                            lstGamesStr = "Woah, all your games are done 😮";
                        console.log(lstGamesStr)
                        message.channel.send(lstGamesStr);
                    break;
                    case "where":
                        let param = args[2] ?? null;
                        let toFind;
                        let gamesFound = [];
                        if(param != null){
                            if(param.match(/<@!\w*>/) && !param.match(`<@!${BOTID}>`))
                                toFind = param.match(/[0-9]+/)[0];
                        }else
                            toFind = message.author.toString().match(/[0-9]+/)[0];
                        
                        for(let g of savedGameFile.Games){
                            for(let u of g.Users){
                                if(u.match(/[0-9]+/)[0] === toFind)
                                    gamesFound.push(g);
                            }
                        }

                        let gamesStr = "";
                        for(let g of gamesFound){
                            let game = new Game(g.Name, g.Users, g.Done);
                            gamesStr += game.toString();
                        }
                        
                        message.channel.send(gamesStr);
                    break;
                    case "bitch":
                        message.channel.send(NAVY_PASTA);
                    break;
                    case "ping":
                        message.channel.send("pong");
                    break;
                    case "phone":
                        message.channel.send(GENO_PASTA);
                    break;

                }
            }else{
                message.channel.send('🤔');
            }


        }
    }
  });
  
discordClient.login(TOKEN);
