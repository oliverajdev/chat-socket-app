const { sequelize } = require('./api/database/models/');
const app = require('./app');
const server = require('./socket/socket')


server.listen(3001, () => {
  console.log('socket listening at 3001')
})

sequelize.sync({ logging: false }).then(() => {
    console.log('Database connected');
    app.listen(3002, () => {
       console.log(`Server listening at 3002`); // eslint-disable-line no-console
      });
      })
      .catch((err) => {
        console.log(err);
      });



