# Socket.IO

## Real-time applications
A real-time application (RTA) is an application that functions within a period that the user senses as immediate or current.

Some examples of real-time applications are −

- **Instant messengers** − Chat apps like Whatsapp, Facebook Messenger, etc. You need not refresh your app/website to receive new messages.

- **Push Notifications** − When someone tags you in a picture on Facebook, you receive a notification instantly.

- **Collaboration Applications** − Apps like google docs, which allow multiple people to update same documents simultaneously and apply changes to all people's instances.

- **Online Gaming** − Games like Counter Strike, Call of Duty, etc., are also some examples of real-time applications.

## Socket.IO - Environment
To get started with developing using the **Socket.IO**, you need to have Node and npm (node package manager) installed. If you do not have these, head over to Node setup to install node on your local system. Confirm that node and npm are installed by running the following commands in your terminal.
    
    $ npm --version
    $ node --version

Open your terminal and enter the following in your terminal to create a new folder and enter the following commands −
    
    $ mkdir sockerio-project
    $ cd sockerio-project
    $ npm init

**npm init** this will create a **package.json node.js** configuration file. 

Now we need to install **Express** and **SocketIO**. 

To install these and save them to **package.json file**, enter the following command in your terminal, into the project directory.

    $ npm install express --save
    $ npm install socket.io --save

One final thing is that we should keep restarting the server. When we make changes, we will need a tool called nodemon. To install **nodemon**, open your terminal and enter the following command −

    $ npm install -g nodemon

Whenever you need to start the server, instead of using the **node app.js** use, **nodemon app.js**. 

## Socket.IO - Hello World
Create a file celled **hello.js** and enter the following code to set up an express application -
    
    var app = require('express')();
    var http = require('http').Server(app);

    app.get('/', function(req, res) {
        res.sendfile('hello.html');
    });

    http.listen(3000, function(){
        console.log('Start server at http://localhost:3000/')
    });

We will need an **hello.html** file to serve, create a new file called index.html and enter the following code in it −

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hello world</title>
    </head>
    <body>
        Hello world
    </body>
    </html>

To test if this works, go to the terminal and run this app using the following command −

    $ nodemon app.js

This will run the server on **http://localhost:3000/**. Go to the browser and enter **http://localhost:3000/** to check this.

This sets up our **express** application and is now serving a HTML file on the root route. Now we will require SocketIO and will log *"A user connected"*, every time a user goes to this page and *"A user disconnected"*, every time someone navigates away/closes this page.

**hello.js file**

    var io = require('socket.io')(http);    //require Socket.IO

    //Whenever someone connects this gets executed
    io.on('connection', function(socket){
        console.log('A user connected');

        //Whenever somone disconnects this piece of code executed
        socket.on('disconnect', function(){
            console.log('A user disconnected');
        });
    });

The **require('socket.io')(http)** creates a new socket.io instance attached to the http server.
The **io.on event handler handles** connection, disconnection, etc., events in it, using the socket object.

We have set up our server to log messages on connections and disconnections. 
The script is served by our io server at **'/socket.io/socket.io.js'**.

After completing the above procedure, the hello.html file will look as follows −
**hello.html**

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hello world</title>
        <script src = "/socket.io/socket.io.js"></script>
        <script>
            var socket = io();
        </script>
    </head>
    <body>
        Hello world
    </body>
    </html>

If you go to **http://localhost:3000/** now (make sure your server is running), you will get Hello World printed in your browser. Now check your server console logs, it will show the following message −

    A user connected

If you refresh your browser, it will disconnect the socket connection and recreate. You can see the following on your console logs −

    A user connected
    A user disconnected
    A user connected

## Socket.IO - Event Handling
Sockets work based on events. There are some reserved events, which can be accessed using the socket object on the server side.
These are −
- Connect
- Message
- Disconnect
- Reconnect
- Ping
- Join and
- Leave

The client-side socket object also provides us with some reserved events, which are −
- Connect
- Connect_error
- Connect_timeout
- Reconnect, etc

In **hello.js** , we used the connection and disconnection events to log when a user connected and left. Now we will be using the message event to pass message from the server to the client. To do this, modify the **io.on ('connection', function(socket))** call to include the following −

    //Send a message adter a timeout of 4 seconds
    setTimeout(function(){
        socket.send('Sent a message 4 seconds after connection!');
    }, 4000);

Now, we need to handle this event on our client side. So, edit your **hello.html** script tag to include the following code −

     <script>
        var socket = io();
        socket.on('message', function(data){document.write(data)});
    </script>

When you go to the page in your browser now, you will be presented with the following screenshot.

`Hello world `

After 4 seconds pass and the server sends the message event, our client will handle it and produce the following output −

`Sent a message 4 seconds after connection!`

For example, the following code emits an event called **testerEvent** −

    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.get('/', function(req, res) {
    res.sendfile('index.html');
    });

    io.on('connection', function(socket) {
    console.log('A user connected');

    //Send a message when 
    setTimeout(function() {
        //Sending an object when emmiting an event
        socket.emit('testerEvent', { description: 'A custom event named testerEvent!'});
    }, 4000);

    socket.on('disconnect', function () {
        console.log('A user disconnected');
    });
    });

    http.listen(3000, function() {
    console.log('listening on localhost:3000');
    });

To handle this custom event on client we need a listener that listens for the event testerEvent. The following code handles this event on the client −

    <!DOCTYPE html>
    <html>
    <head>
        <title>Hello world</title>
    </head>
    <script src = "/socket.io/socket.io.js"></script>
    
    <script>
        var socket = io();
        socket.on('testerEvent', function(data){document.write(data.description)});
    </script>
    <body>Hello world</body>
    </html>

This will work in the same way as our previous example, with the event being testerEvent in this case. When you open your browser and go to localhost:3000, you'll be greeted with − 
`Hello world`

After four seconds, this event will be fired and the browser will have the text changed to − 
`A custom event named testerEvent!`

## Socket.IO - Broadcasting
Broadcasting means sending a message to all connected clients. Broadcasting can be done at multiple levels. We can send the message to all the connected clients, to clients on a namespace and clients in a particular room. To broadcast an event to all the clients, we can use the io.sockets.emit method.

In this example, we will broadcast the number of connected clients to all the users. Update the **broadcasting.js** file to incorporate the following.

    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.get('/', function(req, res) {
        res.sendfile('broadcasting.html');
    });

    var clients = 0;
    io.on('connection', function(socket) {
        clients++;
        io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
        socket.on('disconnect', function () {
            clients--;
            io.sockets.emit('broadcast',{ description: clients + ' clients connected!'});
        });
    });

    http.listen(3000, function() {
    console.log('Start server at http://localhost:3000/');
    });

On the client side, we just need to handle the broadcast event − **broadcasting.html** a file

    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Hello world</title>

        <script src = "/socket.io/socket.io.js"></script>
        <script>
            socket.on('broadcast',function(data) {
                document.body.innerHTML = '';
                document.write(data.description);
            });
        </script>
    </head>
    <body>
        Hello world
    </body>
    </html>

## SocketIO - Chat Application

**app.js**
    
    var app = require('express')();
    var http = require('http').Server(app);
    var io = require('socket.io')(http);

    app.get('/', function(req, res) {
    res.sendfile('index.html');
    });

    users = [];
    io.on('connection', function(socket) {
    console.log('A user connected');
    socket.on('setUsername', function(data) {
        console.log(data);
        
        if(users.indexOf(data) > -1) {
            socket.emit('userExists', data + ' username is taken! Try some other username.');
        } else {
            users.push(data);
            socket.emit('userSet', {username: data});
        }
    });
    
    socket.on('msg', function(data) {
        //Send message to everyone
        io.sockets.emit('newmsg', data);
    })
    });

    http.listen(3000, function() {
    console.log('listening on localhost:3000');
    });

**index.html**

    <!DOCTYPE html>
    <html>
    <head>
        <title>Hello world</title>
    </head>
    
    <script src = "/socket.io/socket.io.js"></script>
    <script>
        var socket = io();
        function setUsername() {
            socket.emit('setUsername', document.getElementById('name').value);
        };
        var user;
        socket.on('userExists', function(data) {
            document.getElementById('error-container').innerHTML = data;
        });
        socket.on('userSet', function(data) {
            user = data.username;
            document.body.innerHTML = '<input type = "text" id = "message">\
            <button type = "button" name = "button" onclick = "sendMessage()">Send</button>\
            <div id = "message-container"></div>';
        });
        function sendMessage() {
            var msg = document.getElementById('message').value;
            if(msg) {
                socket.emit('msg', {message: msg, user: user});
            }
        }
        socket.on('newmsg', function(data) {
            if(user) {
                document.getElementById('message-container').innerHTML += '<div><b>' + 
                data.user + '</b>: ' + data.message + '</div>'
            }
        })
    </script>
    
    <body>
        <div id = "error-container"></div>
        <input id = "name" type = "text" name = "name" value = "" 
            placeholder = "Enter your name!">
        <button type = "button" name = "button" onclick = "setUsername()">
            Let me chat!
        </button>
    </body>
    </html>