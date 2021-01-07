require('express-async-errors');
const app = require('express')();
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { eventBus } = require('@microservices-inc/common');

dotenv.config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.use((req, res) => {
  res.status(404).send('Not Found');
});

io.on('connection', socket => {
  const interval = setInterval(async () => {
    eventBus.consume('isOnline', data => {
      try {
        const user = JSON.parse(data.content.toString());
        socket.emit('isOnline', user);
      } catch (e) {
        console.error('Invalid event format');
      }
    });
  }, 3000);

  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

eventBus.connect(
  process.env.RABBITMQ_URI,
  () => {
    server.listen(process.env.PRESENCE_SERVICE_PORT, () => {
      console.log(
        `Server is running on port ${process.env.PRESENCE_SERVICE_PORT}`,
      );
    });
  },
  {
    reconnectTimeout: 10000,
  },
);
