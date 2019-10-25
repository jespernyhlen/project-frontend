/**
 * Test for getting started with Selenium.
 */
'use strict';

const assert = require('assert');
const test = require('selenium-webdriver/testing');
const webdriver = require('selenium-webdriver');
const firefox = require('selenium-webdriver/firefox');
const By = webdriver.By;

let browser;

// Test suite
test.describe('Logged in navbar and links', function() {
    this.timeout(0);

    test.beforeEach(function(done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .build();

        browser.get('http://localhost:8082/');

        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    // Test case
    test.it('Test login link is available', async function(done) {
        browser
            .executeScript(
                "localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcHBlX255aGxlbkBob3RtYWlsLmNvbSIsImlhdCI6MTU3MjAyNzkzNywiZXhwIjoxNjAzNTYzOTM3fQ.6-6K0B0aUrKTkz8Hq6PH7v4FlIG_gL71UlVor49vWPs');"
            )
            .then(function(key) {
                browser.get('http://localhost:8082/');
                browser
                    .findElement(By.xpath('//nav/ul/li[1]/a'))
                    .then(function(element) {
                        element.getText().then(function(text) {
                            assert.equal(text, 'Profile');
                        });
                    });
            });

        done();
    });

    // Test case
    test.it('Test trading link is available', async function(done) {
        browser
            .executeScript(
                "localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcHBlX255aGxlbkBob3RtYWlsLmNvbSIsImlhdCI6MTU3MjAyNzkzNywiZXhwIjoxNjAzNTYzOTM3fQ.6-6K0B0aUrKTkz8Hq6PH7v4FlIG_gL71UlVor49vWPs');"
            )
            .then(function(key) {
                browser.get('http://localhost:8082/');
                browser
                    .findElement(By.xpath('//nav/ul/li[2]/a'))
                    .then(function(element) {
                        element.getText().then(function(text) {
                            assert.equal(text, 'Trading');
                        });
                    });
            });

        done();
    });

    // Test case
    test.it('Test logout link is available', async function(done) {
        browser
            .executeScript(
                "localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcHBlX255aGxlbkBob3RtYWlsLmNvbSIsImlhdCI6MTU3MjAyNzkzNywiZXhwIjoxNjAzNTYzOTM3fQ.6-6K0B0aUrKTkz8Hq6PH7v4FlIG_gL71UlVor49vWPs');"
            )
            .then(function(key) {
                browser.get('http://localhost:8082/');
                browser
                    .findElement(By.xpath('//nav/ul/li[3]/a'))
                    .then(function(element) {
                        element.getText().then(function(text) {
                            assert.equal(text, 'Logout');
                        });
                    });
            });

        done();
    });
});
