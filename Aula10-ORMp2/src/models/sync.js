const { Post } = require('./Post');
const { User } = require('./User');
const { Commentary } = require('./Commentary');
const { Inbox } = require('./InboxMsg');

Post.belongsTo(User);
User.hasMany(Post);

Post.hasMany(Commentary);
Commentary.belongsTo(Post);

Commentary.belongsTo(User);
User.hasMany(Commentary);

Inbox.belongsTo(User, {
    foreignKey: 'sender'
});
User.hasMany(Inbox, {
    foreignKey: 'sender',
    as: 'sent_msgs'
});

Inbox.belongsTo(User, {
    foreignKey: 'receiver'
});
User.hasMany(Inbox, {
    foreignKey: 'receiver',
    as: 'received_msgs'
});

const sequelize = require("../database/sequelize-connection");

console.log('Sync Models');
sequelize.sync();

