define({ "api": [
  {
    "type": "post",
    "url": "/auth/login",
    "title": "Login",
    "name": "Login",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "useraname",
            "description": "<p>Valid username of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Example:",
          "content": "{\n   \"username\": \"sadat.talks@gmail.com\",\n   \"password\": \"sadat@642\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"title\": \"Login successful\",\n   \"status\": \"200\",\n}",
          "type": "json"
        },
        {
          "title": "Not found",
          "content": "{\n   \"title\": \"User not found\",\n   \"status\": \"404\",\n   \"code\": 404001\n}",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "{\n   \"title\": \"Invalid query parameter\",\n    \"status\": \"400\",\n    \"errors\": [\n     {\n      \"value\": \"@sadat.talksgmail.com\",\n      \"msg\": \"Must be a valid email\",\n      \"param\": \"username\",\n      \"location\": \"body\"\n     }\n   ],\n   \"code\": 400002\n}",
          "type": "json"
        },
        {
          "title": "Bad request [not verified]",
          "content": "{\n   \"title\": \"Email already verified\",\n   \"status\": \"200\",\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/auth/register",
    "title": "Create new user",
    "name": "Register_User",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "address",
            "description": "<p>Address of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "string",
            "optional": false,
            "field": "username",
            "description": "<p>Valid email of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"title\": \"User registration successful\",\n   \"status\": \"200\",\n}",
          "type": "json"
        },
        {
          "title": "Conflict",
          "content": "{\n   \"title\": \"User already exists\",\n   \"status\": \"409\",\n   \"code\": 409001\n}",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "{\n   \"title\": \"Invalid request data\",\n    \"status\": \"400\",\n    \"errors\": [\n     {\n      \"value\": \"@sadat.talksgmail.com\",\n      \"msg\": \"Must be a valid email\",\n      \"param\": \"username\",\n      \"location\": \"body\"\n     }\n   ],\n   \"code\": 400001\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/auth.js",
    "groupTitle": "auth"
  },
  {
    "type": "get",
    "url": "/auth/verify-email?username=sadat.talks@gmail.com&token=aszdian4a1s",
    "title": "Email verify",
    "name": "Verify_Email",
    "group": "auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "useraname",
            "description": "<p>Valid username of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>verification token.</p>"
          }
        ]
      }
    },
    "success": {
      "examples": [
        {
          "title": "Success",
          "content": "{\n   \"title\": \"Email verification successful\",\n   \"status\": \"200\",\n}",
          "type": "json"
        },
        {
          "title": "Success [if already verified]",
          "content": "{\n   \"title\": \"Email already verified\",\n   \"status\": \"200\",\n}",
          "type": "json"
        },
        {
          "title": "Not found",
          "content": "{\n   \"title\": \"User not found\",\n   \"status\": \"404\",\n   \"code\": 404001\n}",
          "type": "json"
        },
        {
          "title": "Bad request",
          "content": "{\n   \"title\": \"Invalid query parameter\",\n    \"status\": \"400\",\n    \"errors\": [\n     {\n      \"value\": \"@sadat.talksgmail.com\",\n      \"msg\": \"Must be a valid email\",\n      \"param\": \"username\",\n      \"location\": \"query\"\n     }\n   ],\n   \"code\": 400002\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/auth.js",
    "groupTitle": "auth"
  }
] });
