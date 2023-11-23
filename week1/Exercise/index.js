import * as fs from "fs";

async function getData(urlPath) {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/" + urlPath
  );
  return await response.json();
}

async function writeData(fileName, data) {
  await fs.writeFileSync(fileName, JSON.stringify(data));
}

async function callApi() {
  const [users, posts, comments] = await Promise.all([
    getData("users"),
    getData("posts"),
    getData("comments"),
  ]);

  return { users, posts, comments };
}

function formatData(data, keys) {
  return data.map((item) => {
    delete item[key];

    return item;
  });
}

function getUseWithData(users, posts, comments) {
  return users.map((user) => {
    let userPosts = posts.filter((post) => post.userId === user.id);
    userPosts = formatData(userPosts, "userId");

    let commentList = userPosts
      .map((post) => {
        return comments.filter((item) => item.postId === post.id);
      })
      .flat();
    commentList = formatData(comments, "email");

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      comments: commentList,
      posts: userPosts,
    };
  });
}

function reformatUser(users, posts, comments) {
  return users.map((user) => {
    let userPosts = posts.filter((post) => post.userId === user.id);

    let commentList = [];

    userPosts.map((post) => {
      let userComment = comments.filter((comment) => {
        if (comment.postId === post.id) return true;
      });

      let newUserComment = userComment.map((comment) => {
        let { email, ...resultCmt } = comment;
        return {
          ...resultCmt,
        };
      });

      commentList.push(...newUserComment);
    });

    userPosts = userPosts.map((post) => {
      let { userId, ...rest } = post;
      return { ...rest };
    });

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      commentsCount: commentList.length,
      postsCount: userPosts.length,
      comments: commentList,
      posts: userPosts,
    };
  });
}

function filterUser(users) {
  let filteredUsers = users.filter((user) => user.commentsCount > 3);

  return filteredUsers;
}

function findUser(users, compare) {
  let result = users.reduce((maxUser, currentUser) => {
    return currentUser[compare] > maxUser[compare] ? currentUser : maxUser;
  }, users[0]);

  return result;
}

async function getPost1() {
  try {
    const [post1, commentsForPost1] = await Promise.all([
      getData("posts/1"),
      getData("comments?postId=1"),
    ]);

    return {
      userId: post1.userId,
      id: post1.id,
      title: post1.title,
      body: post1.body,
      comments: commentsForPost1,
    };
  } catch (error) {
    console.error("Error: ", error);
  }
}

(async () => {
  let { users, posts, comments } = await callApi();

  const usersWithData = getUseWithData(users, posts, comments);

  const reformatedUser = reformatUser(users, posts, comments);

  let filteredUsers = filterUser(usersWithData);

  const userWithMostComments = findUser(users, "comments");

  const userWithMostPosts = findUser(users, "posts");

  const sortedUsers = usersWithData.sort((a, b) => b.postsCount - a.postsCount);

  const post1WithComments = await getPost1();

  writeData("./userWithData.json", usersWithData);

  writeData("./reformat.json", reformatedUser);

  writeData("./sortedUsers.json", sortedUsers);

  writeData("./filteredUsers.json", filteredUsers);

  writeData("./userWithMostPosts.json", userWithMostPosts);

  writeData("./userWithMostComments.json", userWithMostComments);

  writeData("./commentsForPost1.json", post1WithComments);
})();
