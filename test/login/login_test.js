/**
 * Test for getting started with Selenium.
 */
'use strict';

const assert = require('assert');
const test = require('selenium-webdriver/testing');
const { Key, until } = require('selenium-webdriver');
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
        browser.get('http://localhost:8082/login');
        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function matchUrl(target) {
        browser.getCurrentUrl().then(function(url) {
            assert.ok(url.endsWith(target));
        });
    }

    function assertH1(target) {
        browser.findElement(By.css('h1')).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, target);
            });
        });
    }

    function assertBtn(target) {
        browser.findElement(By.css('button')).then(function(element) {
            element.getAttribute('type').then(function(type) {
                assert.equal(type, target);
            });
        });
    }

    function assertForm(target) {
        browser.findElement(By.name(target)).then(function(element) {
            element.getAttribute('type').then(function(type) {
                assert.equal(type, target);
            });
        });
    }

    // Test case
    test.it('Test login title and header', function(done) {
        let promise = browser.getTitle();

        promise.then(function(title) {
            assert.equal(title, 'Stocktrader');
        });

        browser.getTitle().then(function(title) {
            assert.equal(title, 'Stocktrader');
        });

        assertH1('Stocktrader');
        matchUrl('login');

        done();
    });

    // Test case
    test.it('Test login form email input exists', function(done) {
        assertForm('email');
        matchUrl('login');

        done();
    });

    // Test case
    test.it('Test login form password input exists', function(done) {
        assertForm('password');
        matchUrl('login');

        done();
    });

    // Test case
    test.it('Test login form submit exists', function(done) {
        assertBtn('submit');
        matchUrl('login');

        done();
    });

    // Test case
    test.it('Test login form function', async function(done) {
        let email = 'jeppe_nyhlen@hotmail.com';

        await browser.findElement(By.name('email')).sendKeys(email);
        await browser.findElement(By.name('password')).sendKeys('hejhej');
        await browser.findElement(By.css('button')).sendKeys(Key.RETURN);
        await browser.wait(
            until.elementLocated(By.id('loading-bar-spinner')),
            1000
        );

        done();
    });
});
