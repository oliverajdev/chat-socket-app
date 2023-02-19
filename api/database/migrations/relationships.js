/* eslint-disable no-undef */
module.exports = {
    async up(queryInterface, Sequelize) {
  
      return Promise.all([
        queryInterface.addColumn('Users', 'roleId', {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 2,
          references: {
            model: 'Roles',
            key: 'id',
          },
          onUpdate: 'CASCADE',
          onDelete: 'CASCADE',
        }),
        queryInterface.addConstraint('Notifications', {
          fields: ['followerId'],
          type: 'foreign key',
          name: 'followerId',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('Notifications', {
          fields: ['followedId'],
          type: 'foreign key',
          name: 'followedId',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('Follows', {
          fields: ['followerId'],
          type: 'foreign key',
          name: 'f_followerId',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        queryInterface.addConstraint('Follows', {
          fields: ['followedId'],
          type: 'foreign key',
          name: 'f_followedId',
          references: { //Required field
            table: 'Users',
            field: 'id'
          },
          onDelete: 'cascade',
          onUpdate: 'cascade'
        }),
        
          queryInterface.addColumn('Notifications', 'statusId', {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
              model: 'Statuses',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }),
          queryInterface.addColumn('Chats', 'senderId', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }),
          queryInterface.addColumn('Chats', 'receiverId', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
              model: 'Users',
              key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
          }),
      ]);
      
    },
  
    async down(queryInterface) {
      return Promise.all([
        queryInterface.removeColumn('Roles', 'userId'),
      ]);
    },
  };