# node-kv-logger
---
A k-v style logger for node.js. Only logs to console since [a 12-factor app should write logs to stdout](https://12factor.net/logs) 

API definitions: [index.d.ts](index.d.ts)
Checkout examples in: [test.js](test.js)

text output
```
msg=connecting..., user_id=12345, match_id=12315, level=info, time=2018-07-21 15:15:47.751  
user_id=12345, match_id=12315, msg=connectied, level=info, time=2018-07-21 15:15:47.751     
user_id=12345, match_id=12315, msg=connection lost., level=error, time=2018-07-21 15:15:47.751
msg=reconnecting..., user_id=12345, match_id=12315, level=info, time=2018-07-21 15:15:47.751
```

json output
```
{"msg":"connecting...","user_id":12345,"match_id":12315,"level":"info","time":"2018-07-21 15:18:41.757"}
{"user_id":12345,"match_id":12315,"msg":"connectied","level":"info","time":"2018-07-21 15:18:41.757"}
{"user_id":12345,"match_id":12315,"msg":"connection lost.","level":"error","time":"2018-07-21 15:18:41.757"}
{"msg":"reconnecting...","user_id":12345,"match_id":12315,"level":"info","time":"2018-07-21 15:18:41.757"}
```
