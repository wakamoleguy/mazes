const DATA = require('./data');

describe('Mock data', () => {

    describe('User', () => {

        it('should have three users', () => {

            expect(DATA.users).toBeDefined();

            expect(Object.keys(DATA.users).length).toBe(3);
        });

        describe('Ned', () => {

            const ned = DATA.users.ned;

            it('should have primitive attributes', () => {

                expect(ned).toBeDefined();

                expect(ned.id).toBe('001');
                expect(ned.email).toBe('ned@stark.example.com');
                expect(ned.display).toBe('Eddard Stark');
            });
        });

        describe('Cat', () => {

            const cat = DATA.users.cat;

            it('should have primitive attributes', () => {

                expect(cat).toBeDefined();

                expect(cat.id).toBe('002');
                expect(cat.email).toBe('cat@stark.example.com');
                expect(cat.display).toBe('Catelyn Stark');
            });
        });

        describe('Jaime', () => {

            const jaime = DATA.users.jaime;

            it('should have primitive attributes', () => {

                expect(jaime).toBeDefined();

                expect(jaime.id).toBe('003');
                expect(jaime.email).toBe('jaime@lannister.example.com');
                expect(jaime.display).toBe('Jaime Lannister');
            });
        });
    });

    describe('Maze', () => {

        it('should have six mazes', () => {

            expect(DATA.mazes).toBeDefined();

            expect(Object.keys(DATA.mazes).length).toBe(6);
        });

        it('should have only size 9 mazes', () => {

            expect(
                Object.values(DATA.mazes).every((maze) => maze.size === 9)
            ).toBe(true);
        });

        describe('Winterfell', () => {

            const winterfell = DATA.mazes.winterfell;

            it('should be created by Ned', () => {

                expect(winterfell).toBeDefined();

                expect(winterfell.creator).toBe('001');
            });

            it('should have three revisions', () => {

                expect(winterfell.revisions.length).toBe(3);
            });
        });

        describe('Riverrun', () => {

            const riverrun = DATA.mazes.riverrun;

            it('should be created by Cat', () => {

                expect(riverrun).toBeDefined();

                expect(riverrun.creator).toBe('002');
            });

            it('should have one revision', () => {

                expect(riverrun.revisions.length).toBe(1);
            });
        });

        describe('The Eyrie', () => {

            const eyrie = DATA.mazes.eyrie;

            it('should be created by Cat', () => {

                expect(eyrie).toBeDefined();

                expect(eyrie.creator).toBe('002');
            });

            it('should have one revision', () => {

                expect(eyrie.revisions.length).toBe(1);
            });
        });

        describe('Casterly Rock', () => {

            const rock = DATA.mazes.rock;

            it('should be created by Jaime', () => {

                expect(rock).toBeDefined();

                expect(rock.creator).toBe('003');
            });

            it('should have one revision', () => {

                expect(rock.revisions.length).toBe(1);
            });
        });

        describe('Red Keep', () => {

            const keep = DATA.mazes.keep;

            it('should be created by Jaime', () => {

                expect(keep).toBeDefined();

                expect(keep.creator).toBe('003');
            });

            it('should have one revision', () => {

                expect(keep.revisions.length).toBe(1);
            });
        });

        describe('Highgarden', () => {

            const highgarden = DATA.mazes.highgarden;

            it('should be created by Jaime', () => {

                expect(highgarden).toBeDefined();

                expect(highgarden.creator).toBe('003');
            });

            it('should have one revision', () => {

                expect(highgarden.revisions.length).toBe(1);
            });
        });
    });
});
