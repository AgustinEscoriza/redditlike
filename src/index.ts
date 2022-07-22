import { MikroORM } from "@mikro-orm/core";
import { __prod__ } from "./constants";
import microConf from "./mikro-orm.config";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
// import { Post } from "./entities/Post";

const main = async () => {
    const app = express();
    const orm = await MikroORM.init(microConf);
    await orm.getMigrator().up();
    // const emFork = orm.em.fork();

    const apolloServer = new ApolloServer({
        schema: await buildSchema({
            resolvers: [HelloResolver],
            validate: false
        })
    });
    await apolloServer.start()
    apolloServer.applyMiddleware({app});
    app.listen(4000, ()=>{
        console.log('server started on localhost:4000')
    });
};

main().catch((err)=>{
    console.error(err);
});