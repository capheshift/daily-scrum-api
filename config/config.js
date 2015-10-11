module.exports = {
    'Env': {
        'development': {
            'Database': 'mongodb://127.0.0.1/Daily-Scrum'
        },
        'production': {
            'Database': 'mongodb://127.0.0.1/Daily-Scrum'
        }
    },

    'JWTSecret': 'Capheshift',
    'Populate': {
        'User': 'username',
        'UserFull': '-salt -hashed_password'
    },
    'User': {
        'Types': {
            'Local': 1,
            'Facebook': 2,
            'Google': 3
        },

        'Role': {
            'Admin': 1,
            'User': 2
        },
        'Status': {
            'Active': 1,
            'Inactive': 2
        }
    }  
};
