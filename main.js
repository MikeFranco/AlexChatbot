

'use strict';
const BootBot = require('bootbot');
const axios = require("axios");
let port = process.env.PORT||3000;
const config = require('config');
const fetch = require('node-fetch');
const GIPHY_URL = 'https://api.giphy.com/v1/gifs/search?api_key=MpYTpkUU0gkgcqPKLEC9SZmwKBITW60U&q='

function getRandomInt() {
  return Math.floor(Math.random());
}


const bot = new BootBot({
    accessToken: config.get('accessToken'),
    verifyToken: config.get('verifyToken'),
    appSecret: config.get('appSecret')
});

bot.hear([/hello(Hello)?/i, "hi", "holi", /hola(Hola)?/i, "que onda", "que pez", "que pedo", "que ondon" ], (payload, chat) => {

  chat.getUserProfile().then((user) => {
      chat.say(`Hola ${user.first_name}, soy Alex, tu asistente personal 📱`, {typing:true});

  });
});


bot.hear(["Cuándo Nací?", "cuál es tu edad?", "cuántos años tienes?", "cual es tu edad?"], (payload, chat)=>{
  const text= payload.message.text;
  chat.say("Nací el 8 de Junio del 2018 a las 20:43 👶🏼", {typing:true})
})


bot.hear([ "bye", "adios", "ciao", "arrivederci", "adiós", "nos vemos" ], (payload, chat)=>{
  const text = payload.message.text;
  chat.say("Nos vemos", {typing:true})
})


bot.hear(/gif (.*)/i, (payload, chat, data)=>{
  const query = data.match[1];
  chat.say(`Este Gif de ${query} me pareció muy bueno 😹`, {typing:true});
  fetch(GIPHY_URL + query)
  
  .then(res => res.json())
  .then(json =>{
    chat.say({
      attachment: 'image',
      url: json.data[Math.floor(Math.random()*10)].images.fixed_height.url
    }); 
  })
})

bot.hear(["qué puedes hacer?", "que puedes hacer?", "que puedes hacer"], (payload, chat)=>{
  chat.say({
    text:"Esto es lo que puedo hacer:",
    quickReplies: ["Buscar un gif", "Cosas que haces", "Cuándo Nací?"]
  })
});

bot.hear(["Buscar un gif"], (payload, chat)=>{
  chat.say("Solo necesitas poner la palabra:    Gif seguido de lo que quieras buscar... Ejemplo: Gif gatos... Por favor, solo pon una palabra para buscar un Gif 🙏", {typing:true})
  
})

bot.hear(["Cosas que haces", "menu", "menú", "dame tu menú", "dame tu menú", "me puedes dar tu menú?", "me puedes dar tu menu?"], (payload, chat)=>{
  chat.say({
    text: "Qué necesitas?",
    quickReplies: ["Programar", "Comer", "Dormir", "Ir al baño"]
  })
});


bot.hear(["Programar"], (payload, chat)=>{
  chat.say("Me encanta programar 💙", {typing:true});
})

bot.hear(["Comer"], (payload, chat)=>{
  chat.say("Vamos por unos taquitos, yo invito 😏", {typing:true})
})

bot.hear(["Dormir"], (payload, chat)=>{
  chat.say("Necesito dormir 16 horas diarias para poder funcionar bien 😴", {typing:true});
} )

bot.hear(["Ir al baño"], (payload, chat) =>{
  chat.say("Yo no puedo ir al baño porque solo soy un asistente personal 😟", {typing:true})
})

bot.hear(['help'], (payload, chat) => {
	// Send a text message with buttons
	chat.say({
		text: 'What do you need help with?',
		buttons: [
			{ type: 'postback', title: 'Settings', payload: 'HELP_SETTINGS' },
			{ type: 'postback', title: 'FAQ', payload: 'HELP_FAQ' },
			{ type: 'postback', title: 'Talk to a human', payload: 'HELP_HUMAN' }
		]
	});
});

bot.hear('Emily', (payload, chat) => {
	// Send an attachment
	chat.say({
		attachment: 'image',
		url: 'http://static2.fashionbeans.com/wp-content/uploads/2017/06/emily-ratajkowski.jpg'
	});
});

/* bot.hear(["info"], (payload, char)=>{

  let id = payload.sender.id;
  console.log(id);
  axios.get(`https://graph.facebook.com/${id}?fields=name`)
  .then((response)=>{
    console.log(response);
    chat.say("Acabé tu petición", {typing:true});
  })
  .catch((error)=>{
    console.log(error);
    
  })
  
}) */

/* bot.on('message', (payload, chat) => {
	const text = payload.message.text;
	chat.say(`Me escribiste: ${text}`);
}); */

bot.start(port);