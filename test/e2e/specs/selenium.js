const assert = require('assert')
const axios = require('axios');

describe('wikipedia preview - ', () => {

    it('should open article on another tab', async (done) => {
        await browser.url('http://localhost:8080')
        el = await $('div.content-en span:nth-child(1)')
        await el.click()
        el=await $('div.wp-text-content > div.wp-title')
        await el.click()
        el=await $('.wp-image')
        await el.click()
        el=await $('a.wp-link')
        await el.click()
        await browser.switchWindow("Cat - Wikipedia")
        assert.strictEqual(await browser.getTitle(), 'Cat - Wikipedia')
    })
    
})
