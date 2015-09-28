module.exports = {
    'Env': {
        'development': {
            'Database': 'mongodb://heroku_gl956tkn:812b5uooreqmh28r0p7uldnui9@ds051843.mongolab.com:51843/heroku_gl956tkn'
        },
        'production': {
            'Database': 'mongodb://heroku_gl956tkn:812b5uooreqmh28r0p7uldnui9@ds051843.mongolab.com:51843/heroku_gl956tkn'
        }
    },

    'JWTSecret': 'Capheshift',
    
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
