export const testParams = (testDescription, expectedMessage, testFunction, params) => {
    it(testDescription, () => {
        let thrownError;      
        try {
            testFunction(params[0], params[1], params[2], params[3], params[4]);
        }
        catch(error) {
            thrownError = error;
        }
        expect(thrownError.message).toBe(expectedMessage);
    });
}
