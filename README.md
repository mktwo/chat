**mktwo's simple chat**
=======================
Here you go!

**Uses**
=======================
-Node.js  
-socket.io

**Installation**
=======================
Install node and npm  
Get a copy of this repo  
Put it in a folder, go there  
`npm install .` ( maybe `nmp install . -d`)  
Change index.html depending on local or server  
local: `var socket = io.connect('http://localhost:8080');`  
server: `var socket = io.connect('http://serveraddress.com/');`  
`node app.js` to run.  

**Demo**
=======================
Find it on http:/talk.jit.su/

**Features**
=======================
-Opt-in audio notification of connect/disconnect  
-Anti-cheat: try sending '/godmode'  
-Twitter/Geekli.st linking: @username for Twitter, [username] for geekli.st  
-No duplicate names: Adds a number to every duplicate name!  
-Question answering bot! `bot: question?`    
-Completely free to use for whatever purpose, as long as you keep the 'copyleft'-symbol  