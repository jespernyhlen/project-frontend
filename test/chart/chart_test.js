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
test.describe('Chart', function() {
    this.timeout(0);

    test.beforeEach(function(done) {
        browser = new webdriver.Builder()
            .withCapabilities(webdriver.Capabilities.firefox())
            .setFirefoxOptions(new firefox.Options().headless())
            .build();

        browser.get('http://localhost:8082/chart');

        done();
    });

    test.afterEach(function(done) {
        browser.quit();
        done();
    });

    function assertLoadingDiv(target, targetText) {
        browser.findElement(By.className(target)).then(function(element) {
            element.getText().then(function(text) {
                assert.equal(text, targetText);
            });
        });
    }

    function assertChartContainer(target, targetText) {
        browser.findElement(By.css(target)).then(function(element) {
            element.getAttribute('class').then(function(text) {
                assert.equal(text, targetText);
            });
        });
    }

    // Test case
    test.it('Test chart title and loading text', async function(done) {
        browser
            .executeScript(
                "localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcHBlX255aGxlbkBob3RtYWlsLmNvbSIsImlhdCI6MTU3MjAyNzkzNywiZXhwIjoxNjAzNTYzOTM3fQ.6-6K0B0aUrKTkz8Hq6PH7v4FlIG_gL71UlVor49vWPs');"
            )
            .then(function(key) {
                browser.get('http://localhost:8082/chart');
                browser.getTitle().then(function(title) {
                    assert.equal('Stocktrader', 'Stocktrader');
                });
                assertLoadingDiv(
                    'loading-data',
                    'Collecting data for marketprices, wait a second..'
                );
            });
        done();
    });

    // Test case
    test.it('Test chart canvas and render class', async function(done) {
        browser
            .executeScript(
                "localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImplcHBlX255aGxlbkBob3RtYWlsLmNvbSIsImlhdCI6MTU3MjAyNzkzNywiZXhwIjoxNjAzNTYzOTM3fQ.6-6K0B0aUrKTkz8Hq6PH7v4FlIG_gL71UlVor49vWPs');"
            )
            .then(function(key) {
                browser.get('http://localhost:8082/chart');

                assertChartContainer('canvas', 'chartjs-render-monitor');
            });
        done();
    });
});
