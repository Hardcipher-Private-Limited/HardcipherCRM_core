const router = require("express").Router();

const website_controller = require("../controllers/website.controller");
const blog_controller = require("../controllers/blog.cotroller");
const newsLetter_controller = require("../controllers/newsletter.controller");
const page_controller = require("../controllers/pages.controller");
const contact_us = require("../controllers/contactus.controller");
const career_controller = require("../controllers/career.controller");
const user_controller = require('../controllers/user.controller')
const task_tracker = require("../controllers/tastracker.controller")
const offerletter_controller = require("../controllers/offerletter.controller")
const brand_controller = require("../controllers/brand.controller")



const mail_helper = require("../helper/mailer");
const aws_helper = require('../helper/aws')


//website routes
router.post("/add_website", website_controller.add_website);
router.delete("/delete_website/:web_id", website_controller.delete_website);
router.get("/get_website/:web_id", website_controller.get_website);

//blog routes
router.post("/add_blog/", blog_controller.add_blog);
router.delete("/delete_blog/:web_id/:id", blog_controller.delete_blog);
router.get("/get_blog_by_id/:web_id/:id", blog_controller.get_blog);
router.put("/update_blog/:id", blog_controller.update_blog);
router.get("/get_blogs_list/:web_id", blog_controller.get_blogs_list);

//mailer route
router.post("/send_mail", mail_helper.send_mail);

//mewsletter routes
router.post("/add_newsletter", newsLetter_controller.add_newsletter);
router.get(
  "/get_newsletter_by_id/:web_id/:id",
  newsLetter_controller.get_newsletter
);
router.put("/update_newsletter/:id", newsLetter_controller.update_newsletter);
//unsubscribe the newsletter
router.put("/unsubscribe_newsletter/:web_id", newsLetter_controller.unsubscribe_newsletter);


// page routes
router.post("/add_page", page_controller.add_page);
router.delete("/delete_page/:web_id/:id", page_controller.delete_page);
router.get("/get_page_by_id/:web_id/:id", page_controller.get_page);
router.put("/update_page/:id", page_controller.update_page);
router.post("/insert_section/:id", page_controller.insert_section);
router.put("/update_section/:id", page_controller.update_section);
router.get("/get_section/:id", page_controller.get_section)

//contact us rotes
router.post("/add_contact_us/:id", contact_us.add_contactus);
router.get("/get_contact_us/:web_id/:id", contact_us.get_contactus);
router.put("/update_contact_us/:id", contact_us.update_contactus);

//career route
router.post("/add_career/:web_id", career_controller.add_career)
router.get("/get_career/:web_id/:id", career_controller.get_career)
router.put("/update_career/:id", career_controller.update_career)

//user routes
router.post("/register_user", user_controller.register_user)
router.post("/login_user", user_controller.login_user)
router.put('/update_user/:empId', user_controller.update_user)
router.get('/get_user/:empId', user_controller.get_user_by_id)
router.get("/get_user_list", user_controller.get_all_user)

//task tracker routes
router.post("/assign_task", task_tracker.add_tasktracker)
router.get("/get_task/:empId", task_tracker.get_tasktracker)
router.get("/get_task_list", task_tracker.get_all_tasktracker)
router.put("/update_task/:empId", task_tracker.update_tasktracker)
router.delete("/delete_task/:empId", task_tracker.delete_tasktracker)

//OFFER LETTER ROUTES
router.post("/add_offer_letter", offerletter_controller.add_offer_letter)
router.get("/get_offer_letter/:offerletterId", offerletter_controller.get_offer_letter_by_id)

//Brands routes
router.post("/add_brand", brand_controller.add_brand)
router.get("/get_brand/:brandId", brand_controller.get_brand_by_id)
router.get("/get_brand_list", brand_controller.get_all_brand)
router.put("/update_brand/:brandId", brand_controller.update_brand)




module.exports = router;
