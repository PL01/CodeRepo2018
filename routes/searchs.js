const express = require('express');
const router = express.Router();
const config = require('../config/database');
const Search = require('../models/search');

// Search
router.post('/search', (req, res, next) => {

  const key = req.body.search;
  
  Search.getDefByKey(key, (err, search) => {
	    if(err) throw err;
	    if(!search){
	    	return res.json({success: false, msg:'Key does not exist!'});
	    }
	    console.log(search[0].definition);
	    for(att in search)
	    {
	    	if(att!=0)
	    	{
	    		search[0].attribute += "---" + search[att].attribute;
	    		search[0].attDefinition += "---" + search[att].attDefinition;
	    	}
	    }
	    console.log(search[0].definition);
	    res.json({
	    	search:{
	    		key: search[0].key,
	    		definition: search[0].definition,
	    		attribute: search[0].attribute,
	    		attDefinition: search[0].attDefinition
	    	}
	    });
  });
});

module.exports = router;