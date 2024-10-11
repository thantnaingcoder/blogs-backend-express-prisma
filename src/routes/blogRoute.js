const express = require('express');
const auth = require('../middleware/AuthMiddleware'); // Adjust the path if necessary
const { PrismaClient } = require('@prisma/client');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const multer = require("multer");
const jwt = require("jsonwebtoken");
const upload = multer({ dest: "uploads/" });
const prisma = new PrismaClient();
const router = express.Router();
const fs = require('fs');


router.get("/blogs",auth, async (req, res) => {                  //..................get all blogs...............
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(" ")[1];
     const authUser = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    try {
              const blogs = await prisma.blog.findMany({
                where: { userId: authUser.userId },
              });
              res.json(blogs);
            } catch (error) {
              return res.status(401).json({ error: "Unauthorized" });
            }
          
    });

 router.post("/upload",auth,upload.single("photo"),                      //..............blog upload...................
 [  
    body("title").not().isEmpty().withMessage("Title is required"),
    body("content").not().isEmpty().withMessage("Content is required"),
    body("author").not().isEmpty().withMessage("Author is required")  
]
  ,async (req, res) => {
    const authorization = req.headers.authorization;
    const token = authorization && authorization.split(" ")[1];
    
     const authUser = jwt.verify(token, process.env.NEXTAUTH_SECRET);
    const { file } = req;
    const { title, content, author } = req.body;

    
    if (!file) {
      return res.status(400).json({ error: "Photo is required" });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
  

      const photo = await prisma.blog.create({
        data: {
          title,
          content,
          author,
          url: `/uploads/${file.filename}`,
          userId: authUser.userId,
        },
      });
      res.json(photo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
 })   

module.exports = router;
