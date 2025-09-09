## React test task

To run the app:
- make sure to have node.js 22
- run `npm install`
- run `npm run dev`

# Some comments
1. Task didn't had any API interaction, so lots of things are simplified. But usually I tend to use the `react-query` library to fetch data.
2. Also table could have much more features. I would at least add sorting and loading more data on scroll.
3. The structure of the project is my implementation of FSD, and main concept of that is separation of business logic parts from each other and from the UI. So I tend to have the folder for each business feature, that will contain all related logic to it there
4. Regarding the tests, there's not much of them, as there's practically no logic that can be somehow properly tested.