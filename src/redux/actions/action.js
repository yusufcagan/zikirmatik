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

export function removeZikir(id) {
    return {
        type: "DELETE_ZIK",
        payload: id
    }
}

export function editNum(id) {
    return {
        type: "EDIT_ZIK",
        payload: id,
    }
}

export function editUndoNum(id) {
    return {
        type: "EDIT_UNDOZIK",
        payload: id,
    }
}

export function editReset(id) {
    return {
        type: "EDIT_RESET",
        payload: id,
    }
}

export function editName(id, name, count) {
    return {
        type: "EDIT_NAME",
        payload: id,
        name: name,
        count: count
    }
}

export function undo(num) {
    return {
        type: "UNDO_ZIK",
        payload: num
    }
}
export function turnBool(vib) {
    return {
        type: 'TURN_BOOL',
        payload: vib
    }
}