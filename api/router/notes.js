const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const moment = require("moment");
const jwt = require('jsonwebtoken');
const Authenticate = require('../middlewares/isAuth');

const Note = require("../models/note");
const User = require("../models/user");

router.get("/", Authenticate, (req, res, next) => {
  Note.find()
    .select("title content date")
    .exec()
    .then(docs => {
      const response = {
        //count: docs.length,
        notes: docs.map(doc => {
          return {
            id: doc.id,
            title: doc.title,
            content: doc.content,
            date: doc.date
            // request: {
            //   type: "GET",
            //   url: " http://localhost:5000/notes/" + doc._id
            // }
          };
        })
      };
      //console.log(response);
      res.status(200).json(response.notes);
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

router.post("/", Authenticate, (req, res, next) => {
  var formatted_date = moment(req.body.date).format("YYYY-DD-MM");
  const note = new Note({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    content: req.body.content,
    date: formatted_date
  });
  note
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "Created note Successfully",
        createdNote: {
          title: result.title,
          content: result.content,
          date: result.date
          // request: {
          //   type: "GET",
          //   url: "http://localhost:5000/notes/" + result._id
          // }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.get("/:NotesId", Authenticate, (req, res, next) => {
  const id = req.params.NotesId;
  Note.findById(id)
    .select("title content date")
    .exec()
    .then(doc => {
      if (doc) {
        // Object.assign(id, doc._id);
        // console.log(doc);
        res.status(200).json(doc);
      } else {
        res.status(404).json({
          message: "No valid Entry Found"
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.delete("/:NotesId", Authenticate, (req, res, next) => {
  const id = req.params.NotesId;

  Note.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Note Deleted",
        request: {
          type: "POST"
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  res.status(200).json({
    message: "Deleting Note"
  });
});

router.post("/login", (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({
    username: username,
    password: password
  })
    .exec()
    .then(user => {
      if (user) {
        console.log(user);
        const token = jwt.sign(
          {
            id: user._id,
            username: user.username
          },
          "supersecret",
          { expiresIn: "8h" }
        );
        console.log("token :", token);
        res.status(200).json({
          "message": "Logged In Successfully",
          "token": token
        });
      } else {
        res.status(200).json({
          "message": "Unsuccessful.! Invalid User ID or Password"
        });
      }
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
