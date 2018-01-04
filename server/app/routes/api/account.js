const router = require("express").Router();
const db = require("../../models");



//delete account

    router.delete("/:accountid", function(req, res) {
        const currentAccount = req.params.accountid
        
        db.Account.destroy({
            where: { id: currentAccount }
        }).then(function(dbAccount) {
            console.log(dbAccount);
        })
    });


    //Get transasctions for a user account
    router.get("/:accountid", function(req, res) {

        const currentAccount = req.params.accountid
        
        db.Transaction.findAll(
        {
            include: [ 
                { 
                    model: db.Account,
                    where: { id: currentAccount }
                }
            ]
        })
        .then(function(transactions) {
          res.json(transactions);
        });
    });