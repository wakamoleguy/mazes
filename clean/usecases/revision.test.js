const usecases = require('./revision');

describe('Revision use cases', () => {

    describe('Reading a revision', () => {

        let mazeRepository;

        beforeEach(() => {

            mazeRepository = {
                revision: jasmine.createSpyObj('mazeRepository', [
                    'read'
                ])
            };

        });

        it('should resolve to a revision', (done) => {

            mazeRepository.revision.read.and.returnValue(Promise.resolve({
                id: '123',
                data: 'foo'
            }));

            usecases.read(mazeRepository, '123').then((revision) => {

                expect(revision).toEqual({ id: '123', data: 'foo' });
                done();
            }).catch(done.fail);

        });

        it('should resolve to null if no revision is found', (done) => {

            mazeRepository.revision.read.and.returnValue(Promise.resolve(null));

            usecases.read(mazeRepository, '123').then((revision) => {

                expect(revision).toBe(null);
                done();
            }).catch(done.fail);

        });
    });

    describe('Editing a revision', () => {

        describe('when the revision exists', () => {

            it('should save the changes to the revision', (done) => {

                done.fail('Unimplemented');
            });


            it('should resolve successfully', (done) => {

                done.fail('Unimplemented');
            });
        });

        describe('when the revision does not exist', () => {

            it('should reject', (done) => {

                done.fail('Unimplemented');
            });
        });
    });
});
