import { Selector } from 'testcafe'

fixture`Getting Started`
    .page`http://localhost:8000/login`;


test('Login test', async t => {
    console.log(await Selector("h1").textContent)
    await t
    .click('.change-view-message .link')
    console.log(await Selector("h1").textContent)
});