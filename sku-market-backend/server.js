require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env' : '.env.development',
});

// uncaught error handler
process.on('uncaughtException', (err) => {
    console.log('Uncaught Exception...');
    console.log(err.name, err.message);
    console.log(err.stack);
    console.log('Closing server...');
    console.log('Server closed...');
    process.exit(1);
});

const app = require('./app');
const port = process.env.PORT || process.env.port || 3333;

const server = app.listen(port, () => {
    console.log(
        `Server started at ${new Date().toLocaleString()} on http://localhost:${port}/`
    );
});

// unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION 💥', err.mane, err.message);
    server.close(() => {
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
