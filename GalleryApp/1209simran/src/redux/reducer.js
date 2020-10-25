import _posts from "../data/posts";

const postReducer = function posts(state = _posts, action) {
  console.log(action.type);
  switch (action.type) {
    case "REMOVE_PICTURE":
      return [...state.slice(0, action.i), ...state.slice(action.i + 1)];
    case "ADD_PICTURE":
      return [
        {
          id: action.id,
          imageLink: action.imageLink,
          description: action.description
        },
        ...state
      ];
    default:
      return state;
  }
};

export default postReducer;
