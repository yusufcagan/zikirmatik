
const initialState = {
    zik: [],
    keyid: 1,
    n1: 0,
    n2: 0,
    n3: 0,
    n4: 0,
}


const reducer = (state = initialState, action) => {
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
                            return { ...state, n1: state.n1, n2: state.n2, n3: state.n3, n4: state.n4 }
                        }
                        state.n4 = state.n4 + 1;
                        state.n3 = 0
                        state.n2 = 0
                        state.n1 = 0
                        return { ...state, n1: state.n1, n2: state.n2, n3: state.n3, n4: state.n4 }
                    }
                    state.n3 = state.n3 + 1;
                    state.n2 = 0
                    state.n1 = 0;
                    return { ...state, n1: state.n1, n2: state.n2, n3: state.n3 }
                }
                state.n2 = state.n2 + 1;
                state.n1 = 0;
                return { ...state, n1: state.n1, n2: state.n2 }
            }
            state.n1 = state.n1 + 1;
            return { ...state, n1: state.n1 }
        case 'DELETE_ZIK':
            return { ...state, zik: state.zik.filter(item => item.key !== action.payload) }
        case 'EDIT_ZIK':
            return {
                ...state, zik: state.zik.map(item => {
                    if (item.key === action.payload) {
                        return {
                            ...item,
                            zikcount: item.zikcount + 1
                        };
                    }
                    else {
                        return item;
                    }
                })
            }
        case 'EDIT_RESET':
            return {
                ...state, zik: state.zik.map(item => {
                    if (item.key === action.payload) {
                        return {
                            ...item,
                            zikcount: 0,
                        };
                    }
                    else {
                        return item;
                    }
                })
            }
        case 'EDIT_NAME':
            return {
                ...state, zik: state.zik.map(item => {
                    if (item.key === action.payload) {
                        return {
                            ...item,
                            name: action.name,
                            zikcount: action.count,
                        }
                    }
                    else {
                        return item;
                    }
                })
            }
        default:
            return state;

    }

}
export default reducer;