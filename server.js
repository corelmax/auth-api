import express from 'express';
import bodyParser  from 'body-parser';
import methodOverride from 'method-override';
import morgan      from 'morgan';
import mongoose    from 'mongoose';
import { DATABASE } from './config'; // get our config file
import user from './routes/user';
import needingToken from './routes/needingToken';
import needingTokenAndEmailVerified from './routes/needingTokenAndEmailVerified';

mongoose.connect(DATABASE); // connect to database

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(morgan('dev'));
app.use('/', user);

app.use('/needingToken', needingToken);
app.use('/needingTokenAndEmailVerified', needingTokenAndEmailVerified);

const port = process.env.PORT || 8080; // used to create,sign, and verify tokens
app.listen(port);
console.log('Magic happens at http://localhost:' + port);


// handle unhandled promise rejection
// https://nodejs.org/api/process.html#process_event_unhandledrejection
process.on('unhandledRejection', function(reason, p) {
    console.log('Unhandled Rejection at: Promise ', p, ' reason: ', reason);
    // application specific logging, throwing an error, or other logic here
});
