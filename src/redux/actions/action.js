export function addZikir(azik) {
    return {
        type: "ADD_ZIK",
        payload: azik
    }
}

export function addkey(ikey) {
    return {
        type: "ADD_KEY",
        payload: ikey
    }
}

export function resetNum(res) {
    return {
        type: "CLEAR_NUM",
        payload: res
    }
}

export function countNum(num) {
    return {
        type: "COUNT_NUM",
        payload: num
    }
}