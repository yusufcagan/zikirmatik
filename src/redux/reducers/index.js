
const initialState = {
    zik: [],
    keyid: 1,
    n1: 0,
    n2: 0,
    n3: 0,
    n4: 0,
}


export const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ZIK':
            return { ...state, zik: state.zik.concat(action.payload) }
        case 'ADD_KEY':
            return { ...state, keyid: state.keyid + 1 }
        case 'CLEAR_NUM':
            return { ...state, n1: 0, n2: 0, n3: 0, n4: 0 }
        case 'COUNT_NUM':
            if (state.n1 == 9) {
                if (state.n2 == 9) {
                    if (state.n3 == 9) {
                        if (state.n4 == 9) {
                            state.n1 = 9
                            state.n2 = 9
                            state.n3 = 9
                            state.n4 = 9

                        }
                        state.n4 = state.n4 + 1;
                        state.n3 = 0
                        state.n2 = 0
                        state.n1 = 0

                    }
                    state.n3 = state.n3 + 1;
                    state.n2 = 0
                    state.n1 = 0;

                }
                state.n2 = state.n2 + 1;
                state.n1 = 0;

            }
            state.n1 = state.n1 + 1;
        default:
            return state;

    }

}