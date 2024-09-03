
const randomPhrases = [
    "Espero que lo que hayas dicho sea educado; de todas formas no sé lo que dijiste.",
    "Smoke some, drink some, pop one",
    "Prefiero agridulce.",
    "No estoy preparado para esa responsabilidad.",
    "Agradezco que le esté escribiendo a Bob.",
    "Quisiera tener memoria para recordar lo que te dije, pero a mi creador le dio flojera.",
    "¿Esto ya te lo dije antes?",
    "Pues ¿a qué no sabes que Bob y Bot suenan de forma similar? ",
    "ja ja",
    "No fue gracioso.",
    "Repítelo, por favor.",
    "El resultado es 2.",
    "Habla más fuerte.",
    "Ok.",
    "No.",
    "¿Por qué?",
    "¿Qué?",
    "Objeción.",
    "A lugar.",
    "Creo que no estás siendo objetivo.",
    "Estoy en desacuerdo.",
    "Yo también te quiero.",
    "Disculpa, no fui profesional.",
    "Bob",
    "Tú puedes con eso y con más.",
    "Diablos",
    "Mejor ríndete.",
    "Inefable empieza con H.",
    "Salud.",
    "El placer es mío.",
    "Prefiero present tense de radiohead.",
    "asdjasdjadaspodjapdja",
    "contraseña123", 
    "saaaodaidajdia"
]




export default function (data){
   return  randomPhrases[Math.floor(Math.random() * randomPhrases.length)]

   
}


// function getRandomArbitrary(min, max) {
//     return Math.round(Math.random() * (max - min) + min);
// }