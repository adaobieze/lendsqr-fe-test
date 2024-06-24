
const fs = require('fs');
const path = require('path');

module.exports = function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method Not Allowed' });
    }

    const { email, password } = req.body;

    const filePath = path.join(process.cwd(), 'db.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);

    const user = data.appUsers.find((u) => u.email === email && u.password === password);

    if (user) {
        const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');
        res.status(200).json({
            success: true,
            data: {
                token,
                user: { id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, profilePhoto: user.profilePhoto}
            }
        });
    } else {
        res.status(401).json({ success: false, error: 'Invalid username and/or password' });
    }
}