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
test.describe('Register', function() {
    this.timeout(0);

    test.beforeEach(function(done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .build();

        browser.get('http://localhost:8082/register');

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

    function assertBtn(target) {
        browser.findElement(By.css('button')).then(function(element) {
            element.getAttribute('type').then(function(type) {
                assert.equal(type, target);
            });
        });
    }

    function assertForm(target) {
        browser.findElement(By.name(target)).then(function(element) {
            element.getAttribute('name').then(function(type) {
                assert.equal(type, target);
            });
        });
    }

    // Test case
    test.it('Test register form firstname input exists', function(done) {
        assertForm('firstname');
        matchUrl('register');

        done();
    });

    // Test case
    test.it('Test register form lastname input exists', function(done) {
        assertForm('lastname');
        matchUrl('register');

        done();
    });

    // Test case
    test.it('Test register form year input exists', function(done) {
        assertForm('year');
        matchUrl('register');

        done();
    });

    // Test case
    test.it('Test register form email input exists', function(done) {
        assertForm('email');
        matchUrl('register');

        done();
    });

    // Test case
    test.it('Test register form password input exists', function(done) {
        assertForm('password');
        matchUrl('register');

        done();
    });

    // Test case
    test.it('Test register form submit exists', function(done) {
        assertBtn('submit');
        matchUrl('register');

        done();
    });

    // Test case
    test.it('Test login form function', async function(done) {
        let email = 'jeppe_nyhlen@hotmail.com';
        await browser.findElement(By.name('firstname')).sendKeys('jesper');
        await browser.findElement(By.name('lastname')).sendKeys('nyhlen');
        await browser.findElement(By.name('year')).click();
        await browser.findElement(By.name('year')).click();
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
