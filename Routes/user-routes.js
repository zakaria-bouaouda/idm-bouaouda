
const express = require('express')
const router = express.Router();
const userSchema = require("../Modeles/evenement")

router.post('/update',async (req, res) => {
    // if (!ObjectId.isValid(req.params.id))
    //     return res.status(400).send(`No record with given id : ${req.params.id}`);

  
    const {id,event}=req.body;

    const e = await userSchema.findById(id)

    if (!e) {
        res.status('401').json({
            message:'error'
        })


        
    }else{

        e.date = event.date;
        e.tache = event.tache;
        e.lieu= event.lieu;
        e.debut= event.debut;
        e.fin= event.fin
  

    const saveEvent  = await e.save();
    if (!saveEvent) {
      return  res.status(401).json({
            message:'error'
        })
    } else {
        return  res.status(200).json({
            message:'update succeed'
        })
    }
}


    // var emp = {
    //     date: req.body.date,
    //     tache: req.body.tache,
    //     lieu: req.body.lieu,
    //     debut: req.body.debut,
    //     fin: req.body.fin
    // };
    // userSchema.findByIdAndUpdate(req.params.id, { $set: emp }, { new: true }, (err, doc) => {
    //     if (!err) { res.send(doc); }
    //     else { console.log('Error in Event Update :' + JSON.stringify(err, undefined, 2)); }
    // });
});
// GET ALL
router.route('/').get((req,res)=>{
    userSchema.find((error,response)=>{
        if(error){
            return next(error)
        }
        else{
            res.status(200).json(response)
        }
    })
})

// GET SINGLE USER BY ID
router.route('/:id').get((req,res)=>{
    userSchema.findById(req.params.id,(error,data)=>{
        if(error){
            return next(error);
        }
        else {
            res.status(200).json({
                data
            })
        }
    })
})
// Delete ip adress by id
router.post("/delete/:id",(req,res)=>{
    userSchema.findByIdAndDelete(req.params.id,(error,data)=>{
        if (error) {
            console.log(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})
// Save USER
router.post("/add",(req,res)=>{
    const user = new userSchema(req.body);
    user.save().then((response)=>{
        res.status(201).json({
            message: req.body.name+" added to DB",
            result: response,
        });
    }).catch(error=>{
        res.status(500).json({
            error: error
        });
    })
})

module.exports = router
