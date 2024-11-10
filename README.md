# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.

## Downloading

```
git clone {repository URL}
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```
You can find .envExample in root folder and modify it in .env. By default App will start at port 4000.
You can open in your browser OpenAPI documentation by typing http://localhost:4000/doc.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```
### Endpoints

1. User
- GET /user - get all users. By default in App there is 1 user.
Server should answer with status code 200 and all users records

- GET /user/:id - get single user by id. 
Server should answer with status code 200 and and record with id === userId if it exists
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist

- POST /user - create user. Body should be in the following format:

```
    {
      login: string;
      password: string;
    }
```
Server should answer with status code 201 and newly created record without password;
Server should answer with status code 400 and corresponding message if request body does not contain required fields;

- PUT /user/:id - update user's password. Body should be in the following format:

```
{
  oldPassword: string; // previous password
  newPassword: string; // new password
}
```
Server should answer with status code 200 and updated record if request is valid without password;
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid)
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist
Server should answer with status code 403 and corresponding message if oldPassword is wrong

- DELETE /user/:id - delete user.
Server should answer with status code 204 if the record is found and deleted;
Server should answer with status code 400 and corresponding message if userId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === userId doesn't exist;

2. Tracks (/track route)

- GET /track - get all tracks. By default there are 2 tracks when starting App.
Server should answer with status code 200 and all tracks records;

- GET /track/:id - get single track by id.
Server should answer with status code 200 and and record with id === trackId if it exists;
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist;

- POST /track - create new track. Body should be in the following format:

```
{
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}
```
Server should answer with status code 201 and newly created record if request is valid;
Server should answer with status code 400 and corresponding message if request body does not contain required fields;

- PUT /track/:id - update track info.

Body should be in the following format:

```
{
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}
```
Server should answer with status code 200 and updated record if request is valid;
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist;

- DELETE /track/:id - delete track.
Server should answer with status code 204 if the record is found and deleted;
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === trackId doesn't exist;

3. Artists (/artist route)

- GET /artist - get all artists. By default there are 2 artists when starting App.
Server should answer with status code 200 and all artists records.

- GET /artist/:id - get single artist by id.
Server should answer with status code 200 and and record with id === artistId if it exists;
Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist;

- POST /artist - create new artist. Body should be in the following format:

```
{
    name: string;
    grammy: boolean;
}
```

Server should answer with status code 201 and newly created record if request is valid;
Server should answer with status code 400 and corresponding message if request body does not contain required fields;

- PUT /artist/:id - update artist info.

ody should be in the following format:

```
{
    name: string;
    grammy: boolean;
}
```

Server should answer with status code 200 and updated record if request is valid;
Server should answer with status code 400 and corresponding message if artist is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist;

- DELETE /artist/:id - delete album.
Server should answer with status code 204 if the record is found and deleted;
Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === artistId doesn't exist;

4. Albums (/album route)

- GET /album - get all albums. By default there are 2 albums when starting App.
Server should answer with status code 200 and all albums records;

- GET /album/:id - get single album by id.
Server should answer with status code 200 and and record with id === albumId if it exists;
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist;

- POST /album - create new album. Body should be in the following format:

```
{
    name: string;
    year: number;
    artistId: string | null;
}
```
Server should answer with status code 201 and newly created record if request is valid;
Server should answer with status code 400 and corresponding message if request body does not contain required fields;

- PUT /album/:id - update album info.Body should be in the following format:

```
{
    name: string;
    year: number;
    artistId: string | null;
}
```
Server should answer with status code 200 and updated record if request is valid;
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist;

- DELETE /album/:id - delete album.
Server should answer with status code 204 if the record is found and deleted;
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if record with id === albumId doesn't exist;
 
5. Favorites

- GET /favs - get all favorites. By default it is an empty array.
Server should answer with status code 200 and all favorite records (not their ids), split by entity type:
```
{
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
```

- POST /favs/track/:id - add track to the favorites.
Server should answer with status code 201 and corresponding message if track with id === trackId exists;
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid);
Server should answer with status code 422 and corresponding message if track with id === trackId doesn't exist;

- DELETE /favs/track/:id - delete track from favorites.
Server should answer with status code 204 if the track was in favorites and now it's deleted id is found and deleted;
Server should answer with status code 400 and corresponding message if trackId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if corresponding track is not favorite;

- POST /favs/album/:id - add album to the favorites.
Server should answer with status code 201 and corresponding message if album with id === albumId exists;
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid);
Server should answer with status code 422 and corresponding message if album with id === albumId doesn't exist;

- DELETE /favs/album/:id - delete album from favorites.
Server should answer with status code 204 if the album was in favorites and now it's deleted id is found and deleted;
Server should answer with status code 400 and corresponding message if albumId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if corresponding album is not favorite;

- POST /favs/artist/:id - add artist to the favorites.
Server should answer with status code 201 and corresponding message if artist with id === artistId exists;
Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid);
Server should answer with status code 422 and corresponding message if artist with id === artistId doesn't exist;

- DELETE /favs/artist/:id - delete artist from favorites.
Server should answer with status code 204 if the artist was in favorites and now it's deleted id is found and deleted;
Server should answer with status code 400 and corresponding message if artistId is invalid (not uuid);
Server should answer with status code 404 and corresponding message if corresponding artist is not favorite;
