exports.users = {
    ned: {
        id: 'id:001',
        email: 'ned@stark.example.com',
        display: 'Eddard Stark'
    },

    cat: {
        id: 'id:002',
        email: 'cat@stark.example.com',
        display: 'Catelyn Stark'
    },

    jaime: {
        id: 'id:003',
        email: 'jaime@lannister.example.com',
        display: 'Jaime Lannister'
    },

    dany: {
        id: 'id:004',
        email: 'dany@targaryen.example.com',
        display: 'Daenerys Targaryen'
    }
};

exports.mazes = {

    m1: {
        id: 'm1',
        name: 'Winterfell',
        creator: 'id:001',
        size: 9,
        revisions: [
            {
                id: 'm1r0',
                maze: 'm1',
                version: 0,
                start: {
                    x: 0,
                    z: 0,
                    direction: 'east'
                },
                destination: {
                    x: 8,
                    z: 8
                },
                map: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            {
                id: 'm1r1',
                maze: 'm1',
                version: 1,
                start: {
                    x: 0,
                    z: 0,
                    direction: 'east'
                },
                destination: {
                    x: 8,
                    z: 8
                },
                map: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            },
            {
                id: 'm1r2',
                maze: 'm1',
                version: 2,
                start: {
                    x: 0,
                    z: 0,
                    direction: 'east'
                },
                destination: {
                    x: 8,
                    z: 8
                },
                map: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            }
        ]
    },

    m2: {
        id: 'm2',
        name: 'Riverrun',
        creator: 'id:002',
        size: 9,
        revisions: [
            {
                id: 'm2r0',
                maze: 'm2',
                version: 0,
                start: {
                    x: 0,
                    z: 0,
                    direction: 'east'
                },
                destination: {
                    x: 8,
                    z: 8
                },
                map: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            }
        ]
    },

    m3: {
        id: 'm3',
        name: 'The Eyrie',
        creator: 'id:002',
        size: 9,
        revisions: [
            {
                id: 'm3r0',
                maze: 'm3',
                version: 0,
                start: {
                    x: 0,
                    z: 0,
                    direction: 'east'
                },
                destination: {
                    x: 8,
                    z: 8
                },
                map: [
                    [0, 0, 0, 1, 0, 1, 0, 1, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            }
        ]
    },

    m4: {
        id: 'm4',
        name: 'Casterly Rock',
        creator: 'id:003',
        size: 9,
        revisions: [
            {
                id: 'm4r0',
                maze: 'm4',
                version: 0,
                start: {
                    x: 0,
                    z: 0,
                    direction: 'east'
                },
                destination: {
                    x: 8,
                    z: 8
                },
                map: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            }
        ]
    },

    m5: {
        id: 'm5',
        name: 'The Red Keep',
        creator: 'id:003',
        size: 9,
        revisions: [
            {
                id: 'm5r0',
                maze: 'm5',
                version: 0,
                start: {
                    x: 0,
                    z: 0,
                    direction: 'east'
                },
                destination: {
                    x: 8,
                    z: 8
                },
                map: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            }
        ]
    },

    m6: {
        id: 'm6',
        name: 'Highgarden',
        creator: 'id:003',
        size: 9,
        revisions: [
            {
                id: 'm6r0',
                maze: 'm6',
                version: 0,
                start: {
                    x: 0,
                    z: 0,
                    direction: 'east'
                },
                destination: {
                    x: 8,
                    z: 8
                },
                map: [
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 0, 0, 1, 1, 1, 0, 0, 0],
                    [0, 1, 1, 0, 0, 0, 1, 1, 0],
                    [0, 0, 1, 0, 0, 0, 1, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]
                ]
            }
        ]
    }
};
