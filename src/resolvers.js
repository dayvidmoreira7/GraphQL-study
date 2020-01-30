const md5 = require('md5');

const User = require('./models/userModel');

module.exports = {
    Query: {
        describe: () => {
            let description = `Essa aplicação foi criada para que eu aprendesse e testasse alguns conceitos de GraphQL`
            return description;
        },
        users: async () => {
            let users = await User.find();
            return users;
        },
        user: async (_, { id }) => {
            let user = await User.findById(id)
            return user;
        }
    },

    Mutation: {
        login: async (_, { email, password }) => {
            let user = await User.findOne({ email });
            if(!user) return null

            if(user.password === md5(password)) return user._id;
            else return null;
        },
        createUser: async (_, { name, email, password }) => {
            let user = await User.create({ name, email, password: md5(password) });
            return user;
        },
        updateUser: async (_, { id, name, email, password }) => {
            try {
                let update = {};
            
                if(name) update.name = name;
                if(email) update.email = email;
                if(password) update.password = md5(password);

                await User.findByIdAndUpdate(id, update);
                return 'Usuário alterado com sucesso';
            } catch (error) {
                return 'Ocorreu um erro ao alterar o usuário';
            };
        },
        deleteUser: async (_, { id }) => {
            try {
                await User.findByIdAndRemove(id);
                return 'Usuário deletado';
            } catch (error) {
                return 'Ocorreu um erro ao deletar o usuário';                
            };
        },
        deleteAllUsers: async () => {
            try {
                let users = await User.find();
                users.map(async user => {
                    await User.findByIdAndRemove(user._id);
                });
                return 'Todos os usuários foram deletados';
            } catch (error) {
                return 'Ocorreu um erro ao deletar os usuários';                
            };
        }
    }
}