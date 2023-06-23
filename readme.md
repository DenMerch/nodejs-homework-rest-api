## Contacts storage

## USER

/register: POST
Request body - json:
{
    "email": "across@mail.com",
  "password": "123456"
}
\\\\\\\\\\\\\\\\\

/login: POST
Request body - json:
{
    "email": "across@mail.com",
  "password": "123456"
}
get - TOKEN
\\\\\\\\\\\\\\\\\

/logout: POST
The token issued to the current user
\\\\\\\\\\\\\\\\\

/current: GET
The token issued to the current user
\\\\\\\\\\\\\\\\\

/: PATCH
The token issued to the current user
Request body - json:
{
    "subscription": ["starter", "pro", "business"]
}
\\\\\\\\\\\\\\\\\

/avatars: PATCH
The token issued to the current user
Request body - form-data:
file - avatar.jpg,png
\\\\\\\\\\\\\\\\\


## CONTACTS

/: GET
The token issued to the current user

\\\\\\\\\\\\\\\\\

/:id: GET
The token issued to the current user
Request body - json:
{
    "id": "someId"
}
\\\\\\\\\\\\\\\\\

/:id: DELETE
The token issued to the current user
Request body - json:
{
    "id": "someId"
}
\\\\\\\\\\\\\\\\\

/:id: DELETE
The token issued to the current user
Request body - json:
{
    "id": "someId"
}
\\\\\\\\\\\\\\\\\

/: POST
The token issued to the current user
Request body - json:
{
    "name": "someName",
    "email":"someEmail",
    "phone":"somePhone"
}
\\\\\\\\\\\\\\\\\

/:id: PUT
The token issued to the current user
Request body - json:
{
    "name": "someName",
    "email":"someEmail",
    "phone":"somePhone"
}
\\\\\\\\\\\\\\\\\

/:id: PUT
The token issued to the current user
Request body - json:
{
    "name": "someName",
    "email":"someEmail",
    "phone":"somePhone"
}
\\\\\\\\\\\\\\\\\

/:id/favorite: PATCH
The token issued to the current user
Request body - json:
{
    "favorite": [trye/false]
}
\\\\\\\\\\\\\\\\\