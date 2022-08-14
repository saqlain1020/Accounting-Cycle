import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { RootState, useAppDispatch } from "src/state";
import { fetchEntries, fetchEntryName } from "src/state/entries/entriesReducer";
import { onAuthStateChanged, auth } from "src/config/firebase";
import { setUser } from "src/state/accounts/accountsReducer";

const useInit = () => {
  const uid = useSelector((state: RootState) => state.user.user?.uid);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (uid) {
      dispatch(fetchEntryName());
      dispatch(fetchEntries());
    }
  }, [uid, dispatch]);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
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
