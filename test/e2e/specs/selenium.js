const assert = require('assert')

describe('wikipedia preview - ', () => {

    it('should open article on another tab', async (done) => {
        await browser.url('https://wikimedia.github.io/wikipedia-preview')
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
