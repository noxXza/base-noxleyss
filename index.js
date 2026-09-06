 
         //﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌//
       //    </>  𝐂𝐫𝐞𝐝𝐢𝐭𝐬  </>      //
     //   𝐂𝐫𝐞𝐚𝐭𝐨𝐫: 𝐧𝐨𝐱𝐗𝐳𝐚.𝐞𝐱𝐞      //
   //   𝐓𝐞𝐥𝐞𝐠𝐫𝐚𝐦: @𝐧𝐨𝐱𝐗𝐳𝐚𝟏𝟗    //
 //   𝐂𝐫𝐞𝐚𝐭𝐞𝐝: 𝟏𝟗-𝟎𝟖-𝟐𝟎𝟐𝟔       //
//﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌﹌//

require('./control/settings');
const {
default: makeWASocket,
prepareWAMessageMedia,
useMultiFileAuthState,
DisconnectReason,
fetchLatestBaileysVersion,
makeInMemoryStore,
jidDecode,
downloadContentFromMessage,
makeCacheableSignalKeyStore,
updateProfileStatus
} = require("@whiskeysockets/baileys");
const pino = require('pino');
const readline = require("readline");
const fs = require('fs');
const chalk = require("chalk");
const { smsg, getBuffer, getSizeMedia } = require('./lib/myfunc');

const usePairingCode = true;

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise(resolve => rl.question(text, resolve));

const store = makeInMemoryStore({ logger: pino({ level: 'silent' }) });

async function connectToWhatsApp() {
const { state, saveCreds } = await useMultiFileAuthState("./session");
const { version } = await fetchLatestBaileysVersion();

const sock = makeWASocket({
version,
printQRInTerminal: !usePairingCode,
browser: ["Ubuntu", "Chrome", "20.0.04"],
logger: pino({ level: 'silent' }),
auth: {
creds: state.creds,
keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'silent' }))
}
});

const client = sock
const conn = client


sock.decodeJid = (jid) => {
if (!jid) return jid
if (/:\d+@/gi.test(jid)) {
const decode = jidDecode(jid) || {}
return decode.user && decode.server ? decode.user + '@' + decode.server : jid
}
return jid
}

store.bind(sock.ev);

if (!sock.authState.creds.registered) {
const phoneNumber = await question(`
Silahkan masukkan nomor (628xxx):
`);

const code = await sock.requestPairingCode(phoneNumber.trim(), "NOXLEYSS");
console.log(chalk.blue("PAIRING CODE:", code));
}

sock.ev.on('messages.upsert', async ({ messages }) => {
try {
    const mek = messages[0];
    if (!mek.message) return;
    if (mek.key.remoteJid === 'status@broadcast') return;

    const m = smsg(sock, mek, store);
    if (!m) return;

    const isCreator = [sock?.user?.id,...(global.owner || [])]
       .map(v => v.replace(/[^0-9]/g,'')+'@s.whatsapp.net')
       .includes(m.sender);

    if (!sock.public &&!mek.key.fromMe &&!isCreator) return;
    if (mek.key.id.startsWith('BAE5') && mek.key.id.length === 16) return;
    if (mek.key.id.startsWith('noxXza.exe')) return;

    require("./noxXza")(sock, m, store);

} catch (e) {
    console.log(e);
}
});

sock.public = true

sock.ev.on('connection.update', async ({ connection, lastDisconnect }) => {
if (connection === 'close') {
if (lastDisconnect?.error?.output?.statusCode !== DisconnectReason.loggedOut) {
connectToWhatsApp();
}
}
});

sock.ev.on('creds.update', saveCreds);
}

connectToWhatsApp();