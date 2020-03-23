const reducer = (state, action) => {
    // Hacemos un switch, que recibe el type y lo evalúa dentro de un caso para 
    // saber qué hacer con el estado.

    switch (action.type) {
        case 'SET_FAVORITE' :
            return {
                // Con estas líneas se guarda directamente el elemento que viene en payload 
                // en myList. NO SE USA PUSH NI NADA...HAY QUE VER CÓMO ES ESTO
                ...state,
                myList : [...state.myList, action.payload]
            }
        default: 
        return state;
    }
}

export default reducer;
