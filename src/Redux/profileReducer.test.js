import profileReducer, {addPostActionCreator, deletePost} from "./profileReducer";

let state={
    posts: [
        {id: 1, post: 'Hi, how are you?', likesCount: 10},
        {id: 2, post: 'It\'s my first post!', likesCount: 15},
        {id: 3, post: 'Fuck that shit!', likesCount: 2},
        {id: 4, post: 'IT WORKS!', likesCount: 656},
    ]
};

it('length of posts should be incremented', () => {
    // 1. TEST DATA
    let action = addPostActionCreator('TEST TEXT')

    // 2. ACTION
    let newState = profileReducer(state, action);

    // 3.EXPECTATION
    expect(newState.posts.length).toBe(5);
});

it('message of new post should be correct', () => {
    // 1. TEST DATA
    let action = addPostActionCreator('NEW TEST TEXT')

    // 2. ACTION
    let newState = profileReducer(state, action);

    // 3.EXPECTATION
    expect(newState.posts[4].post).toBe('NEW TEST TEXT');
});

it(`after deleting length shouldn't be decrement if id is incorrect`, () => {
    // 1. TEST DATA
    let action = deletePost(99)

    // 2. ACTION
    let newState = profileReducer(state, action);

    // 3.EXPECTATION
    expect(newState.posts.length).toBe(4);
});

