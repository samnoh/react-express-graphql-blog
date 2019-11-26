import db from 'models';

const { User, Post } = db;

const resolvers = {
    Query: {
        user: async (_, { id }) => {
            const user = await User.findByPk(id);
            return user;
        },
        users: async () => {
            const users = await User.findAll({});
            return users;
        },
        post: async (_, { id }) => {
            const posts = await Post.findAll({
                where: { userId: id },
                order: [['createdAt', 'DESC']]
            });
            return posts;
        },
        posts: async () => {
            const posts = await Post.findAll({
                order: [['createdAt', 'DESC']]
            });
            return posts;
        }
    },
    Mutation: {
        signUp: async (_, { username, password }) => {
            const user = await User.findOne({ where: { username } });
            if (user) {
                return false;
            }
            await User.create({ username, password });
            return true;
        },
        addPost: async (_, { userId, title, content }) => {
            const user = await User.findByPk(userId);
            if (!user) {
                return false;
            }
            await Post.create({
                title,
                content,
                userId: user.id
            });
            return true;
        }
    }
};

export default resolvers;
