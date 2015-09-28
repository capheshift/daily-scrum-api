module.exports = {
    'Env': {
        'development': {
            'Database': 'mongodb://nvs2394:son231994@ds051843.mongolab.com:51843/nvs2394'
        },
        'production': {
            'Database': 'mongodb://nvs2394:son231994@ds051843.mongolab.com:51843/nvs2394'
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
