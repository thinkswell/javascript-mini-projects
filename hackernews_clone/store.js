function createStore(reducer) {
  let currentState = reducer(undefined, {})

  return {
    getState: () => currentState,
    dispatch: action => {
      currentState = reducer(currentState, action)
    }
  }
}

const initialState = {
  favorites: []
}

function favoritesReducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_FAVORITE': {
      const addedFavorite = action.payload.favorite
      const favorites = [...state.favorites, addedFavorite]
      return { favorites }
    }
    case 'REMOVE_FAVORITE': {
      const removedFavorite = action.payload.favorite
      const favorites = state.favorites.filter(favorite => favorite.id !== removedFavorite.id)
      return { favorites }
    }
    default:
      return state
  }
}

/* const action = {
  type: 'ADD_favorite',
  payload: {
    favorite: {
      title: 'story1',
      id: 1 
    }
  }
} */

const store = createStore(favoritesReducer)
//store.dispatch(action)
//console.log(store.getState())

export default store