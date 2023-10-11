export default ({ app: { router, store } }) => {
    router.afterEach((to, from) => {
        if (from.path == '/2') {
            if (store.state.occupation.isFlyoverCompleted) {
                store.commit(`occupation/setFirstVisit`);
            }
        }
    })
  }