var expect = require('expect');

var {generateMessage} = require('./message');


describe('generateMessage', () => {
    it('should generate correct message object', () => {
        const from = "Simon";
        const text = "This is a test message you love";

        var message = generateMessage(from, text);

        expect(message).toBeTruthy();
        expect(message).toMatchObject({from,text});
        expect(typeof message.createdAt ).toBe('number');



    });
});
