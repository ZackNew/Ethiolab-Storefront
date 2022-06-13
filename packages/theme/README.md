Installation

Node.js v12 or above, with support for even-numbered Node.js versions.

curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs


Install npx

sudo npm install -g npx
Generate a new project
cd /home/{{user}}/etech-code/ecommerce/
git clone https://github.com/e4076/eecommerce.web.git
cd eecommerce

Configure the project
Add your eecommerce server GraphQL API uri to env file in packages/api-client and packages/theme
cd packages/theme
cp .env.example .env



yarn build
yarn dev
