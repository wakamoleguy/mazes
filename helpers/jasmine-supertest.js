beforeAll(() => {

    jasmine.finish = (done) => {
        return (err, res) => {
            if (err) {
                done.fail(err);
            } else {
                done();
            }
        };
    };
});
