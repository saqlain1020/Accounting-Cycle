import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "src/state";
import { fetchEntries, fetchEntryName } from "src/state/entries/entriesReducer";
import { onAuthStateChanged, auth } from "src/config/firebase";
import { setUser } from "src/state/accounts/accountsReducer";
import { fetchAdjustingEntries } from "src/state/adjustingEntries/adjustingEntriesReducer";

const useInit = () => {
  const uid = useSelector((state: RootState) => state.user.user?.uid);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (uid) {
      dispatch(fetchEntryName());
      dispatch(fetchEntries());
      dispatch(fetchAdjustingEntries());
    }
  }, [uid, dispatch, connected]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setConnected(true);
      }
      // @ts-ignore
      dispatch(setUser(user?.toJSON()));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!uid) {
      if (location.pathname !== "/auth") {
        navigate("/auth");
      }
    }
  }, [location, uid, navigate]);
};
export default useInit;
