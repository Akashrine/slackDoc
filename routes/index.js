var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
        var login = "LOGINCONFLUENCE";
        var password = "PASS";
        var url = "https://" + login + ":" + password + "@akashrine.atlassian.net/wiki/rest/api/content/search";
        url += "?os_authType=basic&cql=text+~+";
        // query string a proteger ensuite
        url += req.query.text;
        request(url, {timeout: 1500}, function (error, response, body) {
	if (!error && response.statusCode == 200) {
                var jsonResponse = JSON.parse(body);
                var baseUrl = jsonResponse._links.base;
                var responseText = "";

                // a gerer cas aucune réponse

                jsonResponse.results.forEach(function(elt) {
                    // chacune des reponses est mise sous la forme : REPONSE <URL>\n
                    responseText += elt.title + " " + "<" + baseUrl + elt._links.webui + ">" + "\n";
                });
                res.send(responseText);
        }
        else {
 
	res.send('Aucune reponse du service');
          // handle Error
        }

	});
});

module.exports = router;
