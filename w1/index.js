import * as fs from "fs";

async function getData(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

function filterPost(posts, userId) {
  let userPosts = [];

  userPosts = posts.filter((post) => post.userId === userId);
  userPosts = userPosts.map((post) => {
    return { id: post.id, title: post.title, body: post.body };
  });

  return userPosts;
}

function filterComment(comments, email) {
  let userComment = [];

  userComment = comments.filter((comment) => {
    if (comment.email === email)
      return {
        id: comment.id,
        email: comment.email,
        name: comment.name,
        body: comment.body,
      };
  });

  return userComment;
}

function renderUserList(users, posts, comments) {
  let usersList = [];

  usersList = users.map((user) => {
    let userPosts = filterPost(posts, user.id);
    let userComments = filterComment(comments, user.email);

    return {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
      commentsCount: userComments.length || 0,
      postsCount: userPosts.length || 0,
      comments: userComments,
      posts: userPosts,
    };
  });

  return usersList;
}

function findUserWithMostPost(users) {
  let result;
  let max = -1;
  users.forEach((user) => {
    if (user.postsCount > max) {
      max = user.postsCount;
      result = user;
    }
  });

  return result;
}

function findUserWithMostComment(users) {
  let result;
  let max = -1;
  users.forEach((user) => {
    if (user.commentsCount > max) {
      max = user.commentsCount;
      result = user;
    }
  });

  return result;
}

function sortUsers(users) {
  let sortedUsers = [];
  sortedUsers = users.sort((a, b) => {
    return b.postsCount - a.postsCount;
  });

  return sortedUsers;
}

async function mergePost() {
  const userPosts = await getData(
    "https://jsonplaceholder.typicode.com/posts/1"
  );
  const postsComments = await getData(
    "https://jsonplaceholder.typicode.com/comments?postId=1"
  );

  Promise.all([userPosts, postsComments]).then((resp) => {
    let [post, comments] = resp;

    let result = {
      ...post,
      comments: comments,
    };

    fs.writeFileSync("./post.json", JSON.stringify(result));
  });
}

(async function () {
  try {
    const rawUserData = await getData(
      "https://jsonplaceholder.typicode.com/users"
    );
    const rawCommentData = await getData(
      "https://jsonplaceholder.typicode.com/comments"
    );
    const rawPostData = await getData(
      "https://jsonplaceholder.typicode.com/posts"
    );

    let users = renderUserList(rawUserData, rawPostData, rawCommentData);

    console.log(
      "The user with the most posts is: ",
      findUserWithMostPost(users).username
    );

    console.log(
      "The user with the most comments is: ",
      findUserWithMostComment(users).username
    );

    let sortedUsers = sortUsers(users);

    mergePost();

    fs.writeFileSync("./userList.json", JSON.stringify(users));
    fs.writeFileSync("./sortedUserList.json", JSON.stringify(sortedUsers));
  } catch (error) {
    console.log(error);
  }
})();
