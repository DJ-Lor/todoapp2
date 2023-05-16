import { createContext, useContext, useEffect, useReducer } from "react";
import { useLocalStorage } from "react-use";

const initialNotesData = [
    {
        id: 1,
        title: "Welcome to Note Taker!",
        description: "Make your notes here!",
        isCompleted: false,
        dueDate: new Date().setDate(new Date().getDate()+1), //current time but one day into the future
        createdAtDate: Date.now()
    }
]

const notesReducer = (previousState, instructions) => {

    let stateEditable = [...previousState];

    switch (instructions.type) {

        case "create":
            console.log("TODO: Create note and add to state ");
            break;

        case "update":
            console.log("TODO: Update specific note and add to state ");
            break;

        case "delete":
            console.log("TODO: Delete specific note and add to state ");
            break;

        case "sortByDueDate":
            console.log("Sort state by due date");
            break;

         case "sortByCreatedByDate":
            console.log("Sort state by created by date");
            break;
        
        case "sortByID":
            console.log("Sort by ID, default ID");
            break;

        default:
            console.log("Invalid instruction type provided, it was: " + instructions.type)
            return previousState;

    }

}

export const NoteDataContext = createContext(null);

export const NoteDispatchContext = createContext(null);

export function useNoteData(){
    return useContext(NoteDataContext);
}

export function useNoteDispatch(){
    return useContext(NoteDispatchContext);
}

export default function NotesProvider(props){
    const [notesData, notesDispatch] = useReducer(notesReducer, initialNotesData);

    const [persistentData, setPersistentData] = useLocalStorage('notes', initialNotesData)


    useEffect(() => {
        notesDispatch()
    }, [])

    useEffect(() => {
        console.log("local storage:" + persistentData)

    }, [persistentData])


    useEffect(() => {
        setPersistentData(JSON.stringify(notesData));
    }, [notesData]);

    return (
        <NoteDataContext.Provider value={notesData}>
            <NoteDispatchContext.Provider value={notesDispatch}>
                {props.children}
            </NoteDispatchContext.Provider>
        </NoteDataContext.Provider>
    )
}