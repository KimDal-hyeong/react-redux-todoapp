const store = {
  todos: {
    byId: {
      ":todoId": {
        id: Number,
        title: String,
        completed: Boolean,
      }
    },
    ids: [/* todoId */],
    isAdding: Boolean,
  },
};