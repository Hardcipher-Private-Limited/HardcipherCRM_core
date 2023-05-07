//schema of  website
const mongoose=require('')

{
   
    "id":HCWEB+five digit numberRANDOM ,
    "website_name":String,
    "domain_name": String,
    "in_company":Boolean,
    pages:[{
        "name":String,
        "meta_data":
        "meta_deta_description":
        section:[{
            "name":String,
            "title":String,
            "sub_title":String,
            "description":String
            
        }]
    }],
    blogs:[{
        "meta_data":,
        "meta_deta_description": ,
        "title":String,
        "title_description":String,
        "image":String,
        "url":String,
        "description":String
     
    }],
    "contact_us": [{
        "name":String,
        "email":String,
        "phone":String,
        "message":String,
        "subject":String
        "status":String,default: not contacted,
    }],
"newsLetter":[{
    "email":{String},
    "status":{Boolean,default:true}
}],
"carrer":[{
    "name":String,
    "phone":{String},
    "email":{String},
    "resume":String,
    "message":{String}
}]

}

//schema of website data

//APIs have to build=================
// add website api
// delete website api
//fetch website api

//PAGE APIs=======
// add page api
// delete page api
//update page api
// fetch page api

//BLOGS APIs===
// add blog api
//update blog api
//delete blog api
//fetch blog api

//CONTACT US APIs
// add contact us api
// fetch conatct us api
// update 

//NEWSLETTER APIs

// add newsletter api
//fetch api
// update api

//CARRER APIs
//add
//fetch 
//update apis
