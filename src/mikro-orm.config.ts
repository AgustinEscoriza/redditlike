

import { Options } from '@mikro-orm/core';
import { Post } from "./entities/Post";
import { __prod__ } from "./constants";
import path from 'path';

const config: Options = {
    migrations: {
        path:  path.join(__dirname, './migrations'), // path to the folder with migrations
        glob: '!(*.d).{js,ts}', // how to match migration files (all .js and .ts files, but not .d.ts)
    },
    entities: [Post],
    dbName: "lireddit",
    password: "123",
    type: "postgresql",
    debug : !__prod__
};
export default config;
