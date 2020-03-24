// Los reducers manejan la información de la aplicación y la ponen en el 
// estado de esta.

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
            };
        case 'DELETE_FAVORITE' :
            return {
                // Se tiene en cuenta el estado que ya se tiene 
                // !== equivale a desigualdad estricta 
                // Eliminamos el id 
                // En el filtro pasan todos los elementos que son diferentes al enviado por payload
                // por eso se eliminan
                ...state,
                myList : state.myList.filter (items => items.id !== action.payload)
            };
        case 'LOGIN_REQUEST' : 
            return {
                // ponemos la información del usuario en el state
                ...state,
                user: action.payload,
            };
        default: 
        return state;
    }
}

export default reducer;
