import { ApolloServer } from "apollo-server-express";
import { 
    ApolloServerPluginDrainHttpServer, 
    ApolloServerPluginLandingPageGraphQLPlayground 
} from "apollo-server-core";
import express from "express";
import http from "http";
import { schema } from './schema';
import { createContext } from "./context";
import cookieParser from "cookie-parser";

const IS_DEV = process.env.NODE_ENV === "development";
const localOrigins = [/^http:\/\/localhost:\d{4}$/];
const prodOrigins = [/^https:\/\/.*\.yourdomain\.com$/];


async function startApolloServer() {
    const app = express();
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        schema: schema,
        context: createContext,
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            ApolloServerPluginLandingPageGraphQLPlayground()
        ]
    })
    await server.start()

    app.use(cookieParser())

	server.applyMiddleware({ 
		app,
		cors: {
			origin: IS_DEV ? localOrigins : prodOrigins,
			credentials: true,
		},
	});
    
    await new Promise<void>((resolve) => {
        httpServer.listen({port: 4000});
        resolve();
    })

    console.log(` 🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
}

startApolloServer()