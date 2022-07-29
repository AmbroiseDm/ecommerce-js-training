import { Selector } from 'testcafe'

fixture`Getting Started`
    .page`http://localhost:8000/`;


test('Root test', async t => {
    console.log('first test')
});