const bcrypt = require('bcryptjs');

module.exports = {
    register: async(req, res) => {
        // const db = req.app.get('db');
        // const {username, password} = req.body;
        // try {
        //     const [existingUser] = await db.user.find_user_by_username(username)

        //         if(existingUser){
        //             return res.status(409).send('Username taken.')
        //         }
            
        //     const salt = bcrypt.genSaltSync(10);
        //     const hash = bcrypt.hashSync(password, salt);

        //     const [newUser] = await db.create_user(username, hash);
        //     req.session.user = newUser;
        //     res.status(200).send(newUser);
        // } catch(err){
        //     console.log(err)
        //     res.sendStatus(500)
        // }
        const {username, password} = req.body;
        const profile_pic = `https://robohash.org/${username}.png`;

        const db = req.app.get('db');

        const result = await db.user.find_user_by_username([username]);
        const existingUser = result[0];

        if(existingUser){
            return res.status(409).send('Username taken');
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const registeredUser = await db.user.create_user([username, hash, profile_pic])

        const user = registeredUser[0];

        req.session.user = {username: user.username, profile_pic: user.profile_pic, id: user.id};

        res.status(201).send(req.session.user);
    },
    login: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        const foundUser = await db.user.find_user_by_username([username]);
        const user = foundUser[0];
        // console.log("user.js");
            if(!user){
                return (res.status(401).send('User not found. Please register as a new user before logging in.'));
            }
        const isAuthenticated = bcrypt.compareSync(password, user.password);
            if(!isAuthenticated){
                console.log('!isAuthenticated user.js')
                return res.status(403).send('Incorrect password');
            }
        delete user.password;
        // console.log('isAuthenticated user.js')
        req.session.user = {username: user.username, id: user.id, profile_pic: user.profile_pic};
        res.status(201).send(req.session.user);
    },
    logout: async(req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    getUser: (req, res) => {
        // const db = req.app.get('db');
        console.log('getUser user.js')
        if(!req.session.user){
            return res.status(404);
        }
        res.status(200).send(req.session.user);
    }
}