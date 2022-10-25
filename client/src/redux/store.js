import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension"; //da las devtools para el navegador
import thunk from "redux-thunk"; //middleware para realizar acciones async
import rootReducer from "./reducer";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));