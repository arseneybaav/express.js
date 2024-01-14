/* import / const */

import express from 'express'; /* import express */
import mysql from 'mysql'; /* import mysql*/
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const app = express(); /* app = express */
const port = 3001; /* Порт для express */
const tg_url = 'tg_url'; /* url bot */
const tg_chat = 'tg_chat'; /* chat id */

app.use(express.json());

/* express settings */

const creator = 'ArseneybaavDev'; /* arseneybaav.ru */
const output_info = 'Express on'; /* Сообщение для вывода в console.log что Express вкл. */
const port_info = 'Port -'; /* Сообщение для вывода в console.log для порта */

/* mysql connect */

const connection = mysql.createConnection({
  host: process.env.DB_HOST, /* 127.0.0.1 - Localhost */
  user: process.env.DB_USER, /* имя для входа */
  password: process.env.DB_PASSWORD, /* Пароль для входа user в mysql */
  database: process.env.DB_DATABASE /* дб которую нужно искать */
});

/* routes */
  /* telegram send */
app.post('/api/send-message', async (req, res) => {
  const { name, phoneNumber } = req.body;

  try {
    const telegramAPIUrl = `${tg_url}`;
    const chatId = `${tg_chat}`;
    const message = `Новый запрос на обратный звонок: ${name}, ${phoneNumber}`;

    await axios.post(telegramAPIUrl, {
      chat_id: chatId,
      text: message
    });

    res.status(200).send('Сообщение успешно отправлено в телеграм-канал');
  } catch (error) {
    res.status(500).send('Произошла ошибка при отправке сообщения в телеграм-канал');
  }
});

/* output */

app.listen(port, () => {
  console.log(`${creator} / ${output_info} / ${port_info} ${port}`);
});

/* Messages */

/* app.get('/api/quest', (req, res) => {
   connection.query('SELECT * FROM quest', (error, results, fields) => {
       if (error) throw error;
       res.json(results);
   });
 });
*/
