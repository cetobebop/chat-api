import User from "../models/user.js";
import { botInitialData, botsActive } from "../global/bots.js";
import { sessionInstance } from "../global/sessionInstance.js";

async function createBots() {
  const botUserInstances = botInitialData.map((bot) => new User(bot));
  // console.log(botInitialData)
  const nanoIds = botInitialData.map((b) => b.nanoId);

  const bots = await findBots(nanoIds);

  if (bots.length) return bots;

  const a =  botUserInstances.map(async instance => await instance.save());
  console.log(a, " aaaa")
  return a
}

async function addBotsToOnlineUsers(bots) {
    bots.map(b => {sessionInstance.setUser(b)})
   
}

async function findBots(nanoIds) {
  return await User.find({ nanoId: { $in: nanoIds } });
}

function addBotBand(userInstancesArray) {
  
  return userInstancesArray.map((user) => {
      const userInstanceCopy = JSON.parse(JSON.stringify(user))
     
      userInstanceCopy.bot = true

      return userInstanceCopy
  })
} 

function removeNanoidFromGroup(userInstancesArray) {
  
    return userInstancesArray.map((user) => {
        
       
        const {nanoId, ...newUser} = user
        return newUser
    })
} 

export async function main() {

  const availableBots = await Promise.all(await createBots());

  const avalibleBotWithBand = addBotBand(availableBots)

  const nanoIds = avalibleBotWithBand.map((b) => b.nanoId);
  const botsFound = await findBots(nanoIds);

  botsActive.push(...botsFound)
  const bots = removeNanoidFromGroup(avalibleBotWithBand)

  addBotsToOnlineUsers(bots);
 
}
