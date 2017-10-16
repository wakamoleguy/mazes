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
});
