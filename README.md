# Hardcipher CRM CORE


- Website Model
```
{
    web_id: {
      type: String,
      default: () => "HCWEB" + Math.floor(10000 + Math.random() * 90000),
      unique: true,
    },
    website_name: { type: String, required: true, unique: true },
    domain_name: { type: String, required: true, unique: true },
    in_company: { type: Boolean, required: false, default: true },
    pages: [
      {
        name: { type: String, required: false },
        meta_data: { type: String, required: false },
        meta_deta_description: { type: String, required: false },
        section: [
          {
            name: { type: String, required: false },
            title: { type: String, required: false },
            sub_title: { type: String, required: false },
            description: { type: String, required: false },
          },
        ],
      },
    ],
    blogs: [
      {
        meta_deta_description: { type: String, required: false },
        title: { type: String, required: false },
        home_page: { type: Boolean, default: false },
        image: { type: String, required: false },
        url: { type: String, required: false, unique: true },
        description: { type: String, required: false },
      },
    ],
    contact_us: [
      {
        name: { type: String, required: false },
        email: { type: String, required: false },
        phone: { type: String, required: false },
        message: { type: String, required: false },
        subject: { type: String, required: false },
        status: { type: String, default: "not contacted" },
      },
    ],
    newsletter: [
      {
        email: { type: String, required: false },
        status: { type: Boolean, default: false },
      },
    ],
    career: [
      {
        name: { type: String, required: false },
        phone: { type: String, required: false },
        email: { type: String, required: false },
        resume: { type: String, required: false },
        message: { type: String, required: false },
      },
    ],
  }
```
# Website API:
### POST/api/add_website
- Add Website Response
```
{
    "status": true,
    "message": "website added",
    "data": {
        "website_name": "HARDCIPHER 1",
        "domain_name": "www.hardcipher.in",
        "in_company": true,
        "pages": [],
        "blogs": [],
        "contact_us": [],
        "career": [],
        "_id": "6457d83cce4bb3ca7bb479ea",
        "web_id": "HCWEB85085",
        "newsletter": [],
        "createdAt": "2023-05-07T16:56:28.663Z",
        "updatedAt": "2023-05-07T16:56:28.663Z",
        "__v": 0
    }
}
```
### GET/api/get_website/:web_id
- Get Website Response:
```
{
    "status": true,
    "message": "website found",
    "data": {
        "_id": "6457d83cce4bb3ca7bb479ea",
        "website_name": "HARDCIPHER 1",
        "domain_name": "www.hardcipher.in",
        "in_company": true,
        "pages": [],
        "blogs": [],
        "contact_us": [],
        "career": [],
        "web_id": "HCWEB85085",
        "newsletter": [],
        "createdAt": "2023-05-07T16:56:28.663Z",
        "updatedAt": "2023-05-07T16:56:28.663Z",
        "__v": 0
    }
}
```
- only web_id passing in params 
- Fetching a website
### DELETE/api/delete_website/:web_id
- only web_id passing in params


# Blogs API:

### POST/api/add_blog
- Add Blog Response:
```
{
    "status": true,
    "message": "blog added",
    "data": [
        {
            "title": "Hardcipher ",
            "home_page": false,
            "url": "https://assessment.hackerearth.com/challenges/new/hiring/velotio-software-engineer-hiring-challenge-2023/",
            "_id": "6457e5fefd81c870a46c34ff"
        }
    ]
}
```
- web_id will passes in body
- And blogs in body
### PUT/api/update_blog/:id
- blog id passes in params
- web_id passing in body

### GET/api/get_blog_by_id/:web_id/:id
- Get Blog Response
 ```
 {
    "status": true,
    "message": "blog found",
    "data": {
        "title": "Hardcipher ",
        "home_page": false,
        "url": "https://assessment.hackerearth.com/challenges/new/hiring/velotio-software-engineer-hiring-challenge-2023/",
        "_id": "6457e5fefd81c870a46c34ff"
    }
}
 
 ```
- fetching a blog of a website


### GET/api/get_blogs_list/:web_id
- Blogs will be in array
- fetching all blogs of a website
### DELETE/api/delete_blog/:web_id/:id
-Deleted website will be response
- delete a single blog of a website

# Mail API:

### POST/api/send_mail
- Response:

```yaml
{
    "status": true,
    "message": "mail sent",
    "data": {
        "accepted": [
            "ballinbee20@gmail.com",
            "kumarabhishek13691@gmail.com"
        ],
        "rejected": [],
        "ehlo": [
            "SIZE 35882577",
            "8BITMIME",
            "AUTH LOGIN PLAIN XOAUTH2 PLAIN-CLIENTTOKEN OAUTHBEARER XOAUTH",
            "ENHANCEDSTATUSCODES",
            "PIPELINING",
            "CHUNKING",
            "SMTPUTF8"
        ],
        "envelopeTime": 865,
        "messageTime": 908,
        "messageSize": 760,
        "response": "250 2.0.0 OK  1683481961 ot5-20020a17090b3b4500b002508d73f4e8sm85677pjb.57 - gsmtp",
        "envelope": {
            "from": "hardcipher",
            "to": [
                "ballinbee20@gmail.com",
                "kumarabhishek13691@gmail.com"
            ]
        },
        "messageId": "<affde3f3-a1c8-8a40-4663-4cca0e02147a@hardcipher>"
    }
}
```

# Newslwtter API

### POST/api/add_newsletter
- Response
```
{
    "status": true,
    "message": "newsletter added",
    "data": [
        {
            "email": "abhis123hg@gmail.com",
            "status": false,
            "_id": "6457eccefd81c870a46c3516"
        }
    ]
}
```
- This will save email in DB

### GET/api/get_newsletter_by_id/:web_id/:id
- A newsltter will fetch 

### UPDATE/api/update_newsletter/:id
- This will update a newsletter




 To Run:
- npm install node-modules
- npm start
