
         //﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌//
       //    </>  𝐂𝐫𝐞𝐝𝐢𝐭𝐬  </>      //
     //   𝐂𝐫𝐞𝐚𝐭𝐨𝐫: 𝐧𝐨𝐱𝐗𝐳𝐚.𝐞𝐱𝐞      //
   //   𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦: @𝐧𝐨𝐱𝐗𝐳𝐚𝟏𝟗    //
 //   𝐂𝐫𝐞𝐚𝐭𝐞𝐝: 𝟎𝟔-𝟎𝟗-𝟐𝟎𝟐𝟔       //
//﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌//

require('./control/settings');
const fs = require('fs');
const sharp = require ('sharp');
const util = require("util");
const { spawn, exec, execSync } = require('child_process');

const {
default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia
} = require("@whiskeysockets/baileys");

module.exports = sock = async (sock, m, chatUpdate, store) => {
try {
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const premium = JSON.parse(fs.readFileSync("./lib/database/premium.json"))
const OWNER_PATH = "./lib/database/owner.json"
const isPremium = premium.includes(m.sender);
const sender = m.key.fromMe
? sock.user.id.split(":")[0] || sock.user.id
: m.key.participant || m.key.remoteJid;
const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["#", "!", ".", ",", "@", "/"];
const prefix = /^[¬∞zZ#$@+,.?=''():‚àö%¬¢¬£¬•‚Ç¨œÄ¬§ŒÝŒ¶&><‚Ñ¢¬©¬ÆŒî^Œ≤Œ±¬¶|/\\¬©^]/.test(body) ? body.match(/^[¬∞zZ#$@+,.?=''():‚àö%¬¢¬£¬•‚Ç¨œÄ¬§ŒÝŒ¶&><‚Ñ¢¬©¬ÆŒî^Œ≤Œ±¬¶|/\\¬©^]/gi) : '/';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");
const isChannel = from.endsWith("@newsletter");
const botNumber = await sock.decodeJid(sock.user.id);
const normalizeJid = jid => sock.decodeJid(String(jid || '')).replace(/:\d+(?=@)/, '');
const jidUser = jid => normalizeJid(jid).split('@')[0].replace(/[^0-9]/g, '');
const asUserJid = value => {
const clean = normalizeJid(value);
if (!clean) return '';
if (clean.includes('@')) return clean;
const number = clean.replace(/[^0-9]/g, '');
return number ? number + '@s.whatsapp.net' : '';
        }
const ownerbot = JSON.parse(fs.readFileSync(OWNER_PATH))
const isOwner = ownerbot.includes(m.sender)
const isCreator = [botNumber, ...global.owner].map(v => v.replace(/[^0-9]/g, '') + '@s.whatsapp.net').includes(m.sender);
const bodyTrim = body.trim();
const prefixMatch = bodyTrim.match(/^[¬∞zZ#$@+,.?=''():‚àö%¬¢¬£¬•‚Ç¨œÄ¬§ŒÝŒ¶&><‚Ñ¢¬©¬ÆŒî^Œ≤Œ±¬¶|/\\¬©^]/);
let command = '';
let args = [];
if (prefixMatch) {
    const prefixChar = prefixMatch[0];
    const withoutPrefix = bodyTrim.slice(prefixChar.length).trim();
    const parts = withoutPrefix.split(/ +/);
    command = parts.shift().toLowerCase() || '';
    args = parts;
} else {
    const parts = bodyTrim.split(/ +/);
    command = parts.shift().toLowerCase() || '';
    args = parts;
}
const pushname = m.pushName || "no name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);
const groupMetadata = isGroup ? await sock.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

const { 
smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep, processTime, getTime, tanggal, parseMention
} = require('./lib/myfunc');

const reply = (teks) => {
    return sock.sendMessage(m.chat, { text: teks }, { quoted: m });
};

if (!sock.public && !isCreator) return;

const lowerBody = (body || '').toLowerCase();
const triggerWords = ['bail', 'baileys', 'npm', 'bails'];
const isTrigger = triggerWords.some(word => lowerBody.includes(word));

if (isTrigger && !body.startsWith(prefix)) {
    try {
        const anu = `> 📢 *haloo ${pushname}, saya ada rekomendasi library baileys bot WhatsApp* [ *npm:noxleyss@latest ]* 📢`
        const msg = `
\`"npm:noxleyss@latest"\`

📍*cara penggunaan*📍

\`\`\`"@whiskeysockets/baileys": "npm:noxleyss@latest",

{
  "dependencies": {
    "@whiskeysockets/baileys": "npm:noxleyss@latest",
    "@hapi/boom": "^10.0.1",
    "pino": "^8.17.2",
    "jimp": "^0.22.12",
    "sharp": "0.34.1",
    "fflate": "^0.8.2",
  }
}\`\`\`

- Support AiRich 
- Support html
- Support table A2UI
- No logout sender 
- Update Proto terbaru 
- Support all type button 
- Support custom pairing 
- Support script type cjs & esm
- dll 

📦*packages*📦
https://www.npmjs.com/noxleyss
`;

        const interactiveMsg = {
            body: { text: anu },
            footer: { text: msg },
            header: { 
                hasMediaAttachment: false 
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Copy baileys",
                            id: "copy_baileys",
                            copy_code: '"@whiskeysocket/baileys": "npm:noxleyss"'
                        })
                    },
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Copy fflate",
                            id: "copy_fflate",
                            copy_code: '"fflate": "^0.8.2"'
                        })
                    },
                    {
                        name: "cta_copy",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Copy jimp",
                            id: "copy_jimp",
                            copy_code: '"jimp: "^0.22.12"'
                        })
                    },
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "Information",
                            url: "https://whatsapp.com/channel/0029VbD8x4q1dAw0XWN7wF0L",
                            merchant_url: "https://www.google.com"
                        })
                    }
                ],
                messageParamsJson: "{}"
            }
        };

        const generatedMsg = generateWAMessageFromContent(from, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: interactiveMsg
                }
            }
        }, { userJid: from, upload: sock.waUploadToServer });

        return await sock.relayMessage(from, generatedMsg.message, {
            messageId: generatedMsg.key.id
        });

    } catch (e) {
        console.log(e);
        return reply(`❌ Gagal kirim info baileys: ${e.message}`);
    }
}

function formatSubs(count) {
    if (!count || count === 0) return '0';
    if (count >= 1_000_000) return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    if (count >= 1_000) return (count / 1_000).toFixed(1).replace(/\.0$/, '') + 'K';
    return String(count);
}

function formatDate(timestamp) {
    if (!timestamp) return '—';
    const d = new Date(typeof timestamp === 'number' && timestamp < 1e12 ? timestamp * 1000 : timestamp);
    const pad = n => String(n).padStart(2, '0');
    return `${pad(d.getDate())}/${pad(d.getMonth() + 1)}/${d.getFullYear()} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

const date = tanggal(Date.now());

// THUMBNAIL
const thumb = await sharp('./lib/media/thumb.jpg')
        .resize(300, 300)
        .jpeg({ quality: 80 })
        .toBuffer()

//======={ case button location }=======//
switch (command) {
case "menu": {
const msg = `
*haloo ${pushname}*`

const anu = `
╭─〔 *INFORMATION BOT* 〕
│ Creator ☇ *noxXza.exe*
│ Telegram ☇ *t.me/noxXza19*
│ Bot Name ☇ *noxleyss base*
│ Baileys ☇ *npm:noxleyss*
│ Type ☇ *CommonJs* 
│ Status User ☇ ${isCreator ? "*👑 Owner*" : isPremium ? "*💎 Premium*" : "*🫪 User Free*"}
│ Mode Bot ☇ ${sock.public ? '*🌐Public*' : '*🔒Self*'}
│ Run Time ☇ ${runtime(process.uptime())}
╰──────────────

─〔 \`MENU\` 〕
│  • ${prefix}addowner
│  • ${prefix}delowner  
│  • ${prefix}addprem
│  • ${prefix}delprem  
│  • ${prefix}public  
│  • ${prefix}self
╰━━━━━━━━━━━━
`;

sock.sendMessage(m.chat, {
  buttonsMessage: {
    locationMessage: {
      degreesLatitude: 0,
      degreesLongitude: 0,
      name: "noxxleys base",
      address: `📍${date}`,
      jpegThumbnail: thumb
    },
    contentText: msg,
    footerText: anu,
    buttons: [
      {
        buttonId: "menu",
        buttonText: {
          displayText: "☰ menu"
        },
        nativeFlowInfo: {
          name: "single_select",
          paramsJson: JSON.stringify({
            title: "Pilih Menu",
            sections: [
              {
                title: "noxleyss base",
                highlight_label: "🔥",
                rows: [
                  {
                    header: "",
                    title: "Menu",
                    description: "back",
                    id: "/menu",
                  }
                ]
              }
            ]
          })
        }, 
        type: 1
      },
      {
        buttonId: "sc",
        buttonText: {
          displayText: "⌕ script"
        },
        type: 1
      }
    ],
    headerType: 6
  }
}, { quoted: m })
}
break

//=============={ case Owner }==============//
case "addowner":
case "addown": {
    if (!isCreator) return reply(`*khusus owner!*`)
    if (!args[0]) return reply(`*example: ${prefix}addowner 628xxx*`)

    let ownerPath = "./lib/database/owner.json"
    let ownerbot = JSON.parse(fs.readFileSync(ownerPath))

    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let ceknya = await sock.onWhatsApp(target)
    if (ceknya.length == 0) return reply(`*Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!*`)

    if (ownerbot.includes(target)) return reply(`*${target} sudah jadi owner*`)

    ownerbot.push(target)
    fs.writeFileSync(ownerPath, JSON.stringify(ownerbot, null, 2))
    reply(`*✅ ${target} TELAH MENJADI OWNER*`)
}
break

case "delowner":
case "delown": {
    if (!isCreator) return reply(`*khusus owner!!*`)
    if (!args[0]) return reply(`*example: ${prefix}delowner 628xxx*`)

    let ownerPath = "./lib/database/owner.json"
    let ownerbot = JSON.parse(fs.readFileSync(ownerPath))

    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let unp = ownerbot.indexOf(target)
    if (unp === -1) return reply(`*${target} BUKAN OWNER*`)

    ownerbot.splice(unp, 1)
    fs.writeFileSync(ownerPath, JSON.stringify(ownerbot, null, 2))
    reply(`*✅ ${target} SUDAH BUKAN OWNER*`)
}
break

case "addprem": {
    if (!isCreator) return reply("*❗ AKSES DI TOLAK!!*")
    if (!args[0]) return reply(`❌ BUKAN GITU \n*GINI CARA NYA ✅*\n example: ${prefix}addprem 628xxx`)

    let premPath = "./lib/database/premium.json"
    let premium = JSON.parse(fs.readFileSync(premPath))

    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let ceknya = await sock.onWhatsApp(target)
    if (ceknya.length == 0) return reply(`*Masukkan Nomor Yang Valid Dan Terdaftar Di WhatsApp!!!*`)

    if (premium.includes(target)) return reply(`*${target} sudah premium*`)

    premium.push(target)
    fs.writeFileSync(premPath, JSON.stringify(premium, null, 2))
    reply(`*✅ ${target} TELAH MENJADI PREMIUM*`)
}
break

case "delprem": {
    if (!isCreator) return reply("*❗ AKSES DI TOLAK!!*")
    if (!args[0]) return reply(`❌ BUKAN GITU \n*GINI CARA NYA ✅*\n ${prefix}delprem 628xxx`)

    let premPath = "./lib/database/premium.json"
    let premium = JSON.parse(fs.readFileSync(premPath))

    let target = q.replace(/[^0-9]/g, '') + '@s.whatsapp.net'
    let unp = premium.indexOf(target)
    if (unp === -1) return reply(`*${target} BUKAN PREMIUM*`)

    premium.splice(unp, 1)
    fs.writeFileSync(premPath, JSON.stringify(premium, null, 2))
    reply(`*✅ ${target} SUDAH BUKAN PREMIUM*`)
}
break

case 'public': { 
if (!isCreator) return reply("*Khusus Owner*");
if (sock.public === true) return reply("Success To Public Mode");
sock.public = true
reply("Success To Public Mode");
}
break

case 'self': {
if (!isCreator) return reply("*Khusus Owner*");
if (sock.public === false) return reply("Success To Self Mode");
sock.public = false
reply("Success To Self Mode");
}
break

case "sc":
case "script": 
case "getsc": {
const sc = `
> *halo ${pushname}, apakah kamu ingin base script ini?*`

const anu = `
jika kamu menginginkan base script ini silahkan klik tombol di bawah ini

\`rulles\`
- dilarang keras menghapus credits minimal taro di tqto
- dilarang memperjual belikan base ini karena 100% free
- boleh di jual dengan syarat sudah di tambah fitur
- dilarang mengklaim script ini 100%
`.trim()
    try {
        const media = await prepareWAMessageMedia(
            { image: thumb, mimetype: 'image/jpeg' },
            { upload: sock.waUploadToServer }
        );
        const interactiveMsg = {
            body: { text: sc },
            footer: { text: anu },
            header: {
                hasMediaAttachment: true,
                imageMessage: media.imageMessage
            },
            nativeFlowMessage: {
                buttons: [
                    {
                        name: "cta_url",
                        buttonParamsJson: JSON.stringify({
                            display_text: "get sc",
                            url: "https://github.com/noxXza/base-noxleyss",
                            merchant_url: "https://www.google.com"
                        })
                    }
                ],
                messageParamsJson: "{}"
            }
        };

        const generatedMsg = generateWAMessageFromContent(from, {
            viewOnceMessage: {
                message: {
                    messageContextInfo: {
                        deviceListMetadata: {},
                        deviceListMetadataVersion: 2
                    },
                    interactiveMessage: interactiveMsg
                }
            }
        }, { userJid: from, upload: sock.waUploadToServer });

        return await sock.relayMessage(from, generatedMsg.message, {
            messageId: generatedMsg.key.id
        });
    } catch (e) {
        console.log(e);
        reply(`❌ Gagal kirim pesan: ${e.message}`);
    }
}
break

default:
if (budy.startsWith('=>')) {
if (!isCreator) return reply("*khusus owner*");
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
reply(evaled);
} catch (err) {
reply(String(err));
}
}

if (budy.startsWith('$')) {
if (!isCreator) return reply("*khusus owner*");
exec(q, (err, stdout) => {
if (err) return reply(err)
if (stdout) return reply(stdout)
})
}
}
} catch (err) {
console.log(require("util").format(err));
}
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});
