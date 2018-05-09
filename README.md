# TWalker #

## Getting Started ##
Hey there! This is TWalker, our Advanced Databases Final Project!

### Dependencies ###
Before Running the project please make sure you have the next dependencies:

* node
* bower
* gulp
* mongdb, mongod
* python 
* flask, tweepy (you can install them via `pip install <package>`)

### Installation
Clone the repository and install npm and bower dependencies:

```
$ npm install && bower install

```

Modify `api/credentials.py` with your Twitter developer credentials

Modfy `api/server_config.py`, `app.run(host="<YOUR_IP_ADDRESS>", port=5000, debug=True)`

Modify `front/src/app/config/core.config.js`, `.constant('API_URL', '<YOUR_IP_ADDRESS>:5000')`

Start the database server
```
mongod --dbpath api/db
```

Run the  API with:

```
python api/server_config.python
```

Look for the following output in your logs:

```
 * Running on <YOUR_IP_ADDRESS>:5000 (Press CTRL+C to quit)
 * Restarting with stat
 * Debugger is active!
 * Debugger PIN: 298-162-348
```

To run the application use:

```
$ gulp default

```

Look for the following output in your logs:

```
[14:24:38] Using gulpfile ~/botsify/gulpfile.js                        rofile': False, 'default_profile': Fals[14:24:38] Starting 'inject'...                                                                                                    ne'}
[14:24:38] Starting 'js'...
[14:24:38] Starting 'html'...
[14:24:38] Starting 'css'...
[14:24:38] Starting 'connect'...
[14:24:38] Starting server...
[14:24:38] Finished 'connect' after 7.13 ms
[14:24:38] Starting 'watch'...
[14:24:38] Finished 'watch' after 42 ms
[14:24:38] Starting 'extra'...
[14:24:38] Server started http://localhost:8080
[14:24:38] LiveReload started on port 35729
[14:24:38] Running server
[14:24:38] Finished 'css' after 273 ms
[14:24:38] Finished 'extra' after 222 ms
[14:24:38] Finished 'html' after 354 ms
[14:24:38] Finished 'js' after 478 ms
[14:24:38] gulp-inject 26 files into index.html.
[14:24:38] Finished 'inject' after 578 ms
[14:24:38] Starting 'default'...
[14:24:38] Finished 'default' after 95 μs
```

## To use TWalker ##
Enter the application, the home page has only one input: User ID. There you must type the username of the profile you want to analyze. Is important to respect uppercases and lowercases, otherwise you won't get the results.

Then, click the *Get Statistics* button and see the magic!
