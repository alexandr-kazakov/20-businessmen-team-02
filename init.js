const fs = require('fs')

fs.copyFileSync('.env.sample', '.env')

fs.copyFileSync('.env.sample', 'packages/client/.env')
fs.copyFileSync('.env.sample', 'packages/server/.env')

fs.mkdirSync('tmp/pgdata', { recursive: true })
