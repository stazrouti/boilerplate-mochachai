const chai = require('chai');
const assert = chai.assert;

const server = require('../server');

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);
  suite('Integration tests with chai-http', function () {
    // #1
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello Guest');
          done();
        });
    });
    // #2
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200);
          assert.equal(res.text, 'hello xy_z');
          done();
        });
    });
    // #3
    test('Send {surname: "Colombo"}', function (done) {
      chai
      .request(server)
      .put('/travellers')
      
      .send({ surname: 'Colombo' })
      
      .end(function(err, res) {
        
        assert.equal(res.status, 200, 'response status should be 200');
        assert.equal(res.type, 'application/json', 'Response should be json');
        assert.equal(
          res.body.name,
          'Cristoforo',
          'res.body.name should be "Christoforo"'
        );
        assert.equal(
          res.body.surname,
          'Colombo',
          'res.body.surname should be "Colombo"'
        );

          done();
        });
    });
    // #4
    test('send {surname: "da Verrazzano"}', function(done) {
      
      chai
        .request(server)
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        
        .end(function(err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.equal(res.body.name, 'Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano');
    
          done();
        });
    });
  });
});

const Browser = require('zombie');

suite('Functional Tests with Zombie.js', function () {
  this.timeout(5000);



  suite('Headless browser', function () {
    test('should have a working "site" property', function() {
      Browser.site = 'http://localhost:3000'; // Your URL here

      const browser = new Browser();
    
      suiteSetup(function(done) {
        return browser.visit('/', done);
      });
      assert.isNotNull(browser.site);
    });
  });

  suite('"Famous Italian Explorers" form', function () {
      // #5
      test('Submit the surname "Colombo" in the HTML form', function (done) {
        var url = 'https://3000-freecodecam-boilerplate-10g2b5nzrrf.ws-eu113.gitpod.io';
        var browser = new Browser();
    
        browser.visit(url).then(function() {
          return browser.fill('surname', 'Colombo');
        }).then(function() {
          return browser.pressButton('submit');
        }).then(function() {
          // Assertions
          browser.assert.success();
          browser.assert.text('span#name', 'Cristoforo');
          browser.assert.text('span#surname', 'Colombo');
          browser.assert.elements('span#dates', 1);
          done();
        }).catch(function(error) {
          done(error); // If there's an error, pass it to done
        });
      });
    test('Submit the surname "Vespucci" in the HTML form', function (done) {
      var url = 'https://3000-freecodecam-boilerplate-10g2b5nzrrf.ws-eu113.gitpod.io';
      var browser = new Browser();
    
      browser.visit(url).then(function() {
        return browser.fill('surname', 'Vespucci');
      }).then(function() {
        return browser.pressButton('submit');
      }).then(function() {
        // Wait for the AJAX request to complete and the content to be updated
        return browser.wait();
      }).then(function() {
        // Debugging statements to log the text content of the <span> elements
        /* console.log(browser.text('span#surname'));
        console.log(browser.text('span#name')); */
    
        // Assertions
        browser.assert.success();
        browser.assert.text('span#name', 'Amerigo');
        browser.assert.text('span#surname', 'Vespucci');
        browser.assert.elements('span#dates', 1);
        done();
      }).catch(function(error) {
        done(error); // If there's an error, pass it to done
      });
    });
    
    
    
  });
});
