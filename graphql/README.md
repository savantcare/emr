How to install?
https://www.vuemastery.com/blog/part-2-building-a-graphql-server/

How to start?
vk-tech@vk-mini-layer2-3 ~/g/s/e/graphql> npm install -s apollo-server

How to use?
http://localhost:4001/

Enter the following query on http://localhost:4001/

query {
currentUser {
id
username
posts {
id
content
}
}

}
