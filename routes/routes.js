const router = require("express").Router();

const website_controller = require("../controllers/website.controller");
const blog_controller = require("../controllers/blog.cotroller");
const newsLetter_controller=require('../controllers/newsletter.controller')
const mailer= require('../helper/mailer')

//website routes
router.post("/add_website", website_controller.add_website);
router.delete("/delete_website/:web_id",website_controller.delete_website)
router.get("/get_website/:web_id",website_controller.get_website)

//blog routes
router.post("/add_blog/",blog_controller.add_blog)
router.delete("/delete_blog/:web_id/:id",blog_controller.delete_blog)
router.get("/get_blog_by_id/:web_id/:id",blog_controller.get_blog)
router.put("/update_blog/:id",blog_controller.update_blog)
router.get("/get_blogs_list/:web_id",blog_controller.get_blogs_list)

//mailer route
router.post("/send_mail",mailer.send_mail)

//mewsletter routes
router.post("/add_newsletter",newsLetter_controller.add_newsletter)
 router.get("/get_newsletter_by_id/:web_id/:id",newsLetter_controller.get_newsletter)
 router.put('/update_newsletter/:id',newsLetter_controller.update_newsletter)







module.exports=router