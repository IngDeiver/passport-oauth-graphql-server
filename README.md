# passport-oauth-graphql-server
Graphql server with apollo server and stateless authentication with google, facebook and username / password via passport.
### Why develop it?
Authentication is almost always a module that we need to implement in our applications, to this is added the [OAuth 2.0 standard](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2) for user authentication with providers such as Google, Facebook among others, authentication that we can implement in a more standard way thanks to the great library [passport.js](http://www.passportjs.org), but that is not everything.
It is also likely that in addition to wanting to implement authentication with these providers, we need to authenticate the users of our application, as what we want is stateless authentication we make use of [JWT](https://jwt.io/), another great library which helps us standardize one type of token, the JWT.
So far we have our own stateless authentication using access tokens and authentication with providers using the OAuth2 standard, but I wanted to implement this in a GraphQL API, but this protocol does not define a standard that allows us to secure the API, complicating things.
All this led me to find a way to implement these three types of stateless user authentication in a GraphQl API in which we can ensure only the queries or mutations that we only want, the integration of all these technologies and their understanding was for me a true headache and this was the result.

You can try a [demo] (url) host on Heroku, where you can interact with the implemented GraphQL API.
![Documentation API](https://firebasestorage.googleapis.com/v0/b/files-service.appspot.com/o/images%2FDoc.JPG?alt=media&token=40af0879-2135-4fff-85ba-5cf7ed3d5e8a)

### Characteristics
* Three authentication methods: Facebook, Google and by username / password
* You can protect each query and / or GraphQL mutations you want.
* You can change the data source, by default I am using mongo db with mongoose.
* You can add your own secrets and app IDs for Facebook and Google.
* You can easily change the local authentication as you like.
* You can change the Graphql schema as you like.




### How to use ?
> Note: For user and password authentication, you must first log in by calling the `login (username: String !, password: String!)` Function of GraphQL with which you will obtain an access token for registered users.
> It is assumed that you have an access token from Google and Facebook to test this API with these providers.
> Each provider must write in the headers as indicated as they are case sensitive.
> To execute any mutation you must send the headers for the corresponding provider as listed below.


| Provider      | Header to token                            |Header to provider     |
| ------------- |:------------------------------------------:| ---------------------:|
| facebook      | Athorization: Bearer facebook_acces_token  | provider: facebook    |              
| google        | Athorization: google_token                 | provider: google      |
| owner         | Athorization: Bearer jwt_token             | provider: owner       |       


An example using Facebook:
![Example with facebook](https://firebasestorage.googleapis.com/v0/b/files-service.appspot.com/o/images%2FComment.JPG?alt=media&token=f30b94dc-0f30-43a9-b2a8-34181d0b883c )
When you authenticate using the username and password you will get a response with the following structure in case of success, if the call fails the server will respond with the respective error.
![Token](https://firebasestorage.googleapis.com/v0/b/files-service.appspot.com/o/images%2Fregister.JPG?alt=media&token=4c5d419f-b0ef-4555-b8b9-c031d0d818ce)
          

