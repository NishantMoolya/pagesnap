import { createContext, useContext, useReducer, useCallback } from "react";

const initialState = {
  pages: [],
  selected: new Set(),
  fileName: null,
  fileType: null,
  totalPages: 0,
  progress: null,   // null | { title, sub, pct }
  toast: null,      // null | { msg, type }
};

function reducer(state, action) {
  switch (action.type) {
    case "RESET":
      return { ...initialState };

    case "SET_FILE_META":
      return {
        ...state,
        fileName: action.fileName,
        fileType: action.fileType,
        pages: [],
        selected: new Set(),
        totalPages: 0,
      };

    case "INIT_PAGES":
      // If shrinking (shouldn't happen) keep existing; if growing, pad with empty slots
      if (action.count <= state.pages.length) return state;
      return {
        ...state,
        totalPages: action.count,
        pages: [
          ...state.pages,
          ...Array.from({ length: action.count - state.pages.length }, () => ({
            canvas: null,
            thumbUrl: null,
            ready: false,
          })),
        ],
      };

    case "SET_PAGE_READY": {
      const pages = [...state.pages];
      if (!pages[action.index]) return state;
      pages[action.index] = {
        canvas: action.canvas,
        thumbUrl: action.thumbUrl,
        ready: true,
      };
      return { ...state, pages };
    }

    case "TOGGLE_PAGE": {
      const selected = new Set(state.selected);
      if (selected.has(action.index)) selected.delete(action.index);
      else selected.add(action.index);
      return { ...state, selected };
    }

    case "SELECT_ALL": {
      const selected = new Set(
        state.pages.reduce((acc, p, i) => { if (p.ready) acc.push(i); return acc; }, [])
      );
      return { ...state, selected };
    }

    case "CLEAR_SELECTION":
      return { ...state, selected: new Set() };

    case "SET_PROGRESS":
      return { ...state, progress: action.progress };

    case "CLEAR_PROGRESS":
      return { ...state, progress: null };

    case "SHOW_TOAST":
      return { ...state, toast: { msg: action.msg, type: action.toastType } };

    case "CLEAR_TOAST":
      return { ...state, toast: null };

    default:
      return state;
  }
}

const DocContext = createContext(null);

export function DocProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showToast = useCallback((msg, type = "success") => {
    dispatch({ type: "SHOW_TOAST", msg, toastType: type });
    setTimeout(() => dispatch({ type: "CLEAR_TOAST" }), 3200);
  }, []);

  const showProgress = useCallback((title, sub = "", pct = 0) => {
    dispatch({ type: "SET_PROGRESS", progress: { title, sub, pct } });
  }, []);

  const hideProgress = useCallback(() => {
    dispatch({ type: "CLEAR_PROGRESS" });
  }, []);

  return (
    <DocContext.Provider value={{ state, dispatch, showToast, showProgress, hideProgress }}>
      {children}
    </DocContext.Provider>
  );
}

export function useDoc() {
  return useContext(DocContext);
}
