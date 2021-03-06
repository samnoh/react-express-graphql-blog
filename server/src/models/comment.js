import Sequelize from 'sequelize';

class Comment extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init(
            {
                content: {
                    type: DataTypes.TEXT,
                    allowNull: false
                }
            },
            {
                sequelize,
                tableName: 'comment',
                modelName: 'comment',
                charset: 'utf8',
                collate: 'utf8_general_ci'
            }
        );
    }

    static associate(models) {
        this.belongsTo(models.User, {
            onDelete: 'CASCADE',
            hooks: true
        });
        this.belongsTo(models.Post, {
            onDelete: 'CASCADE',
            hooks: true
        });
    }
}

export default Comment;
