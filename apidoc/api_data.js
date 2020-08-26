define({ "api": [
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
          "title": "Success-Response:",
          "content": "{\n   \"title\": \"User registration successful\",\n   \"status\": \"200\",\n}",
          "type": "json"
        },
        {
          "title": "Conflict-Response:",
          "content": "{\n   \"title\": \"User already exists\",\n   \"status\": \"409\",\n   \"code\": 409001\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "controllers/auth.js",
    "groupTitle": "auth"
  }
] });
