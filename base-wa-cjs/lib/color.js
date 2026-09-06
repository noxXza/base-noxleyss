
         //﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌//
       //    </>  𝐂𝐫𝐞𝐝𝐢𝐭𝐬  </>      //
     //   𝐂𝐫𝐞𝐚𝐭𝐨𝐫: 𝐧𝐨𝐱𝐗𝐳𝐚.𝐞𝐱𝐞      //
   //   𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦: @𝐧𝐨𝐱𝐗𝐳𝐚𝟏𝟗    //
 //   𝐂𝐫𝐞𝐚𝐭𝐞𝐝: 𝟏𝟗-𝟎𝟖-𝟐𝟎𝟐𝟔       //
//﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌//

const chalk = require('chalk')

const color = (text, color) => {
    return !color ? chalk.green(text) : chalk.keyword(color)(text)
}

const bgcolor = (text, bgcolor) => {
  return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)
}

const Lognyong = (text, color) => {
  return !color ? chalk.yellow('[ ! ] ') + chalk.green(text) : chalk.yellow('=> ') + chalk.keyword(color)(text)
}
module.exports = {
  color,
  bgcolor,
  Lognyong, 
}
