require('dotenv').config();

const path = require('path');

const { GraphQLServer } = require('graphql-yoga');
const resolvers = require('./resolvers');

const cors = require('cors');
const helmet = require('helmet');
// const morgan = require('morgan');

const server = new GraphQLServer({
    typeDefs: path.resolve(__dirname, 'schema.graphql'),
    resolvers
})

server.express.use(cors());
server.express.use(helmet());
// server.express.use(morgan('dev'));

server.start(() => console.log(`Server running on :4000`));